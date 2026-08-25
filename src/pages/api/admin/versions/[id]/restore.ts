import type { APIRoute } from "astro";
import { getRuntimeBindings } from "../../../../../runtime/bindings";
import {
  assertStudioSameOrigin,
  methodNotAllowedResponse,
  parseExpectedRevision,
  parseStudioVersionNumber,
  privateAdminNotFoundResponse,
  readStudioJson,
  requireStudioAdminContext,
  requireStudioObject,
  studioErrorResponse,
  studioJsonResponse,
} from "../../../../../studio/http";
import { restoreVersionToDraft } from "../../../../../studio/publication";

export const POST: APIRoute = async ({ params, request }) => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();

  try {
    assertStudioSameOrigin(request);
    const body = requireStudioObject(await readStudioJson(request));
    const expectedRevision = parseExpectedRevision(body.expectedRevision);
    const versionNumber = parseStudioVersionNumber(params.id);
    const { DB } = getRuntimeBindings();
    const result = await restoreVersionToDraft(DB, {
      versionNumber,
      expectedRevision,
      actor: admin.actor,
    });
    return studioJsonResponse(result);
  } catch (error) {
    return studioErrorResponse(error);
  }
};

export const ALL: APIRoute = () => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();
  return methodNotAllowedResponse(["POST"]);
};
