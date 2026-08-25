import { createAutosaveController } from "./autosave";
import { createDraftStore } from "./draft-store";
import type { SiteDocument } from "../types";

interface StudioInitialState {
  document: SiteDocument;
  baseline: SiteDocument;
  revision: number;
}

type StudioControl = Element & {
  value: string;
  dataset: DOMStringMap;
  checked?: boolean;
  type?: string;
};

const sectionLabels = new Map([
  ["hero", "Hero"],
  ["projects", "Projetos"],
  ["services", "Serviços"],
  ["process", "Processo"],
  ["plans", "Planos"],
  ["faq", "FAQ"],
  ["contact", "Contato"],
]);

const readExistingPath = (document: SiteDocument, path: string): unknown => {
  let cursor: unknown = document;
  for (const segment of path.split(".")) {
    if (Array.isArray(cursor)) {
      if (!/^\d+$/.test(segment)) return undefined;
      cursor = cursor[Number(segment)];
      continue;
    }
    if (typeof cursor !== "object" || cursor === null) return undefined;
    if (!Object.prototype.hasOwnProperty.call(cursor, segment)) return undefined;
    cursor = (cursor as Record<string, unknown>)[segment];
  }
  return cursor;
};

const parseInitialState = (): StudioInitialState | null => {
  const node = document.querySelector<HTMLScriptElement>("#studio-initial-state");
  if (!node?.textContent) return null;
  try {
    const parsed = JSON.parse(node.textContent) as StudioInitialState;
    if (!Number.isInteger(parsed.revision) || parsed.revision < 0) return null;
    if (!parsed.document || !parsed.baseline) return null;
    return parsed;
  } catch {
    return null;
  }
};

const isStudioControl = (target: EventTarget | null): target is StudioControl =>
  target instanceof Element &&
  target.matches("input[data-studio-path], textarea[data-studio-path], select[data-studio-path]") &&
  "value" in target;

export const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
};

export const setupStudioController = (): void => {
  const root = document.querySelector<HTMLElement>("[data-studio-root]");
  if (!root || root.dataset.studioReady === "true") return;

  const initial = parseInitialState();
  if (!initial) return;
  root.dataset.studioReady = "true";

  const store = createDraftStore(initial);
  const autosave = createAutosaveController({ store });
  const undoButton = root.querySelector<HTMLButtonElement>("[data-studio-undo]");
  const redoButton = root.querySelector<HTMLButtonElement>("[data-studio-redo]");
  const retryButton = root.querySelector<HTMLButtonElement>("[data-studio-retry]");
  const statusNode = root.querySelector<HTMLElement>("[data-studio-save-status]");
  const previewFrame = root.querySelector<HTMLIFrameElement>("[data-preview-frame]");
  const conflictDialog = document.querySelector<HTMLDialogElement>("#studio-conflict-dialog");
  let lastPreviewRevision = store.getState().revision;

  const controls = (): StudioControl[] =>
    Array.from(root.querySelectorAll("[data-studio-path]")).filter(isStudioControl);

  const syncControl = (control: StudioControl, documentState: SiteDocument): void => {
    const path = control.dataset.studioPath;
    if (!path) return;
    const current = readExistingPath(documentState, path);

    if (control.dataset.studioValueType === "string-array-member" && control.tagName === "INPUT") {
      control.checked = Array.isArray(current) && current.includes(control.value);
      return;
    }

    if (
      control.dataset.studioValueType === "boolean" &&
      control.tagName === "INPUT" &&
      control.type === "checkbox"
    ) {
      control.checked = current === true;
      return;
    }

    if (typeof current === "string" && control.value !== current) control.value = current;
  };

  const syncInterface = (): void => {
    const state = store.getState();
    controls().forEach((control) => syncControl(control, state.document));
    if (undoButton) undoButton.disabled = !state.canUndo;
    if (redoButton) redoButton.disabled = !state.canRedo;

    root.dispatchEvent(
      new CustomEvent("menezesdev:studio-draft", {
        detail: { document: state.document, revision: state.revision },
      }),
    );
  };

  const applyControl = (control: StudioControl): void => {
    const path = control.dataset.studioPath;
    if (!path) return;

    if (control.dataset.studioValueType === "string-array-member" && control.tagName === "INPUT") {
      const current = readExistingPath(store.getState().document, path);
      if (!Array.isArray(current)) return;
      const values = current.filter((item): item is string => typeof item === "string");
      const next = control.checked
        ? values.includes(control.value)
          ? values
          : [...values, control.value]
        : values.filter((value) => value !== control.value);
      store.update({ path, value: next });
      return;
    }

    if (
      control.dataset.studioValueType === "boolean" &&
      control.tagName === "INPUT" &&
      control.type === "checkbox"
    ) {
      store.update({ path, value: control.checked === true });
      return;
    }

    store.update({ path, value: control.value });
  };

  root.addEventListener("input", (event) => {
    if (isStudioControl(event.target) && event.target.tagName !== "SELECT") {
      applyControl(event.target);
    }
  });

  root.addEventListener("change", (event) => {
    if (
      isStudioControl(event.target) &&
      (event.target.tagName === "SELECT" || event.target.type === "checkbox")
    ) {
      applyControl(event.target);
    }
  });

  const setActiveSection = (sectionKey: string): void => {
    if (!sectionLabels.has(sectionKey)) return;
    root.dataset.studioActiveSection = sectionKey;
    root.querySelectorAll<HTMLElement>("[data-studio-section]").forEach((panel) => {
      panel.hidden = panel.dataset.studioSection !== sectionKey;
    });
    root.querySelectorAll<HTMLButtonElement>("[data-studio-section-target]").forEach((button) => {
      const active = button.dataset.studioSectionTarget === sectionKey;
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  };

  root.querySelectorAll<HTMLButtonElement>("[data-studio-section-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionKey = button.dataset.studioSectionTarget;
      if (sectionKey) setActiveSection(sectionKey);
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-studio-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.studioMode;
      if (mode !== "editor" && mode !== "preview") return;
      root.dataset.studioActiveMode = mode;
      root.querySelectorAll<HTMLButtonElement>("[data-studio-mode]").forEach((candidate) => {
        candidate.setAttribute("aria-pressed", String(candidate === button));
      });
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-studio-reset-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionKey = button.dataset.studioResetSection;
      if (!sectionKey || !sectionLabels.has(sectionKey)) return;
      store.resetSection(sectionKey as Parameters<typeof store.resetSection>[0]);
    });
  });

  undoButton?.addEventListener("click", () => store.undo());
  redoButton?.addEventListener("click", () => store.redo());
  retryButton?.addEventListener("click", () => autosave.retry());

  root.addEventListener("keydown", (event) => {
    if (!(event.ctrlKey || event.metaKey) || isEditableTarget(event.target)) return;
    const key = event.key.toLowerCase();
    if (key === "z" && !event.shiftKey) {
      event.preventDefault();
      store.undo();
      return;
    }
    if ((key === "z" && event.shiftKey) || key === "y") {
      event.preventDefault();
      store.redo();
    }
  });

  store.subscribe(syncInterface);
  autosave.subscribe((next) => {
    const draftState = store.getState();
    if (statusNode) {
      statusNode.textContent =
        next.phase === "saving"
          ? "Salvando rascunho…"
          : next.phase === "scheduled"
            ? "Alterações aguardando salvamento…"
            : next.phase === "retry"
              ? "Falha ao salvar. Suas alterações continuam neste navegador."
              : next.phase === "conflict"
                ? "Conflito detectado. Salvamento automático pausado."
                : draftState.status === "clean"
                  ? "Rascunho sincronizado."
                  : "Alterações locais.";
    }
    if (retryButton) retryButton.hidden = next.phase !== "retry";
    if (
      next.phase === "idle" &&
      draftState.status === "clean" &&
      draftState.revision !== lastPreviewRevision
    ) {
      lastPreviewRevision = draftState.revision;
      previewFrame?.contentWindow?.location.reload();
    }
    if (next.phase === "conflict" && conflictDialog && !conflictDialog.open) {
      conflictDialog.showModal();
    }
  });

  conflictDialog
    ?.querySelector<HTMLButtonElement>('[data-conflict-action="keep-local"]')
    ?.addEventListener("click", () => conflictDialog.close());
  conflictDialog
    ?.querySelector<HTMLButtonElement>('[data-conflict-action="reload-server"]')
    ?.addEventListener("click", () => window.location.reload());

  syncInterface();
};
