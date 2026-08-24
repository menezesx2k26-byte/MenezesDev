import { describe, expect, it, vi } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";

type DraftStoreModule = typeof import("../../src/studio/client/draft-store");
type PathModule = typeof import("../../src/studio/client/path");

let draftStoreModule: DraftStoreModule | null = null;
let pathModule: PathModule | null = null;

try {
  draftStoreModule = await import("../../src/studio/client/draft-store");
} catch {
  draftStoreModule = null;
}

try {
  pathModule = await import("../../src/studio/client/path");
} catch {
  pathModule = null;
}

const requireStore = () => {
  expect(
    draftStoreModule,
    "src/studio/client/draft-store.ts must implement the framework-free draft store",
  ).not.toBeNull();
  return draftStoreModule as DraftStoreModule;
};

const requirePath = () => {
  expect(
    pathModule,
    "src/studio/client/path.ts must implement bounded immutable paths",
  ).not.toBeNull();
  return pathModule as PathModule;
};

const makeStore = (revision = 7) => {
  const module = requireStore();
  const document = createDefaultSiteDocument();
  const baseline = structuredClone(document);
  return {
    document,
    baseline,
    store: module.createDraftStore({ document, baseline, revision }),
  };
};

describe("bounded draft paths", () => {
  it("updates an existing schema path immutably", () => {
    const path = requirePath();
    const source = createDefaultSiteDocument();
    const originalTitle = source.home.hero.title;

    const next = path.setDraftPath(source, "home.hero.title", "Novo título");

    expect(next).not.toBe(source);
    expect(next.home).not.toBe(source.home);
    expect(next.home.hero.title).toBe("Novo título");
    expect(source.home.hero.title).toBe(originalTitle);
  });

  it("supports existing array entries but rejects arbitrary or prototype-polluting paths", () => {
    const path = requirePath();
    const source = createDefaultSiteDocument();

    const next = path.setDraftPath(source, "home.services.items.0.title", "Serviço editado");
    expect(next.home.services.items[0]?.title).toBe("Serviço editado");

    expect(() => path.setDraftPath(source, "home.missing.field", "x")).toThrow();
    expect(() => path.setDraftPath(source, "__proto__.polluted", true)).toThrow();
    expect(() => path.setDraftPath(source, "home.services.items.999.title", "x")).toThrow();
  });
});

describe("DraftStore", () => {
  it("initializes from a cloned server document and revision", () => {
    const { document, store } = makeStore(12);
    const state = store.getState();

    expect(state.revision).toBe(12);
    expect(state.document).toEqual(document);
    expect(state.document).not.toBe(document);
    expect(state.canUndo).toBe(false);
    expect(state.canRedo).toBe(false);
    expect(state.status).toBe("clean");
  });

  it("pushes meaningful edits, ignores no-ops, and notifies subscribers", () => {
    const { store } = makeStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.update((document) => {
      document.home.hero.title = "Título alterado";
    });
    const afterEdit = store.getState();
    expect(afterEdit.document.home.hero.title).toBe("Título alterado");
    expect(afterEdit.canUndo).toBe(true);
    expect(afterEdit.status).toBe("dirty");

    const callsAfterEdit = listener.mock.calls.length;
    store.update((document) => {
      document.home.hero.title = "Título alterado";
    });
    expect(listener.mock.calls.length).toBe(callsAfterEdit);

    unsubscribe();
  });

  it("undoes, redoes, and clears redo after a new edit", () => {
    const { store, document } = makeStore();
    const original = document.home.hero.title;

    store.update({ path: "home.hero.title", value: "Primeiro" });
    store.update({ path: "home.hero.title", value: "Segundo" });

    expect(store.undo()).toBe(true);
    expect(store.getState().document.home.hero.title).toBe("Primeiro");
    expect(store.getState().canRedo).toBe(true);

    expect(store.undo()).toBe(true);
    expect(store.getState().document.home.hero.title).toBe(original);

    expect(store.redo()).toBe(true);
    expect(store.getState().document.home.hero.title).toBe("Primeiro");

    store.update({ path: "home.hero.title", value: "Novo ramo" });
    expect(store.getState().canRedo).toBe(false);
    expect(store.redo()).toBe(false);
  });

  it("caps undo history at 40 meaningful document states", () => {
    const { store } = makeStore();

    for (let index = 1; index <= 45; index += 1) {
      store.update({ path: "home.hero.title", value: `Título ${index}` });
    }

    let undoCount = 0;
    while (store.undo()) undoCount += 1;

    expect(undoCount).toBe(40);
    expect(store.getState().document.home.hero.title).toBe("Título 5");
  });

  it("resets only the requested Home section to its supplied baseline", () => {
    const { store, baseline } = makeStore();

    store.update({ path: "home.hero.title", value: "Hero editado" });
    store.update({ path: "home.services.title", value: "Serviços editados" });
    store.resetSection("hero");

    const state = store.getState();
    expect(state.document.home.hero).toEqual(baseline.home.hero);
    expect(state.document.home.services.title).toBe("Serviços editados");
    expect(state.canUndo).toBe(true);
  });

  it("acknowledges server saves without creating undo history", () => {
    const { store } = makeStore(3);

    store.markSaving();
    expect(store.getState().status).toBe("saving");
    store.acknowledgeSave(4);

    const state = store.getState();
    expect(state.revision).toBe(4);
    expect(state.status).toBe("clean");
    expect(state.canUndo).toBe(false);
    expect(state.canRedo).toBe(false);
  });

  it("freezes autosave on conflict until an explicit resolution", () => {
    const { store } = makeStore(5);
    store.update({ path: "home.hero.title", value: "Mudança local" });

    store.markConflict(8);
    expect(store.getState()).toMatchObject({
      status: "conflict",
      conflictRevision: 8,
      autosaveFrozen: true,
    });
    expect(store.markSaving()).toBe(false);

    store.resolveConflict("keep-local");
    expect(store.getState()).toMatchObject({
      status: "dirty",
      conflictRevision: null,
      autosaveFrozen: false,
    });
    expect(store.getState().revision).toBe(5);
  });
});
