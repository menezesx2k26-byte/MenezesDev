import { createDraftStore } from "./draft-store";
import type { SiteDocument } from "../types";

type DraftStore = ReturnType<typeof createDraftStore>;

interface BeforeUnloadTarget {
  addEventListener(type: "beforeunload", listener: (event: BeforeUnloadEvent) => void): void;
  removeEventListener(type: "beforeunload", listener: (event: BeforeUnloadEvent) => void): void;
}

export type AutosavePhase = "idle" | "scheduled" | "saving" | "retry" | "conflict";

export interface AutosaveState {
  phase: AutosavePhase;
  lastError: string | null;
}

const clone = (document: SiteDocument): SiteDocument => structuredClone(document);
const serialize = (document: SiteDocument): string => JSON.stringify(document);

const isRevision = (value: unknown): value is number =>
  Number.isInteger(value) && Number(value) >= 0;

export const createAutosaveController = (input: {
  store: DraftStore;
  fetcher?: typeof fetch;
  debounceMs?: number;
  endpoint?: string;
  beforeUnloadTarget?: BeforeUnloadTarget;
}) => {
  const fetcher = input.fetcher ?? fetch;
  const debounceMs = Math.max(0, Math.trunc(input.debounceMs ?? 500));
  const endpoint = input.endpoint ?? "/api/admin/draft";
  const beforeUnloadTarget =
    input.beforeUnloadTarget ??
    (typeof window === "undefined" ? undefined : (window as BeforeUnloadTarget));

  let state: AutosaveState = { phase: "idle", lastError: null };
  let timer: ReturnType<typeof setTimeout> | null = null;
  let disposed = false;
  let inFlight = false;
  let queuedWhileSaving = false;
  let requestSequence = 0;
  let activeAbort: AbortController | null = null;
  let lastDocumentFingerprint = serialize(input.store.getState().document);
  const listeners = new Set<(next: AutosaveState) => void>();

  const emit = (): void => {
    const snapshot = { ...state };
    for (const listener of listeners) listener(snapshot);
  };

  const setState = (phase: AutosavePhase, lastError: string | null = null): void => {
    if (state.phase === phase && state.lastError === lastError) return;
    state = { phase, lastError };
    emit();
  };

  const clearTimer = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const schedule = (): boolean => {
    const draft = input.store.getState();
    if (
      disposed ||
      inFlight ||
      state.phase === "retry" ||
      state.phase === "conflict" ||
      draft.autosaveFrozen ||
      draft.status === "clean"
    ) {
      return false;
    }

    clearTimer();
    setState("scheduled");
    timer = setTimeout(() => {
      timer = null;
      void saveNow();
    }, debounceMs);
    return true;
  };

  let followupAfterRequest = false;

  const saveNow = async (): Promise<boolean> => {
    const current = input.store.getState();
    if (
      disposed ||
      inFlight ||
      state.phase === "conflict" ||
      current.autosaveFrozen ||
      current.status === "clean"
    ) {
      return false;
    }

    clearTimer();
    const document = clone(current.document);
    const expectedRevision = current.revision;
    const sequence = ++requestSequence;
    const abortController = new AbortController();
    activeAbort = abortController;
    inFlight = true;
    queuedWhileSaving = false;
    followupAfterRequest = false;
    input.store.markSaving();
    setState("saving");

    try {
      const response = await fetcher(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        signal: abortController.signal,
        body: JSON.stringify({ document, expectedRevision }),
      });

      if (disposed || sequence !== requestSequence) return false;

      const payload = (await response.json().catch(() => null)) as
        | { revision?: unknown; error?: { currentRevision?: unknown } }
        | null;

      if (response.status === 409) {
        const serverRevision = payload?.error?.currentRevision;
        input.store.markConflict(isRevision(serverRevision) ? serverRevision : expectedRevision);
        setState("conflict");
        return false;
      }

      if (!response.ok || !isRevision(payload?.revision)) {
        input.store.markSaveFailed();
        setState("retry", `save_failed_${response.status}`);
        return false;
      }

      input.store.acknowledgeSave(payload.revision, document);
      const afterAck = input.store.getState();
      followupAfterRequest =
        queuedWhileSaving || (afterAck.status === "dirty" && !afterAck.autosaveFrozen);
      setState("idle");
      return true;
    } catch (error) {
      if (disposed || abortController.signal.aborted) return false;
      input.store.markSaveFailed();
      setState("retry", error instanceof Error ? error.message : "network_error");
      return false;
    } finally {
      if (sequence === requestSequence) {
        inFlight = false;
        activeAbort = null;
        const shouldSchedule = followupAfterRequest;
        followupAfterRequest = false;
        if (shouldSchedule && state.phase !== "retry" && state.phase !== "conflict") schedule();
      }
    }
  };

  const unsubscribeStore = input.store.subscribe((draft) => {
    const fingerprint = serialize(draft.document);
    const documentChanged = fingerprint !== lastDocumentFingerprint;
    lastDocumentFingerprint = fingerprint;

    if (draft.status === "conflict" || draft.autosaveFrozen) {
      clearTimer();
      setState("conflict");
      return;
    }

    if (!documentChanged) return;
    if (inFlight) {
      queuedWhileSaving = true;
      return;
    }
    if (state.phase === "retry") return;
    if (draft.status !== "clean") schedule();
  });

  const beforeUnload = (event: BeforeUnloadEvent): void => {
    if (input.store.getState().status === "clean") return;
    event.preventDefault();
    event.returnValue = "";
  };

  beforeUnloadTarget?.addEventListener("beforeunload", beforeUnload);

  return {
    getState: (): AutosaveState => ({ ...state }),

    retry(): boolean {
      const draft = input.store.getState();
      if (
        disposed ||
        inFlight ||
        state.phase !== "retry" ||
        draft.status === "clean" ||
        draft.autosaveFrozen
      ) {
        return false;
      }
      void saveNow();
      return true;
    },

    subscribe(listener: (next: AutosaveState) => void): () => void {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    dispose(): void {
      if (disposed) return;
      disposed = true;
      clearTimer();
      activeAbort?.abort();
      activeAbort = null;
      unsubscribeStore();
      beforeUnloadTarget?.removeEventListener("beforeunload", beforeUnload);
      listeners.clear();
    },
  };
};
