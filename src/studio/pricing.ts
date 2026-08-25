const formatWholeReais = (reais: number): string =>
  reais.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

export const formatPlanStartingPrice = (cents: number | null): string => {
  if (cents === null) return "Sob orçamento";
  if (!Number.isInteger(cents) || cents < 0) {
    throw new TypeError("Plan price must be null or a non-negative integer in cents.");
  }

  const reais = Math.floor(cents / 100);
  const remainder = cents % 100;
  const decimal = remainder === 0 ? "" : `,${String(remainder).padStart(2, "0")}`;
  return `A partir de R$${formatWholeReais(reais)}${decimal}`;
};
