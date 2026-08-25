import type { APIRoute } from "astro";
import { getRuntimeBindings } from "../../runtime/bindings";
import { createDefaultSiteDocument } from "../../studio/default-document";
import { StudioAlreadyInitializedError } from "../../studio/errors";
import { initializeStudio } from "../../studio/repository";

const noStore = { "Cache-Control": "no-store" } as const;

const notFound = () =>
  new Response(null, {
    status: 404,
    headers: noStore,
  });

export const GET: APIRoute = () => notFound();

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return notFound();

  if (request.headers.get("x-menezesdev-local-seed") !== "1") {
    return Response.json(
      { status: "forbidden" },
      {
        status: 403,
        headers: noStore,
      },
    );
  }

  try {
    const { DB } = getRuntimeBindings();
    await initializeStudio(DB, createDefaultSiteDocument(), "local-seed");

    return Response.json(
      { status: "initialized", versionNumber: 1 },
      {
        status: 201,
        headers: noStore,
      },
    );
  } catch (error) {
    if (error instanceof StudioAlreadyInitializedError) {
      return Response.json(
        { status: "already_initialized" },
        {
          status: 409,
          headers: noStore,
        },
      );
    }
    throw error;
  }
};
