import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";
import { createDraftStore } from "../../src/studio/client/draft-store";

type AutosaveModule = typeof import("../../src/studio/client/autosave");
let autosaveModule: AutosaveModule | null = null;

try {
  autosaveModule = await import("../../src/studio/client/autosave");
} catch {
  autosaveModule = null;
}

const requireAutosave = () => {
  expect(
    autosaveModule,
    "src/studio/client/autosave.ts must implement the debounced autosave controller",
  ).not.toBeNull();
  return autosaveModule as AutosaveModule;
};

const response = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const deferred = <T>() => {
  let resolvePromise!: (value: T) => void;
  let rejectPromise!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });
  return { promise, resolve: resolvePromise, reject: rejectPromise };
};

const setup = (input: {
  fetcher: typeof fetch;
  debounceMs?: number;
  beforeUnloadTarget?: {
    addEventListener(type: "beforeunload", listener: (event: BeforeUnloadEvent) => void): void;
    removeEventListener(type: "beforeunload", listener: (event: BeforeUnloadEvent) => void): void;
  };
}) => {
  const document = createDefaultSiteDocument();
  const store = createDraftStore({ document, baseline: structuredClone(document), revision: 0 });
  const controller = requireAutosave().createAutosaveController({
    store,
    fetcher: input.fetcher,
    debounceMs: input.debounceMs ?? 300,
    beforeUnloadTarget: input.beforeUnloadTarget,
  });
  return { store, controller };
};

afterEach(() => {
  vi.useRealTimers();
});

describe("Studio autosave", () => {
  it("debounces edits into one save containing the latest document and known revision", async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn<typeof fetch>(async () => response({ revision: 1 }));
    const { store, controller } = setup({ fetcher });

    store.update({ path: "home.hero.title", value: "Primeira edição" });
    await vi.advanceTimersByTimeAsync(150);
    store.update({ path: "home.hero.title", value: "Edição final" });
    await vi.advanceTimersByTimeAsync(299);
    expect(fetcher).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(fetcher).toHaveBeenCalledTimes(1);

    const [, init] = fetcher.mock.calls[0] ?? [];
    const body = JSON.parse(String(init?.body)) as {
      document: ReturnType<typeof createDefaultSiteDocument>;
      expectedRevision: number;
    };
    expect(init?.method).toBe("PUT");
    expect(body.expectedRevision).toBe(0);
    expect(body.document.home.hero.title).toBe("Edição final");
    expect(store.getState()).toMatchObject({ revision: 1, status: "clean" });

    controller.dispose();
  });

  it("enters conflict on 409 and stops further automatic writes", async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn<typeof fetch>(async () =>
      response(
        {
          error: {
            code: "revision_conflict",
            expectedRevision: 0,
            currentRevision: 4,
          },
        },
        409,
      ),
    );
    const { store, controller } = setup({ fetcher });

    store.update({ path: "home.hero.title", value: "Mudança local" });
    await vi.advanceTimersByTimeAsync(300);

    expect(store.getState()).toMatchObject({
      status: "conflict",
      conflictRevision: 4,
      autosaveFrozen: true,
    });
    expect(controller.getState().phase).toBe("conflict");

    store.update({ path: "home.hero.lead", value: "Continua disponível localmente" });
    await vi.advanceTimersByTimeAsync(5_000);
    expect(fetcher).toHaveBeenCalledTimes(1);

    controller.dispose();
  });

  it("retains local content after a network failure and retries only when requested", async () => {
    vi.useFakeTimers();
    const fetcher = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new TypeError("offline"))
      .mockResolvedValueOnce(response({ revision: 1 }));
    const { store, controller } = setup({ fetcher });

    store.update({ path: "home.hero.title", value: "Não pode sumir" });
    await vi.advanceTimersByTimeAsync(300);

    expect(controller.getState().phase).toBe("retry");
    expect(store.getState().document.home.hero.title).toBe("Não pode sumir");
    expect(store.getState().status).toBe("dirty");

    await vi.advanceTimersByTimeAsync(5_000);
    expect(fetcher).toHaveBeenCalledTimes(1);

    expect(controller.retry()).toBe(true);
    await vi.advanceTimersByTimeAsync(0);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(store.getState()).toMatchObject({ revision: 1, status: "clean" });

    controller.dispose();
  });

  it("warns before unload only while local state is unsaved", () => {
    let beforeUnload: ((event: BeforeUnloadEvent) => void) | null = null;
    const target = {
      addEventListener: (_type: "beforeunload", listener: (event: BeforeUnloadEvent) => void) => {
        beforeUnload = listener;
      },
      removeEventListener: (_type: "beforeunload", listener: (event: BeforeUnloadEvent) => void) => {
        if (beforeUnload === listener) beforeUnload = null;
      },
    };
    const fetcher = vi.fn<typeof fetch>();
    const { store, controller } = setup({ fetcher, beforeUnloadTarget: target });

    const cleanEvent = { preventDefault: vi.fn(), returnValue: undefined } as unknown as BeforeUnloadEvent;
    beforeUnload?.(cleanEvent);
    expect(cleanEvent.preventDefault).not.toHaveBeenCalled();

    store.update({ path: "home.hero.title", value: "Pendente" });
    const dirtyEvent = { preventDefault: vi.fn(), returnValue: undefined } as unknown as BeforeUnloadEvent;
    beforeUnload?.(dirtyEvent);
    expect(dirtyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dirtyEvent.returnValue).toBe("");

    store.acknowledgeSave(1);
    const savedEvent = { preventDefault: vi.fn(), returnValue: undefined } as unknown as BeforeUnloadEvent;
    beforeUnload?.(savedEvent);
    expect(savedEvent.preventDefault).not.toHaveBeenCalled();

    controller.dispose();
    expect(beforeUnload).toBeNull();
  });

  it("serializes saves so acknowledgements cannot reorder revisions", async () => {
    vi.useFakeTimers();
    const first = deferred<Response>();
    const second = deferred<Response>();
    const fetcher = vi
      .fn<typeof fetch>()
      .mockImplementationOnce(async () => first.promise)
      .mockImplementationOnce(async () => second.promise);
    const { store, controller } = setup({ fetcher, debounceMs: 200 });

    store.update({ path: "home.hero.title", value: "Versão A" });
    await vi.advanceTimersByTimeAsync(200);
    expect(fetcher).toHaveBeenCalledTimes(1);

    store.update({ path: "home.hero.title", value: "Versão B" });
    await vi.advanceTimersByTimeAsync(1_000);
    expect(fetcher).toHaveBeenCalledTimes(1);

    first.resolve(response({ revision: 1 }));
    await Promise.resolve();
    await vi.advanceTimersByTimeAsync(200);
    expect(fetcher).toHaveBeenCalledTimes(2);

    const [, secondInit] = fetcher.mock.calls[1] ?? [];
    const secondBody = JSON.parse(String(secondInit?.body)) as {
      document: ReturnType<typeof createDefaultSiteDocument>;
      expectedRevision: number;
    };
    expect(secondBody.expectedRevision).toBe(1);
    expect(secondBody.document.home.hero.title).toBe("Versão B");

    second.resolve(response({ revision: 2 }));
    await Promise.resolve();
    await vi.advanceTimersByTimeAsync(0);
    expect(store.getState()).toMatchObject({ revision: 2, status: "clean" });

    controller.dispose();
  });
});

describe("ConflictDialog source contract", () => {
  it("offers explicit safe conflict recovery without silent merge", () => {
    const path = resolve(process.cwd(), "src/components/admin/ConflictDialog.astro");
    const source = existsSync(path) ? readFileSync(path, "utf8") : "";
    expect(source, "ConflictDialog.astro must exist").not.toBe("");
    expect(source).toContain("<dialog");
    expect(source).toMatch(/recarregar.+servidor/is);
    expect(source).toMatch(/alteraç(?:ão|ões).+loca/is);
    expect(source).toMatch(/substitu|perd/is);
    expect(source).not.toMatch(/merge autom|mesclagem autom|last-write-wins/i);
  });
});
