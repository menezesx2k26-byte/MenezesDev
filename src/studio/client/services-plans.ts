import { formatPlanStartingPrice as formatPrice } from "../pricing";
import type { SiteDocument } from "../types";

export type ListMoveDirection = "up" | "down";

const clone = (document: SiteDocument): SiteDocument => structuredClone(document);

const serviceIndex = (document: SiteDocument, serviceId: string): number => {
  const index = document.home.services.items.findIndex((service) => service.id === serviceId);
  if (index < 0) throw new RangeError(`Service id not found: ${serviceId}`);
  return index;
};

const planIndex = (document: SiteDocument, planId: string): number => {
  const index = document.home.plans.items.findIndex((plan) => plan.id === planId);
  if (index < 0) throw new RangeError(`Plan id not found: ${planId}`);
  return index;
};

const moveAt = <T>(items: T[], index: number, direction: ListMoveDirection): void => {
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= items.length) return;
  const current = items[index];
  const other = items[target];
  if (current === undefined || other === undefined) return;
  items[index] = other;
  items[target] = current;
};

export const formatPlanStartingPrice = formatPrice;

export const moveService = (
  document: SiteDocument,
  serviceId: string,
  direction: ListMoveDirection,
): SiteDocument => {
  const next = clone(document);
  moveAt(next.home.services.items, serviceIndex(next, serviceId), direction);
  return next;
};

export const setServiceVisibility = (
  document: SiteDocument,
  serviceId: string,
  visible: boolean,
): SiteDocument => {
  const next = clone(document);
  const service = next.home.services.items[serviceIndex(next, serviceId)]!;
  if (!visible && service.visible) {
    const visibleCount = next.home.services.items.filter((item) => item.visible).length;
    if (visibleCount <= 1) throw new TypeError("Não é possível ocultar o último serviço visível.");
  }
  service.visible = visible;
  return next;
};

export const movePlan = (
  document: SiteDocument,
  planId: string,
  direction: ListMoveDirection,
): SiteDocument => {
  const next = clone(document);
  moveAt(next.home.plans.items, planIndex(next, planId), direction);
  return next;
};

export const setPlanVisibility = (
  document: SiteDocument,
  planId: string,
  visible: boolean,
): SiteDocument => {
  const next = clone(document);
  const plan = next.home.plans.items[planIndex(next, planId)]!;
  if (!visible && plan.visible) {
    const visibleCount = next.home.plans.items.filter((item) => item.visible).length;
    if (visibleCount <= 1) throw new TypeError("Não é possível ocultar o último plano visível.");
  }
  plan.visible = visible;
  if (!visible) plan.recommended = false;
  return next;
};

export const setPlanStartingPrice = (
  document: SiteDocument,
  planId: string,
  startingPriceCents: number | null,
): SiteDocument => {
  if (
    startingPriceCents !== null &&
    (!Number.isInteger(startingPriceCents) || startingPriceCents < 0)
  ) {
    throw new TypeError("Preço deve ser nulo ou um inteiro não negativo em centavos.");
  }
  const next = clone(document);
  const plan = next.home.plans.items[planIndex(next, planId)]!;
  plan.startingPriceCents = startingPriceCents;
  plan.priceLabel = formatPrice(startingPriceCents);
  return next;
};

export const setRecommendedPlan = (
  document: SiteDocument,
  planId: string,
  recommended: boolean,
): SiteDocument => {
  const next = clone(document);
  const index = planIndex(next, planId);
  const target = next.home.plans.items[index]!;
  if (recommended && !target.visible) {
    throw new TypeError("Plano arquivado não pode ser recomendado.");
  }
  for (const plan of next.home.plans.items) plan.recommended = recommended && plan.id === planId;
  return next;
};
