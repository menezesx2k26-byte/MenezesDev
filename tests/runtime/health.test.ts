import { describe, expect, it } from "vitest";

type HealthModule = typeof import("../../src/runtime/health");
type ProbeFactory = (bindings: {
  DB: {
    prepare: (sql: string) => {
      first: () => Promise<unknown>;
    };
  };
  MEDIA: {
    head: (key: string) => Promise<unknown>;
    list?: () => Promise<unknown>;
  };
}) => {
  database: () => Promise<unknown>;
  media: () => Promise<unknown>;
};

let healthModule: HealthModule | null = null;
try {
  healthModule = await import("../../src/runtime/health");
} catch {
  healthModule = null;
}

const requireHealthModule = () => {
  expect(healthModule, "src/runtime/health.ts must implement the health contract").not.toBeNull();
  return healthModule as HealthModule;
};

const requireProbeFactory = () => {
  const moduleWithFactory = requireHealthModule() as HealthModule & {
    createRuntimeHealthProbes?: ProbeFactory;
  };
  expect(moduleWithFactory.createRuntimeHealthProbes).toBeTypeOf("function");
  return moduleWithFactory.createRuntimeHealthProbes as ProbeFactory;
};

describe("buildRuntimeHealth", () => {
  it("reports healthy only when both bounded probes succeed", async () => {
    const { buildRuntimeHealth } = requireHealthModule();
    const health = await buildRuntimeHealth({
      database: async () => undefined,
      media: async () => undefined,
    });

    expect(health).toEqual({
      status: "healthy",
      checks: {
        database: "ok",
        media: "ok",
      },
    });
  });

  it("reports degraded when the database probe fails", async () => {
    const { buildRuntimeHealth } = requireHealthModule();
    const health = await buildRuntimeHealth({
      database: async () => {
        throw new Error("D1 unavailable");
      },
      media: async () => undefined,
    });

    expect(health).toEqual({
      status: "degraded",
      checks: {
        database: "error",
        media: "ok",
      },
    });
  });

  it("reports degraded when the media probe fails", async () => {
    const { buildRuntimeHealth } = requireHealthModule();
    const health = await buildRuntimeHealth({
      database: async () => undefined,
      media: async () => {
        throw new Error("R2 unavailable");
      },
    });

    expect(health).toEqual({
      status: "degraded",
      checks: {
        database: "ok",
        media: "error",
      },
    });
  });

  it("never exposes raw probe failures or sensitive diagnostic material", async () => {
    const { buildRuntimeHealth } = requireHealthModule();
    const health = await buildRuntimeHealth({
      database: async () => {
        throw new Error("SELECT * FROM studio_state Authorization: Bearer secret-token");
      },
      media: async () => {
        throw new Error("private/customer/object-key.webp password=hunter2");
      },
    });

    const serialized = JSON.stringify(health);
    expect(serialized).toBe('{"status":"degraded","checks":{"database":"error","media":"error"}}');
    expect(serialized).not.toMatch(
      /SELECT|Authorization|Bearer|secret-token|customer|object-key|password|hunter2/i,
    );
  });
});

describe("createRuntimeHealthProbes", () => {
  it("uses one cheap D1 query and one metadata-only R2 head without listing the bucket", async () => {
    const createRuntimeHealthProbes = requireProbeFactory();
    let preparedSql = "";
    let headKey = "";
    let listCalls = 0;

    const probes = createRuntimeHealthProbes({
      DB: {
        prepare: (sql) => {
          preparedSql = sql;
          return {
            first: async () => ({ ok: 1 }),
          };
        },
      },
      MEDIA: {
        head: async (key) => {
          headKey = key;
          return null;
        },
        list: async () => {
          listCalls += 1;
          return { objects: [] };
        },
      },
    });

    await probes.database();
    await probes.media();

    expect(preparedSql).toBe("SELECT 1");
    expect(headKey).toBe("__menezesdev_runtime_health__");
    expect(listCalls).toBe(0);
  });
});
