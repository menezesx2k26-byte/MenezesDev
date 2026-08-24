import type { SiteDocument, StudioSocialLink } from "./types";
import { isAllowedSocialUrl, isApprovedWhatsappUrl } from "./url-policy";
import { validateSiteDocument } from "./validation";

export type ListMoveDirection = "up" | "down";

const clone = (document: SiteDocument): SiteDocument => structuredClone(document);

const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const assertValidDraft = (document: SiteDocument): SiteDocument => {
  const result = validateSiteDocument(document, { mode: "draft" });
  if (!result.ok) {
    throw new Error(
      `Configuração inválida: ${result.issues.map((issue) => issue.path || "<raiz>").join(", ")}.`,
    );
  }
  return document;
};

export const setWhatsappDestination = (
  document: SiteDocument,
  value: string | null,
): SiteDocument => {
  const normalized = value === null || value.trim() === "" ? null : value.trim();
  if (!isApprovedWhatsappUrl(normalized)) {
    throw new Error(
      "URL de WhatsApp inválida. Use HTTPS em wa.me/<número> ou api.whatsapp.com/send?phone=<número>.",
    );
  }

  const next = clone(document);
  next.commercial.whatsappUrl = normalized;
  return assertValidDraft(next);
};

const nextSocialId = (links: StudioSocialLink[], label: string): string => {
  const stem = `social-${slugify(label) || "link"}`;
  const ids = new Set(links.map((link) => link.id));
  if (!ids.has(stem)) return stem;
  let suffix = 2;
  while (ids.has(`${stem}-${suffix}`)) suffix += 1;
  return `${stem}-${suffix}`;
};

export const addSocialLink = (
  document: SiteDocument,
  input: { label: string; href: string },
): SiteDocument => {
  const label = input.label.trim();
  const href = input.href.trim();
  if (!label) throw new Error("O nome da rede social é obrigatório.");
  if (!isAllowedSocialUrl(href)) {
    throw new Error("A URL social precisa ser um endereço HTTP ou HTTPS absoluto.");
  }

  const next = clone(document);
  next.commercial.socialLinks.push({
    id: nextSocialId(next.commercial.socialLinks, label),
    label,
    href,
  });
  return assertValidDraft(next);
};

export const removeSocialLink = (document: SiteDocument, id: string): SiteDocument => {
  const next = clone(document);
  const before = next.commercial.socialLinks.length;
  next.commercial.socialLinks = next.commercial.socialLinks.filter((link) => link.id !== id);
  if (next.commercial.socialLinks.length === before) {
    throw new Error("Link social não encontrado.");
  }
  return assertValidDraft(next);
};

const moveById = <T extends { id: string }>(
  items: T[],
  id: string,
  direction: ListMoveDirection,
): T[] => {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Item não encontrado.");
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  const current = next[index]!;
  next[index] = next[target]!;
  next[target] = current;
  return next;
};

export const moveNavigationItem = (
  document: SiteDocument,
  id: string,
  direction: ListMoveDirection,
): SiteDocument => {
  const next = clone(document);
  next.navigation = moveById(next.navigation, id, direction);
  return assertValidDraft(next);
};

export const moveSocialLink = (
  document: SiteDocument,
  id: string,
  direction: ListMoveDirection,
): SiteDocument => {
  const next = clone(document);
  next.commercial.socialLinks = moveById(next.commercial.socialLinks, id, direction);
  return assertValidDraft(next);
};
