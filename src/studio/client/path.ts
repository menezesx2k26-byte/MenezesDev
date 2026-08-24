import type { SiteDocument } from "../types";

const BLOCKED_SEGMENTS = new Set(["__proto__", "prototype", "constructor"]);
const DOCUMENT_ROOTS = new Set([
  "schemaVersion",
  "brand",
  "navigation",
  "home",
  "projects",
  "commercial",
  "seo",
  "presentation",
]);
const MAX_PATH_DEPTH = 10;
const ARRAY_INDEX = /^(0|[1-9]\d*)$/;

type JsonContainer = Record<string, unknown> | unknown[];

const cloneDocument = (document: SiteDocument): SiteDocument => structuredClone(document);

const parseDraftPath = (path: string): string[] => {
  if (typeof path !== "string" || path.length === 0 || path.length > 240) {
    throw new TypeError("Draft path must be a non-empty bounded string.");
  }

  const segments = path.split(".");
  if (segments.length === 0 || segments.length > MAX_PATH_DEPTH || segments.some((part) => !part)) {
    throw new TypeError("Draft path has an invalid depth or empty segment.");
  }
  if (!DOCUMENT_ROOTS.has(segments[0] ?? "")) {
    throw new TypeError("Draft path root is outside the SiteDocument schema.");
  }
  if (segments.some((segment) => BLOCKED_SEGMENTS.has(segment))) {
    throw new TypeError("Draft path contains a forbidden segment.");
  }

  return segments;
};

const own = (value: object, key: PropertyKey): boolean => Object.prototype.hasOwnProperty.call(value, key);

const resolveSegment = (container: JsonContainer, segment: string): string | number => {
  if (Array.isArray(container)) {
    if (!ARRAY_INDEX.test(segment)) throw new TypeError("Array paths must use numeric indexes.");
    const index = Number(segment);
    if (index >= container.length) throw new RangeError("Draft array index is outside the document.");
    return index;
  }

  if (!own(container, segment)) {
    throw new TypeError("Draft path must target an existing schema property.");
  }
  return segment;
};

const asContainer = (value: unknown): JsonContainer => {
  if (typeof value !== "object" || value === null) {
    throw new TypeError("Draft path cannot traverse through a scalar value.");
  }
  return value as JsonContainer;
};

/**
 * Replaces a value only at a path that already exists in the current SiteDocument.
 * The original document is never mutated and prototype-related segments are rejected.
 */
export const setDraftPath = (document: SiteDocument, path: string, value: unknown): SiteDocument => {
  const segments = parseDraftPath(path);
  const next = cloneDocument(document);
  let cursor: JsonContainer = next as unknown as JsonContainer;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    if (segment === undefined) throw new TypeError("Draft path is incomplete.");
    const key = resolveSegment(cursor, segment);
    cursor = asContainer(cursor[key as keyof typeof cursor]);
  }

  const finalSegment = segments.at(-1);
  if (finalSegment === undefined) throw new TypeError("Draft path is incomplete.");
  const finalKey = resolveSegment(cursor, finalSegment);
  (cursor as Record<string | number, unknown>)[finalKey] = structuredClone(value);

  return next;
};
