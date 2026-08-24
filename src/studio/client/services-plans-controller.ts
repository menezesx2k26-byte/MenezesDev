import { createAutosaveController } from "./autosave";
import { createDraftStore } from "./draft-store";
import {
  movePlan,
  moveService,
  setPlanStartingPrice,
  setPlanVisibility,
  setRecommendedPlan,
  setServiceVisibility,
  type ListMoveDirection,
} from "./services-plans";
import type { SiteDocument } from "../types";

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

const lines = (value: string): string[] =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

export const setupServicesPlansController = (): void => {
  const root = document.querySelector<HTMLElement>("[data-services-plans-root]");
  if (!root || root.dataset.businessReady === "true") return;
  const initial = parseInitialState();
  if (!initial) return;
  root.dataset.businessReady = "true";

  const store = createDraftStore(initial);
  const autosave = createAutosaveController({ store });
  const statusNode = root.querySelector<HTMLElement>("[data-business-save-status]");
  const conflictDialog = document.querySelector<HTMLDialogElement>("#studio-conflict-dialog");
  let pendingReload = false;

  const commit = (next: SiteDocument): boolean => replaceDocument(store, next);

  root.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
    const path = target.dataset.businessPath;
    if (!path || target.type === "checkbox" || target.hasAttribute("data-plan-price-cents")) return;
    const value = target.dataset.businessValueType === "lines" ? lines(target.value) : target.value;
    store.update({ path, value });
  });

  root.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const id = target.dataset.businessId;
    if (!id) return;

    try {
      if (target.hasAttribute("data-service-visible")) {
        commit(setServiceVisibility(store.getState().document, id, target.checked));
        return;
      }
      if (target.hasAttribute("data-plan-visible")) {
        commit(setPlanVisibility(store.getState().document, id, target.checked));
        pendingReload = true;
        return;
      }
      if (target.hasAttribute("data-plan-recommended")) {
        commit(setRecommendedPlan(store.getState().document, id, target.checked));
        pendingReload = true;
        return;
      }
      if (target.hasAttribute("data-plan-price-cents")) {
        const cents = target.value.trim() === "" ? null : Number(target.value);
        const next = setPlanStartingPrice(store.getState().document, id, cents);
        commit(next);
        const label = next.home.plans.items.find((plan) => plan.id === id)?.priceLabel;
        const labelNode = root.querySelector<HTMLElement>(`[data-plan-price-label="${CSS.escape(id)}"]`);
        if (labelNode && label) labelNode.textContent = label;
        target.setCustomValidity("");
      }
    } catch (error) {
      if (target.hasAttribute("data-service-visible") || target.hasAttribute("data-plan-visible")) {
        target.checked = !target.checked;
      }
      if (target.hasAttribute("data-plan-price-cents")) {
        target.setCustomValidity(error instanceof Error ? error.message : "Preço inválido.");
        target.reportValidity();
      }
    }
  });

  root.addEventListener("click", (event) => {
    const button =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>("button[data-business-action]")
        : null;
    if (!button) return;
    const action = button.dataset.businessAction;
    const id = button.dataset.businessId;
    if (!id) return;

    const direction: ListMoveDirection | null =
      action?.endsWith("move-up") ? "up" : action?.endsWith("move-down") ? "down" : null;
    if (!direction) return;

    if (action?.startsWith("service-")) {
      if (commit(moveService(store.getState().document, id, direction))) pendingReload = true;
      return;
    }
    if (action?.startsWith("plan-")) {
      if (commit(movePlan(store.getState().document, id, direction))) pendingReload = true;
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
