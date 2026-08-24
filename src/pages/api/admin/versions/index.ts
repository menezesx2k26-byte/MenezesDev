import type { APIRoute } from "astro";
import { getRuntimeBindings } from "../../../../runtime/bindings";
import {
  methodNotAllowedResponse,
  privateAdminNotFoundResponse,
  requireStudioAdminContext,
  StudioHttpError,
  studioErrorResponse,
  studioJsonResponse,
} from "../../../../studio/http";
import { listVersions } from "../../../../studio/repository";

const parsePagination = (
  value: string | null,
  fallback: number,
  options: { min: number; max: number },
): number => {
  if (value === null || value === "") return fallback;
  if (!/^\d+$/.test(value)) {
    throw new StudioHttpError(400, "invalid_pagination", "Pagination value is invalid.");
  }
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < options.min || parsed > options.max) {
    throw new StudioHttpError(400, "invalid_pagination", "Pagination value is invalid.");
  }
  return parsed;
};

export const GET: APIRoute = async ({ request }) => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();

  try {
    const url = new URL(request.url);
    const limit = parsePagination(url.searchParams.get("limit"), 20, { min: 1, max: 100 });
    const offset = parsePagination(url.searchParams.get("offset"), 0, {
      min: 0,
      max: 100_000,
    });
    const { DB } = getRuntimeBindings();
    return studioJsonResponse({ versions: await listVersions(DB, { limit, offset }) });
  } catch (error) {
    return studioErrorResponse(error);
  }
};

export const ALL: APIRoute = () => {
  const admin = requireStudioAdminContext({ isDev: import.meta.env.DEV });
  if (!admin) return privateAdminNotFoundResponse();
  return methodNotAllowedResponse(["GET"]);
};
