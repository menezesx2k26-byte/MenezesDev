import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createDefaultSiteDocument } from "../../src/studio/default-document";
import { validateSiteDocument } from "../../src/studio/validation";

type PolicyModule = typeof import("../../src/studio/url-policy");
type SettingsModule = typeof import("../../src/studio/seo-settings");

const read = (path: string): string => (existsSync(path) ? readFileSync(path, "utf8") : "");

const loadPolicy = async (): Promise<PolicyModule | null> => {
  try {
    return await import("../../src/studio/url-policy");
  } catch {
    return null;
  }
};

const loadSettings = async (): Promise<SettingsModule | null> => {
  try {
    return await import("../../src/studio/seo-settings");
  } catch {
    return null;
  }
};

describe("SEO and commercial URL policy", () => {
  it("keeps the default WhatsApp destination unresolved and accepts only approved HTTPS WhatsApp destinations", async () => {
    const policy = await loadPolicy();
    expect(policy, "url-policy.ts must exist").not.toBeNull();
    if (!policy) return;

    expect(createDefaultSiteDocument().commercial.whatsappUrl).toBeNull();
    expect(policy.isApprovedWhatsappUrl(null)).toBe(true);
    expect(policy.isApprovedWhatsappUrl("https://wa.me/5513999999999")).toBe(true);
    expect(policy.isApprovedWhatsappUrl("https://api.whatsapp.com/send?phone=5513999999999")).toBe(
      true,
    );
    expect(policy.isApprovedWhatsappUrl("http://wa.me/5513999999999")).toBe(false);
    expect(policy.isApprovedWhatsappUrl("https://wa.me/not-a-number")).toBe(false);
    expect(policy.isApprovedWhatsappUrl("https://example.com/5513999999999")).toBe(false);
  });

  it("allows social destinations only as absolute HTTP(S) URLs", async () => {
    const policy = await loadPolicy();
    expect(policy, "url-policy.ts must exist").not.toBeNull();
    if (!policy) return;

    expect(policy.isAllowedSocialUrl("https://instagram.com/menezesdev")).toBe(true);
    expect(policy.isAllowedSocialUrl("http://example.com/profile")).toBe(true);
    expect(policy.isAllowedSocialUrl("/#contato")).toBe(false);
    expect(policy.isAllowedSocialUrl("javascript:alert(1)")).toBe(false);
    expect(policy.isAllowedSocialUrl("data:text/html,hello")).toBe(false);
  });

  it("enforces strict WhatsApp, social and demo-indexing policy through runtime validation", () => {
    const whatsapp = createDefaultSiteDocument();
    whatsapp.commercial.whatsappUrl = "https://example.com/fake-whatsapp";
    expect(validateSiteDocument(whatsapp, { mode: "draft" }).issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "commercial.whatsappUrl", code: "whatsapp_url" }),
      ]),
    );

    const social = createDefaultSiteDocument();
    social.commercial.socialLinks = [{ id: "social-local", label: "Local", href: "/#contato" }];
    expect(validateSiteDocument(social, { mode: "draft" }).issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "commercial.socialLinks[0].href", code: "social_url" }),
      ]),
    );

    const demos = createDefaultSiteDocument() as unknown as {
      seo: { demosIndexable: boolean };
    };
    demos.seo.demosIndexable = true;
    expect(validateSiteDocument(demos, { mode: "draft" }).issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "seo.demosIndexable", code: "demo_safety" }),
      ]),
    );
  });
});

describe("SEO and settings domain operations", () => {
  it("updates WhatsApp only through the central URL policy", async () => {
    const module = await loadSettings();
    expect(module, "seo-settings.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = createDefaultSiteDocument();
    const valid = module.setWhatsappDestination(initial, "https://wa.me/5513999999999");
    expect(valid.commercial.whatsappUrl).toBe("https://wa.me/5513999999999");
    expect(() => module.setWhatsappDestination(initial, "https://example.com/fake")).toThrow(
      /WhatsApp|wa\.me|api\.whatsapp\.com/i,
    );
    expect(module.setWhatsappDestination(valid, null).commercial.whatsappUrl).toBeNull();
  });

  it("adds, removes and reorders validated social/navigation entries without mutating the source", async () => {
    const module = await loadSettings();
    expect(module, "seo-settings.ts must exist").not.toBeNull();
    if (!module) return;

    const initial = createDefaultSiteDocument();
    const withSocial = module.addSocialLink(initial, {
      label: "Instagram",
      href: "https://instagram.com/menezesdev",
    });
    expect(initial.commercial.socialLinks).toHaveLength(0);
    expect(withSocial.commercial.socialLinks).toHaveLength(1);
    expect(withSocial.commercial.socialLinks[0]).toMatchObject({
      label: "Instagram",
      href: "https://instagram.com/menezesdev",
    });
    expect(() => module.addSocialLink(initial, { label: "Local", href: "/#contato" })).toThrow(
      /http|social|URL/i,
    );
    const removed = module.removeSocialLink(withSocial, withSocial.commercial.socialLinks[0]!.id);
    expect(removed.commercial.socialLinks).toHaveLength(0);

    const navigationId = initial.navigation[1]!.id;
    const moved = module.moveNavigationItem(initial, navigationId, "up");
    expect(moved.navigation[0]!.id).toBe(navigationId);
    expect(initial.navigation[0]!.id).not.toBe(navigationId);
  });
});

describe("SEO and Settings admin presentation", () => {
  it("labels SERP/social previews as approximations and presents character counts as guidance, not guarantees", () => {
    const source = read("src/components/admin/seo/SeoEditor.astro");
    expect(source, "SeoEditor.astro must exist").not.toBe("");
    expect(source).toMatch(/SERP|resultado de busca/i);
    expect(source).toMatch(/social/i);
    expect(source).toMatch(/prévia|preview|aproxima/i);
    expect(source).toMatch(/50.{0,4}60|50–60/i);
    expect(source).toMatch(/140.{0,4}160|140–160/i);
    expect(source).toMatch(/não (?:é )?garantia|não garante|pode variar/i);
    expect(source).toMatch(/data-canonical-status/);
    expect(source).not.toMatch(/data-seo-path=["'][^"']*canonical/i);
    expect(source).toMatch(/demosIndexable|Demos/i);
    expect(source).toMatch(/disabled|somente leitura|read-only/i);
  });

  it("exposes bounded commercial, navigation, contact and presentation settings without arbitrary code controls", () => {
    const source = read("src/components/admin/settings/SettingsEditor.astro");
    expect(source, "SettingsEditor.astro must exist").not.toBe("");
    for (const label of [
      "WhatsApp",
      "mensagem",
      "redes sociais",
      "navegação",
      "contato",
      "apresentação",
    ]) {
      expect(source.toLowerCase()).toContain(label.toLowerCase());
    }
    expect(source).toMatch(/data-settings-path/);
    expect(source).toMatch(/data-settings-action=["']social-add["']/);
    expect(source).toMatch(/data-settings-action=["']nav-move-up["']/);
    expect(source).toMatch(/diagnóstico|sistema/i);
    expect(source).not.toMatch(/CSS livre|HTML livre|JavaScript livre|RGB|font-family/i);
  });

  it("renders both routes from the persisted draft and wires one revision-safe controller", () => {
    const seo = read("src/pages/admin/seo.astro");
    const settings = read("src/pages/admin/configuracoes.astro");
    const controller = read("src/studio/client/seo-settings-controller.ts");

    for (const route of [seo, settings]) {
      expect(route).toMatch(/getDraft\(DB\)/);
      expect(route).toMatch(/getPublished\(DB\)/);
      expect(route).toMatch(/studio-initial-state/);
      expect(route).toMatch(/setupSeoSettingsController/);
      expect(route).toMatch(/ConflictDialog/);
    }
    expect(seo).toMatch(/siteConfig/);
    expect(controller).toMatch(/createDraftStore/);
    expect(controller).toMatch(/createAutosaveController/);
    expect(controller).toMatch(
      /setWhatsappDestination|addSocialLink|removeSocialLink|moveNavigationItem/,
    );
  });
});
