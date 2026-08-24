export type RuntimeHealthStatus = "healthy" | "degraded";
export type RuntimeCheckStatus = "ok" | "error";

export interface RuntimeHealth {
  status: RuntimeHealthStatus;
  checks: {
    database: RuntimeCheckStatus;
    media: RuntimeCheckStatus;
  };
}

export interface RuntimeHealthProbes {
  database: () => Promise<unknown>;
  media: () => Promise<unknown>;
}

export interface RuntimeHealthBindings {
  DB: Pick<D1Database, "prepare">;
  MEDIA: Pick<R2Bucket, "head">;
}

const runtimeHealthSentinelKey = "__menezesdev_runtime_health__";

export const createRuntimeHealthProbes = (
  bindings: RuntimeHealthBindings,
): RuntimeHealthProbes => ({
  database: async () => {
    await bindings.DB.prepare("SELECT 1").first();
  },
  media: async () => {
    await bindings.MEDIA.head(runtimeHealthSentinelKey);
  },
});

export const buildRuntimeHealth = async (
  probes: RuntimeHealthProbes,
): Promise<RuntimeHealth> => {
  const [databaseResult, mediaResult] = await Promise.allSettled([
    probes.database(),
    probes.media(),
  ]);

  const database: RuntimeCheckStatus = databaseResult.status === "fulfilled" ? "ok" : "error";
  const media: RuntimeCheckStatus = mediaResult.status === "fulfilled" ? "ok" : "error";

  return {
    status: database === "ok" && media === "ok" ? "healthy" : "degraded",
    checks: {
      database,
      media,
    },
  };
};
