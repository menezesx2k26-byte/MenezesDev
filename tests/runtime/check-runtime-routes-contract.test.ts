import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "scripts/check-runtime-routes.mjs"), "utf8");

describe("production runtime route probe contract", () => {
  it("imports the private runtime route classification", () => {
    expect(source).toMatch(/privateRuntimeRoutes/);
  });

  it("uses the private-route validator", () => {
    expect(source).toMatch(/validatePrivateRuntimeResponse/);
  });

  it("actively probes every private runtime route", () => {
    expect(source).toMatch(/for\s*\(const\s+route\s+of\s+privateRuntimeRoutes\)/);
  });
});
