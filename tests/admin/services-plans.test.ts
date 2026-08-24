import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";
import { toPublicHomeView } from "../../src/studio/public-content";
import { validateSiteDocument } from "../../src/studio/validation";
import type { SiteDocument } from "../../src/studio/types";

const root = resolve(process.cwd());
const read = (path: string): string => {
  try {
    return readFileSync(resolve(root, path), "utf8");
  } catch {
    return "";
  }
};

const loadDomain = async () => import("../../src/studio/client/services-plans").catch(() => null);
const fresh = (): SiteDocument => createDefaultSiteDocument();

describe("services and plans business rules", () => {
  it("seeds every current service as visible and public Home filters hidden services", async () => {
    const module = await loadDomain();
    expect(module, "services-plans.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = fresh();
    expect(initial.home.services.items.every((service) => service.visible === true)).toBe(true);
    const target = initial.home.services.items[0]!;
    const hidden = module.setServiceVisibility(initial, target.id, false);
    expect(toPublicHomeView(hidden).services.some((service) => service.id === target.id)).toBe(false);
  });

  it("moves services and plans with bounded up/down operations", async () => {
    const module = await loadDomain();
    expect(module, "services-plans.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = fresh();
    const service = initial.home.services.items[1]!;
    const plan = initial.home.plans.items[1]!;
    const movedService = module.moveService(initial, service.id, "up");
    const movedPlan = module.movePlan(initial, plan.id, "down");

    expect(movedService.home.services.items[0]?.id).toBe(service.id);
    expect(movedPlan.home.plans.items.at(-1)?.id).toBe(plan.id);
  });

  it("refuses to hide the last visible service or plan", async () => {
    const module = await loadDomain();
    expect(module, "services-plans.ts must exist").not.toBeNull();
    if (!module) return;

    let document = fresh();
    for (const service of document.home.services.items.slice(1)) {
      document = module.setServiceVisibility(document, service.id, false);
    }
    expect(() =>
      module.setServiceVisibility(document, document.home.services.items[0]!.id, false),
    ).toThrow(/último|last|visível|visible/i);

    document = fresh();
    for (const plan of document.home.plans.items.slice(1)) {
      document = module.setPlanVisibility(document, plan.id, false);
    }
    expect(() => module.setPlanVisibility(document, document.home.plans.items[0]!.id, false)).toThrow(
      /último|last|visível|visible/i,
    );
  });

  it("stores starting prices as cents and derives the display label deliberately", async () => {
    const module = await loadDomain();
    expect(module, "services-plans.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = fresh();
    const target = initial.home.plans.items[0]!;
    const next = module.setPlanStartingPrice(initial, target.id, 123450);
    const updated = next.home.plans.items.find((plan) => plan.id === target.id)!;

    expect(updated.startingPriceCents).toBe(123450);
    expect(updated.priceLabel).toBe("A partir de R$1.234,50");
    expect(module.formatPlanStartingPrice(60000)).toBe("A partir de R$600");
    expect(() => module.setPlanStartingPrice(initial, target.id, -1)).toThrow(/preço|price|cent/i);
    expect(() => module.setPlanStartingPrice(initial, target.id, 10.5)).toThrow(/preço|price|cent/i);
  });

  it("allows at most one recommended plan by replacing the previous recommendation", async () => {
    const module = await loadDomain();
    expect(module, "services-plans.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = fresh();
    const target = initial.home.plans.items[2]!;
    const next = module.setRecommendedPlan(initial, target.id, true);
    expect(next.home.plans.items.filter((plan) => plan.recommended)).toHaveLength(1);
    expect(next.home.plans.items.find((plan) => plan.recommended)?.id).toBe(target.id);
  });

  it("runtime validation rejects empty visible sections, multiple recommendations and empty visible CTA", () => {
    const noServices = fresh();
    noServices.home.services.items.forEach((service) => {
      service.visible = false;
    });
    expect(validateSiteDocument(noServices, { mode: "draft" }).issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "home.services.items", code: "empty_visible_section" }),
      ]),
    );

    const badPlans = fresh();
    badPlans.home.plans.items[0]!.recommended = true;
    badPlans.home.plans.items[1]!.recommended = true;
    badPlans.home.plans.items[0]!.ctaLabel = "";
    const result = validateSiteDocument(badPlans, { mode: "draft" });
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "home.plans.items", code: "recommended_limit" }),
        expect.objectContaining({ path: "home.plans.items[0].ctaLabel", code: "required" }),
      ]),
    );
  });

  it("runtime validation rejects a price label that diverges from structured cents", () => {
    const candidate = fresh();
    candidate.home.plans.items[0]!.priceLabel = "R$ 1";
    const result = validateSiteDocument(candidate, { mode: "draft" });
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "home.plans.items[0].priceLabel", code: "price_label" }),
      ]),
    );
  });
});

describe("Services and Plans admin UI contract", () => {
  it("provides focused accessible list editors with order and visibility controls", () => {
    const services = read("src/components/admin/services/ServicesEditor.astro");
    const plans = read("src/components/admin/plans/PlansEditor.astro");
    expect(services, "ServicesEditor.astro must exist").not.toBe("");
    expect(plans, "PlansEditor.astro must exist").not.toBe("");

    for (const source of [services, plans]) {
      expect(source).toContain("Mover para cima");
      expect(source).toContain("Mover para baixo");
      expect(source).toMatch(/Visível|Visibilidade/);
      expect(source).not.toMatch(/contenteditable|data-freeform-style|type="color"/i);
    }
    expect(plans).toContain('data-plan-price-cents');
    expect(plans).toContain('data-plan-recommended');
    expect(plans).toMatch(/Rótulo calculado|calculado/i);
  });

  it("renders both pages from the persisted draft and wires the shared revision-safe controller", () => {
    const controller = read("src/studio/client/services-plans-controller.ts");
    expect(controller, "services-plans-controller.ts must exist").not.toBe("");
    expect(controller).toMatch(/createDraftStore/);
    expect(controller).toMatch(/createAutosaveController/);
    expect(controller).toMatch(/moveService/);
    expect(controller).toMatch(/setServiceVisibility/);
    expect(controller).toMatch(/movePlan/);
    expect(controller).toMatch(/setPlanVisibility/);
    expect(controller).toMatch(/setPlanStartingPrice/);
    expect(controller).toMatch(/setRecommendedPlan/);

    for (const path of ["src/pages/admin/servicos.astro", "src/pages/admin/planos.astro"]) {
      const source = read(path);
      expect(source, `${path} must exist`).not.toBe("");
      expect(source).toMatch(/requireStudioAdminContext/);
      expect(source).toMatch(/getRuntimeBindings/);
      expect(source).toMatch(/getDraft\(/);
      expect(source).toContain("studio-initial-state");
      expect(source).toMatch(/setupServicesPlansController/);
    }
  });
});
