import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";
import {
  StudioDocumentValidationError,
  StudioRevisionConflictError,
} from "../../src/studio/errors";

type HttpModule = typeof import("../../src/studio/http");

let httpModule: HttpModule | null = null;
try {
  httpModule = await import("../../src/studio/http");
} catch {
  httpModule = null;
}

const requireHttp = () => {
  expect(
    httpModule,
    "src/studio/http.ts must implement the bounded admin HTTP boundary",
  ).not.toBeNull();
  return httpModule as HttpModule;
};

const routePaths = [
  "src/pages/api/admin/state.ts",
  "src/pages/api/admin/draft.ts",
  "src/pages/api/admin/publish.ts",
  "src/pages/api/admin/versions/index.ts",
  "src/pages/api/admin/versions/[id].ts",
  "src/pages/api/admin/versions/[id]/restore.ts",
] as const;

const routeSources = routePaths.map((path) => ({
  path,
  source: existsSync(resolve(process.cwd(), path))
    ? readFileSync(resolve(process.cwd(), path), "utf8")
    : "",
}));

describe("Studio admin HTTP boundary", () => {
  it("keeps admin identity fail-closed outside DEV and non-personal in local DEV", () => {
    const http = requireHttp();
    expect(http.requireStudioAdminContext({ isDev: false })).toBeNull();
    expect(http.requireStudioAdminContext({ isDev: true })).toEqual({ actor: "local-admin" });
    expect(http.privateAdminNotFoundResponse().status).toBe(404);
    expect(http.privateAdminNotFoundResponse().headers.get("cache-control")).toContain("no-store");
  });

  it("accepts bounded application/json and rejects unsupported or malformed bodies", async () => {
    const http = requireHttp();
    expect(http.STUDIO_ADMIN_BODY_LIMIT_BYTES).toBe(524_288);

    const valid = new Request("http://127.0.0.1/api/admin/draft", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ expectedRevision: 2 }),
    });
    await expect(http.readStudioJson(valid)).resolves.toEqual({ expectedRevision: 2 });

    const unsupported = new Request("http://127.0.0.1/api/admin/draft", {
      method: "PUT",
      headers: { "content-type": "text/plain" },
      body: "{}",
    });
    await expect(http.readStudioJson(unsupported)).rejects.toMatchObject({
      status: 415,
      code: "unsupported_media_type",
    });

    const malformed = new Request("http://127.0.0.1/api/admin/draft", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: "{broken",
    });
    await expect(http.readStudioJson(malformed)).rejects.toMatchObject({
      status: 400,
      code: "invalid_json",
    });

    const oversized = new Request("http://127.0.0.1/api/admin/draft", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "content-length": String(http.STUDIO_ADMIN_BODY_LIMIT_BYTES + 1),
      },
      body: "{}",
    });
    await expect(http.readStudioJson(oversized)).rejects.toMatchObject({
      status: 413,
      code: "payload_too_large",
    });
  });

  it("parses only non-negative integer expected revisions", () => {
    const http = requireHttp();
    expect(http.parseExpectedRevision(0)).toBe(0);
    expect(http.parseExpectedRevision(42)).toBe(42);
    for (const value of [-1, 1.5, "1", null, undefined]) {
      expect(() => http.parseExpectedRevision(value)).toThrowError(
        expect.objectContaining({ status: 400, code: "invalid_revision" }),
      );
    }
  });

  it("requires exact same-origin identity for state-changing requests", () => {
    const http = requireHttp();
    const sameOrigin = new Request("http://127.0.0.1:4321/api/admin/publish", {
      method: "POST",
      headers: { origin: "http://127.0.0.1:4321" },
    });
    expect(() => http.assertStudioSameOrigin(sameOrigin)).not.toThrow();

    const missing = new Request("http://127.0.0.1:4321/api/admin/publish", { method: "POST" });
    expect(() => http.assertStudioSameOrigin(missing)).toThrowError(
      expect.objectContaining({ status: 403, code: "origin_required" }),
    );

    const crossOrigin = new Request("http://127.0.0.1:4321/api/admin/publish", {
      method: "POST",
      headers: { origin: "https://attacker.invalid" },
    });
    expect(() => http.assertStudioSameOrigin(crossOrigin)).toThrowError(
      expect.objectContaining({ status: 403, code: "origin_mismatch" }),
    );
  });

  it("normalizes known Studio failures without stack traces and never caches them", async () => {
    const http = requireHttp();
    const conflict = http.studioErrorResponse(new StudioRevisionConflictError(2, 3));
    expect(conflict.status).toBe(409);
    expect(conflict.headers.get("cache-control")).toContain("no-store");
    expect(await conflict.json()).toEqual({
      error: {
        code: "revision_conflict",
        message: "The Studio draft changed elsewhere.",
        expectedRevision: 2,
        currentRevision: 3,
      },
    });

    const invalidDocument = createDefaultSiteDocument();
    invalidDocument.home.hero.title = "";
    const validation = http.studioErrorResponse(
      new StudioDocumentValidationError([
        { path: "home.hero.title", code: "required", message: "Value is required." },
      ]),
    );
    expect(validation.status).toBe(422);
    expect(await validation.json()).toMatchObject({
      error: { code: "validation_failed" },
      issues: [{ path: "home.hero.title", code: "required" }],
    });

    const unknown = http.studioErrorResponse(new Error("secret internal detail"));
    expect(unknown.status).toBe(500);
    const unknownBody = JSON.stringify(await unknown.json());
    expect(unknownBody).not.toContain("secret internal detail");
    expect(unknownBody).not.toMatch(/stack/i);
  });

  it("returns explicit 405 responses in DEV with Allow and no-store", () => {
    const http = requireHttp();
    const response = http.methodNotAllowedResponse(["GET", "PUT"]);
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET, PUT");
    expect(response.headers.get("cache-control")).toContain("no-store");
  });

  it("materializes all six thin admin route adapters with no SQL", () => {
    expect(routeSources.every(({ source }) => source.length > 0)).toBe(true);
    for (const { path, source } of routeSources) {
      expect(source, `${path} must use the shared DEV-only admin context`).toContain(
        "requireStudioAdminContext",
      );
      expect(source, `${path} must return normalized Studio errors`).toContain(
        "studioErrorResponse",
      );
      expect(source, `${path} must not contain SQL`).not.toMatch(
        /\b(?:SELECT|INSERT|UPDATE|DELETE)\s+(?:INTO|FROM|studio_)/i,
      );
    }
    expect(routeSources.find(({ path }) => path.endsWith("draft.ts"))?.source).toContain(
      "saveDraft",
    );
    expect(routeSources.find(({ path }) => path.endsWith("publish.ts"))?.source).toContain(
      "publishDraft",
    );
    expect(routeSources.find(({ path }) => path.endsWith("restore.ts"))?.source).toContain(
      "restoreVersionToDraft",
    );
  });
});
