import { describe, expect, it } from "vitest";

type HealthModule = typeof import("../../src/runtime/health");

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
    expect(serialized).toBe(
      '{"status":"degraded","checks":{"database":"error","media":"error"}}',
    );
    expect(serialized).not.toMatch(/SELECT|Authorization|Bearer|secret-token|customer|object-key|password|hunter2/i);
  });
});
