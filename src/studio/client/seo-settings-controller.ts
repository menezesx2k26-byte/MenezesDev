import { createAutosaveController } from "./autosave";
import { createDraftStore } from "./draft-store";
import {
  addSocialLink,
  moveNavigationItem,
  moveSocialLink,
  removeSocialLink,
  setWhatsappDestination,
  type ListMoveDirection,
} from "../seo-settings";
import type { SiteDocument } from "../types";
import { isAllowedSocialUrl } from "../url-policy";

interface InitialState {
  document: SiteDocument;
  baseline: SiteDocument;
  revision: number;
}

type Store = ReturnType<typeof createDraftStore>;

const parseInitialState = (): InitialState | null => {
  const node = document.querySelector<HTMLScriptElement>("#studio-initial-state");
  if (!node?.textContent) return null;
  try {
    const parsed = JSON.parse(node.textContent) as InitialState;
    if (!Number.isInteger(parsed.revision) || parsed.revision < 0) return null;
    if (!parsed.document || !parsed.baseline) return null;
    return parsed;
  } catch {
    return null;
  }
};

const replaceDocument = (store: Store, next: SiteDocument): boolean =>
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

const updatePreview = (root: HTMLElement, field: string, value: string): void => {
  root.querySelectorAll<HTMLElement>(`[data-seo-preview="${CSS.escape(field)}"]`).forEach((node) => {
    node.textContent = value;
  });
  const count = root.querySelector<HTMLElement>(`[data-seo-count="${CSS.escape(field)}"]`);
  if (count) count.textContent = String(value.length);
};

const moveDirection = (action: string | undefined): ListMoveDirection | null =>
  action?.endsWith("move-up") ? "up" : action?.endsWith("move-down") ? "down" : null;

export const setupSeoSettingsController = (): void => {
  const root = document.querySelector<HTMLElement>("[data-seo-settings-root]");
  if (!root || root.dataset.seoSettingsReady === "true") return;
  const initial = parseInitialState();
  if (!initial) return;
  root.dataset.seoSettingsReady = "true";

  const store = createDraftStore(initial);
  const autosave = createAutosaveController({ store });
  const statusNode = root.querySelector<HTMLElement>("[data-seo-settings-save-status]");
  const conflictDialog = document.querySelector<HTMLDialogElement>("#studio-conflict-dialog");
  let pendingReload = false;

  const commit = (next: SiteDocument): boolean => replaceDocument(store, next);

  root.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

    const previewField = target.dataset.previewField;
    if (previewField) updatePreview(root, previewField, target.value);

    const path = target.dataset.settingsPath;
    if (!path || target.type === "checkbox") return;
    store.update({ path, value: target.value });
  });

  root.addEventListener("change", (event) => {
    const target = event.target;

    if (target instanceof HTMLSelectElement) {
      const path = target.dataset.settingsPath;
      if (path) store.update({ path, value: target.value });
      return;
    }

    if (!(target instanceof HTMLInputElement)) return;

    if (target.hasAttribute("data-whatsapp-url")) {
      try {
        const value = target.value.trim() === "" ? null : target.value;
        commit(setWhatsappDestination(store.getState().document, value));
        target.setCustomValidity("");
      } catch (error) {
        target.setCustomValidity(error instanceof Error ? error.message : "Destino inválido.");
        target.reportValidity();
      }
      return;
    }

    if (target.hasAttribute("data-social-href")) {
      const index = Number(target.dataset.socialIndex);
      if (!Number.isInteger(index) || index < 0) return;
      const href = target.value.trim();
      if (!isAllowedSocialUrl(href)) {
        target.setCustomValidity("Use uma URL HTTP ou HTTPS absoluta.");
        target.reportValidity();
        return;
      }
      target.setCustomValidity("");
      store.update({ path: `commercial.socialLinks.${index}.href`, value: href });
    }
  });

  root.addEventListener("click", (event) => {
    const button =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>("button[data-settings-action]")
        : null;
    if (!button) return;

    const action = button.dataset.settingsAction;
    const id = button.dataset.settingsId;

    try {
      if (action === "social-add") {
        const labelInput = root.querySelector<HTMLInputElement>("[data-new-social-label]");
        const hrefInput = root.querySelector<HTMLInputElement>("[data-new-social-href]");
        if (!labelInput || !hrefInput) return;
        commit(
          addSocialLink(store.getState().document, {
            label: labelInput.value,
            href: hrefInput.value,
          }),
        );
        labelInput.setCustomValidity("");
        hrefInput.setCustomValidity("");
        pendingReload = true;
        return;
      }

      if (!id) return;
      if (action === "social-remove") {
        commit(removeSocialLink(store.getState().document, id));
        pendingReload = true;
        return;
      }

      const direction = moveDirection(action);
      if (!direction) return;
      if (action?.startsWith("social-")) {
        if (commit(moveSocialLink(store.getState().document, id, direction))) pendingReload = true;
        return;
      }
      if (action?.startsWith("nav-")) {
        if (commit(moveNavigationItem(store.getState().document, id, direction))) pendingReload = true;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Configuração inválida.";
      const hrefInput = root.querySelector<HTMLInputElement>("[data-new-social-href]");
      if (action === "social-add" && hrefInput) {
        hrefInput.setCustomValidity(message);
        hrefInput.reportValidity();
      }
    }
  });

  autosave.subscribe((state) => {
    if (statusNode) {
      statusNode.textContent =
        state.phase === "saving"
          ? "Salvando alterações…"
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
    if (pendingReload && state.phase === "idle" && store.getState().status === "clean") {
      pendingReload = false;
      window.location.reload();
    }
  });

  conflictDialog
    ?.querySelector<HTMLButtonElement>('[data-conflict-action="keep-local"]')
    ?.addEventListener("click", () => conflictDialog.close());
  conflictDialog
    ?.querySelector<HTMLButtonElement>('[data-conflict-action="reload-server"]')
    ?.addEventListener("click", () => window.location.reload());
};
