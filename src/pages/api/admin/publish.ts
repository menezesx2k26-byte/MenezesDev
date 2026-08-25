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
import { publishDraft } from "../../../studio/publication";

export const POST: APIRoute = async ({ request }) => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();

  try {
    assertStudioSameOrigin(request);
    const body = requireStudioObject(await readStudioJson(request));
    const expectedRevision = parseExpectedRevision(body.expectedRevision);
    const { DB } = getRuntimeBindings();
    const result = await publishDraft(DB, {
      expectedRevision,
      actor: admin.actor,
    });
    return studioJsonResponse(result, { status: 201 });
  } catch (error) {
    return studioErrorResponse(error);
  }
};

export const ALL: APIRoute = () => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();
  return methodNotAllowedResponse(["POST"]);
};
