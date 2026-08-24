import { setDraftPath } from "./path";
import type { HomeDocument, SiteDocument } from "../types";

export const DRAFT_HISTORY_LIMIT = 40;

export type DraftStoreStatus = "clean" | "dirty" | "saving" | "conflict";
export type HomeSectionKey = keyof HomeDocument;
export type DraftPatch = { path: string; value: unknown };
export type DraftMutator = (document: SiteDocument) => void;
export type DraftUpdate = DraftMutator | DraftPatch;

export interface DraftStoreState {
  document: SiteDocument;
  revision: number;
  status: DraftStoreStatus;
  canUndo: boolean;
  canRedo: boolean;
  conflictRevision: number | null;
  autosaveFrozen: boolean;
}

export type ConflictResolution =
  | "keep-local"
  | { strategy: "replace-from-server"; document: SiteDocument; revision: number };

const clone = (document: SiteDocument): SiteDocument => structuredClone(document);
const equal = (left: SiteDocument, right: SiteDocument): boolean =>
  JSON.stringify(left) === JSON.stringify(right);

const assertRevision = (revision: number): void => {
  if (!Number.isInteger(revision) || revision < 0) {
    throw new TypeError("Draft revision must be a non-negative integer.");
  }
};

export const createDraftStore = (input: {
  document: SiteDocument;
  revision: number;
  baseline: SiteDocument;
}) => {
  assertRevision(input.revision);

  let document = clone(input.document);
  let baseline = clone(input.baseline);
  let savedDocument = clone(input.document);
  let revision = input.revision;
  let status: DraftStoreStatus = "clean";
  let conflictRevision: number | null = null;
  let autosaveFrozen = false;
  let past: SiteDocument[] = [];
  let future: SiteDocument[] = [];
  const listeners = new Set<(state: DraftStoreState) => void>();

  const snapshot = (): DraftStoreState => ({
    document: clone(document),
    revision,
    status,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    conflictRevision,
    autosaveFrozen,
  });

  const emit = (): void => {
    const state = snapshot();
    for (const listener of listeners) listener(state);
  };

  const syncDirtyStatus = (): void => {
    if (status !== "conflict") status = equal(document, savedDocument) ? "clean" : "dirty";
  };

  const pushPast = (previous: SiteDocument): void => {
    past.push(clone(previous));
    if (past.length > DRAFT_HISTORY_LIMIT) past = past.slice(-DRAFT_HISTORY_LIMIT);
  };

  const commitDocument = (next: SiteDocument): boolean => {
    if (equal(document, next)) return false;
    pushPast(document);
    document = clone(next);
    future = [];
    syncDirtyStatus();
    emit();
    return true;
  };

  return {
    getState: snapshot,

    update(update: DraftUpdate): boolean {
      const next =
        typeof update === "function"
          ? (() => {
              const copy = clone(document);
              update(copy);
              return copy;
            })()
          : setDraftPath(document, update.path, update.value);
      return commitDocument(next);
    },

    undo(): boolean {
      const previous = past.at(-1);
      if (!previous) return false;
      future.push(clone(document));
      document = clone(previous);
      past = past.slice(0, -1);
      syncDirtyStatus();
      emit();
      return true;
    },

    redo(): boolean {
      const next = future.at(-1);
      if (!next) return false;
      pushPast(document);
      document = clone(next);
      future = future.slice(0, -1);
      syncDirtyStatus();
      emit();
      return true;
    },

    resetSection(sectionKey: HomeSectionKey): boolean {
      return commitDocument(
        setDraftPath(document, `home.${sectionKey}`, baseline.home[sectionKey]),
      );
    },

    markSaving(): boolean {
      if (autosaveFrozen || status === "conflict") return false;
      if (status !== "saving") {
        status = "saving";
        emit();
      }
      return true;
    },

    markSaveFailed(): void {
      if (status === "saving") {
        syncDirtyStatus();
        emit();
      }
    },

    acknowledgeSave(newRevision: number, savedSnapshot?: SiteDocument): void {
      assertRevision(newRevision);
      revision = newRevision;
      savedDocument = clone(savedSnapshot ?? document);
      conflictRevision = null;
      autosaveFrozen = false;
      syncDirtyStatus();
      emit();
    },

    markConflict(serverRevision: number): void {
      assertRevision(serverRevision);
      conflictRevision = serverRevision;
      autosaveFrozen = true;
      status = "conflict";
      emit();
    },

    resolveConflict(strategy: ConflictResolution): void {
      if (strategy === "keep-local") {
        conflictRevision = null;
        autosaveFrozen = false;
        status = equal(document, savedDocument) ? "clean" : "dirty";
        emit();
        return;
      }

      assertRevision(strategy.revision);
      document = clone(strategy.document);
      baseline = clone(strategy.document);
      savedDocument = clone(strategy.document);
      revision = strategy.revision;
      past = [];
      future = [];
      conflictRevision = null;
      autosaveFrozen = false;
      status = "clean";
      emit();
    },

    subscribe(listener: (state: DraftStoreState) => void): () => void {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};
