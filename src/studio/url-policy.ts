const E164_DIGITS = /^\d{8,15}$/;

const parseAbsoluteUrl = (value: string): URL | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    return new URL(trimmed);
  } catch {
    return null;
  }
};

const hasOnlyParams = (url: URL, allowed: ReadonlySet<string>): boolean => {
  for (const key of url.searchParams.keys()) {
    if (!allowed.has(key)) return false;
  }
  return true;
};

export const isApprovedWhatsappUrl = (value: string | null): boolean => {
  if (value === null) return true;
  const url = parseAbsoluteUrl(value);
  if (!url || url.protocol !== "https:" || url.username || url.password || url.hash) return false;

  if (url.hostname === "wa.me") {
    const phone = url.pathname.replace(/^\//, "").replace(/\/$/, "");
    return E164_DIGITS.test(phone) && hasOnlyParams(url, new Set(["text"]));
  }

  if (url.hostname === "api.whatsapp.com" && /^\/send\/?$/.test(url.pathname)) {
    const phone = url.searchParams.get("phone") ?? "";
    return (
      E164_DIGITS.test(phone) &&
      hasOnlyParams(url, new Set(["phone", "text", "app_absent"]))
    );
  }

  return false;
};

export const isAllowedSocialUrl = (value: string): boolean => {
  const url = parseAbsoluteUrl(value);
  return Boolean(
    url &&
      (url.protocol === "https:" || url.protocol === "http:") &&
      !url.username &&
      !url.password,
  );
};
