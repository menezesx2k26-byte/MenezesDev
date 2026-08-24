import type { APIRoute } from "astro";
import { getRuntimeBindings } from "../../runtime/bindings";
import {
  buildRuntimeHealth,
  createRuntimeHealthProbes,
} from "../../runtime/health";

export const GET: APIRoute = async () => {
  if (!import.meta.env.DEV) {
    return new Response(null, {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const health = await buildRuntimeHealth(
    createRuntimeHealthProbes(getRuntimeBindings()),
  );

  return Response.json(health, {
    status: health.status === "healthy" ? 200 : 503,
    headers: {
      "Cache-Control": "no-store",
    },
  });
};
