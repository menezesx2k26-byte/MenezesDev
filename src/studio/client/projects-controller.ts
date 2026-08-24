import { createAutosaveController } from "./autosave";
import { createDraftStore } from "./draft-store";
import {
  archiveProject,
  changeProjectSlug,
  duplicateProject,
  moveProject,
  setProjectHomeVisibility,
  type ProjectMoveDirection,
} from "./projects";
import type { SiteDocument } from "../types";

interface ProjectInitialState {
  document: SiteDocument;
  baseline: SiteDocument;
  revision: number;
}

type ProjectStore = ReturnType<typeof createDraftStore>;

const parseInitialState = (): ProjectInitialState | null => {
  const node = document.querySelector<HTMLScriptElement>("#studio-initial-state");
  if (!node?.textContent) return null;
  try {
    const parsed = JSON.parse(node.textContent) as ProjectInitialState;
    if (!Number.isInteger(parsed.revision) || parsed.revision < 0) return null;
    if (!parsed.document || !parsed.baseline) return null;
    return parsed;
  } catch {
    return null;
  }
};

const replaceDocument = (store: ProjectStore, next: SiteDocument): boolean =>
  store.update((draft) => {
    const clone = structuredClone(next);
    draft.schemaVersion = clone.schemaVersion;
    draft.brand = clone.brand;
    draft.navigation = clone.navigation;
    draft.home = clone.home;
    draft.projects = clone.projects;
    draft.commercial = clone.commercial;
    draft.seo = clone.seo;
    draft.presentation = clone.presentation;
  });

const nextDuplicateIdentity = (documentState: SiteDocument, sourceId: string) => {
  const source = documentState.projects.find((project) => project.id === sourceId);
  if (!source) throw new RangeError(`Project id not found: ${sourceId}`);

  let suffix = 1;
  let slug = `${source.slug}-copia`;
  while (documentState.projects.some((project) => project.slug === slug)) {
    suffix += 1;
    slug = `${source.slug}-copia-${suffix}`;
  }
  return {
    id: `project-${slug}`,
    slug,
    name: `${source.name} — cópia`,
  };
};

const lines = (value: string): string[] =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

export const setupProjectsController = (): void => {
  const root = document.querySelector<HTMLElement>("[data-projects-root]");
  if (!root || root.dataset.projectsReady === "true") return;
  const initial = parseInitialState();
  if (!initial) return;
  root.dataset.projectsReady = "true";

  const store = createDraftStore(initial);
  const autosave = createAutosaveController({ store });
  const statusNode = root.querySelector<HTMLElement>("[data-project-save-status]");
  const conflictDialog = document.querySelector<HTMLDialogElement>("#studio-conflict-dialog");
  const slugDialog = document.querySelector<HTMLDialogElement>("#project-slug-change-dialog");
  const slugInput = root.querySelector<HTMLInputElement>("[data-project-slug-input]");
  const editor = root.querySelector<HTMLElement>("[data-project-editor]");
  let pendingReload = false;
  let pendingNavigationId: string | null = null;
  let pendingSlug: string | null = null;

  const commit = (next: SiteDocument): boolean => replaceDocument(store, next);

  root.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
    const path = target.dataset.projectPath;
    if (!path || target === slugInput) return;
    const value = target.dataset.projectValueType === "lines" ? lines(target.value) : target.value;
    store.update({ path, value });
  });

  root.addEventListener("change", (event) => {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      const path = target.dataset.projectPath;
      if (path) store.update({ path, value: target.value });
      return;
    }

    if (target instanceof HTMLInputElement && target.dataset.projectField === "showOnHome") {
      const projectId = target.dataset.projectId;
      if (!projectId) return;
      try {
        commit(setProjectHomeVisibility(store.getState().document, projectId, target.checked));
      } catch {
        target.checked = false;
      }
    }
  });

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("button[data-project-action]") : null;
    if (!target) return;
    const action = target.dataset.projectAction;
    const projectId = target.dataset.projectId ?? editor?.dataset.projectId;
    if (!projectId) return;

    if (action === "move-up" || action === "move-down") {
      const direction: ProjectMoveDirection = action === "move-up" ? "up" : "down";
      if (commit(moveProject(store.getState().document, projectId, direction))) pendingReload = true;
      return;
    }

    if (action === "archive") {
      if (commit(archiveProject(store.getState().document, projectId))) pendingReload = true;
      return;
    }

    if (action === "duplicate") {
      const identity = nextDuplicateIdentity(store.getState().document, projectId);
      if (commit(duplicateProject(store.getState().document, projectId, identity))) {
        pendingNavigationId = identity.id;
      }
      return;
    }

    if (action === "request-slug-change" && slugInput && slugDialog) {
      const current = store.getState().document.projects.find((project) => project.id === projectId);
      if (!current) return;
      const nextSlug = slugInput.value.trim();
      if (nextSlug === current.slug) return;
      try {
        changeProjectSlug(store.getState().document, projectId, nextSlug, false);
      } catch (error) {
        if (!(error instanceof Error) || !/confirm/i.test(error.message)) {
          slugInput.setCustomValidity(error instanceof Error ? error.message : "Slug inválido.");
          slugInput.reportValidity();
          return;
        }
      }
      slugInput.setCustomValidity("");
      pendingSlug = nextSlug;
      const currentNode = slugDialog.querySelector<HTMLElement>("[data-project-slug-current]");
      const nextNode = slugDialog.querySelector<HTMLElement>("[data-project-slug-next]");
      if (currentNode) currentNode.textContent = current.slug;
      if (nextNode) nextNode.textContent = nextSlug;
      slugDialog.showModal();
    }
  });

  slugDialog?.querySelector<HTMLButtonElement>("[data-project-slug-cancel]")?.addEventListener("click", () => {
    pendingSlug = null;
    const projectId = editor?.dataset.projectId;
    const current = projectId
      ? store.getState().document.projects.find((project) => project.id === projectId)
      : null;
    if (slugInput && current) slugInput.value = current.slug;
    slugDialog.close();
  });

  slugDialog?.querySelector<HTMLButtonElement>("[data-project-slug-confirm]")?.addEventListener("click", () => {
    const projectId = editor?.dataset.projectId;
    if (!projectId || !pendingSlug) return;
    try {
      const next = changeProjectSlug(store.getState().document, projectId, pendingSlug, true);
      commit(next);
      if (slugInput) slugInput.value = pendingSlug;
      pendingSlug = null;
      slugDialog.close();
    } catch (error) {
      if (slugInput) {
        slugInput.setCustomValidity(error instanceof Error ? error.message : "Slug inválido.");
        slugInput.reportValidity();
      }
    }
  });

  autosave.subscribe((state) => {
    if (statusNode) {
      statusNode.textContent =
        state.phase === "saving"
          ? "Salvando projetos…"
          : state.phase === "scheduled"
            ? "Alterações aguardando salvamento…"
            : state.phase === "retry"
              ? "Falha ao salvar. As alterações continuam neste navegador."
              : state.phase === "conflict"
                ? "Conflito detectado. Salvamento automático pausado."
                : store.getState().status === "clean"
                  ? "Rascunho sincronizado."
                  : "Alterações locais.";
    }

    if (state.phase === "conflict" && conflictDialog && !conflictDialog.open) {
      conflictDialog.showModal();
    }

    if (state.phase === "idle" && store.getState().status === "clean") {
      if (pendingNavigationId) {
        const destination = `/admin/projetos/${encodeURIComponent(pendingNavigationId)}`;
        pendingNavigationId = null;
        window.location.assign(destination);
      } else if (pendingReload) {
        pendingReload = false;
        window.location.reload();
      }
    }
  });

  conflictDialog
    ?.querySelector<HTMLButtonElement>('[data-conflict-action="keep-local"]')
    ?.addEventListener("click", () => conflictDialog.close());
  conflictDialog
    ?.querySelector<HTMLButtonElement>('[data-conflict-action="reload-server"]')
    ?.addEventListener("click", () => window.location.reload());
};
