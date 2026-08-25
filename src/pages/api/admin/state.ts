import type { APIRoute } from "astro";
import { getRuntimeBindings } from "../../../runtime/bindings";
import {
  methodNotAllowedResponse,
  privateAdminNotFoundResponse,
  requireStudioAdminContext,
  studioErrorResponse,
  studioJsonResponse,
} from "../../../studio/http";
import { getPublished, getStudioState } from "../../../studio/repository";

export const GET: APIRoute = async () => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();

  try {
    const { DB } = getRuntimeBindings();
    const [state, published] = await Promise.all([getStudioState(DB), getPublished(DB)]);

    return studioJsonResponse({
      state,
      published: {
        id: published.id,
        versionNumber: published.versionNumber,
        sourceRevision: published.sourceRevision,
        publishedBy: published.publishedBy,
        publishedAt: published.publishedAt,
      },
    });
  } catch (error) {
    return studioErrorResponse(error);
  }
};

export const ALL: APIRoute = () => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();
  return methodNotAllowedResponse(["GET"]);
};
