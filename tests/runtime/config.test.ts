import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const modulePath = resolve(process.cwd(), "src/runtime/config.ts");

describe("Studio runtime configuration", () => {
  it("defines a dedicated runtime config module", () => {
    expect(existsSync(modulePath)).toBe(true);
  });

  it("uses fixed safe binding names without production resource ids", async () => {
    if (!existsSync(modulePath)) return;

    const { runtimeConfig } = await import("../../src/runtime/config");

    expect(runtimeConfig.bindings.database).toBe("DB");
    expect(runtimeConfig.bindings.media).toBe("MEDIA");
    expect(runtimeConfig.siteId).toBe("menezesdev");
    expect(JSON.stringify(runtimeConfig)).not.toMatch(/[0-9a-f]{8}-[0-9a-f-]{27,}/i);
  });
});
