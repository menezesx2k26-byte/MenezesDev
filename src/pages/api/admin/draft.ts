import type { APIRoute } from "astro";
import { getRuntimeBindings } from "../../../runtime/bindings";
import {
  assertStudioSameOrigin,
  methodNotAllowedResponse,
  parseExpectedRevision,
  privateAdminNotFoundResponse,
  readStudioJson,
  requireStudioAdminContext,
  requireStudioObject,
  studioErrorResponse,
  studioJsonResponse,
} from "../../../studio/http";
import { getDraft, saveDraft } from "../../../studio/repository";
import type { SiteDocument } from "../../../studio/types";

export const GET: APIRoute = async () => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();

  try {
    const { DB } = getRuntimeBindings();
    return studioJsonResponse(await getDraft(DB));
  } catch (error) {
    return studioErrorResponse(error);
  }
};

export const PUT: APIRoute = async ({ request }) => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();

  try {
    assertStudioSameOrigin(request);
    const body = requireStudioObject(await readStudioJson(request));
    const expectedRevision = parseExpectedRevision(body.expectedRevision);
    const { DB } = getRuntimeBindings();
    const saved = await saveDraft(DB, {
      document: body.document as SiteDocument,
      expectedRevision,
    });
    return studioJsonResponse(saved);
  } catch (error) {
    return studioErrorResponse(error);
  }
};

export const ALL: APIRoute = () => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();
  return methodNotAllowedResponse(["GET", "PUT"]);
};
