import type { APIRoute } from "astro";
import { getRuntimeBindings } from "../../../../runtime/bindings";
import { StudioVersionNotFoundError } from "../../../../studio/errors";
import {
  methodNotAllowedResponse,
  parseStudioVersionNumber,
  privateAdminNotFoundResponse,
  requireStudioAdminContext,
  studioErrorResponse,
  studioJsonResponse,
} from "../../../../studio/http";
import { getVersion } from "../../../../studio/repository";

export const GET: APIRoute = async ({ params }) => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();

  try {
    const versionNumber = parseStudioVersionNumber(params.id);
    const { DB } = getRuntimeBindings();
    const version = await getVersion(DB, versionNumber);
    if (!version) throw new StudioVersionNotFoundError(versionNumber);
    return studioJsonResponse({ version });
  } catch (error) {
    return studioErrorResponse(error);
  }
};

export const ALL: APIRoute = () => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();
  return methodNotAllowedResponse(["GET"]);
};
