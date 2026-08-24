const requiredMetadata = [
  "<title>",
  'name="description"',
  'rel="canonical"',
  'property="og:title"',
  'name="twitter:card"',
];

export const validateCanonicalResponse = (route, status, html) => {
  const failures = [];

  if (status !== 200) {
    failures.push(`${route}: respondeu HTTP ${status}, esperado 200.`);
    return failures;
  }

  for (const required of requiredMetadata) {
    if (!html.includes(required)) failures.push(`${route}: metadata ausente (${required}).`);
  }

  if (
    route.startsWith("/demo/") &&
    !html.includes('content="noindex, nofollow, noarchive"')
  ) {
    failures.push(`${route}: política noindex completa ausente.`);
  }

  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(html)) {
    failures.push(`${route}: contém request runtime ao Google Fonts.`);
  }

  return failures;
};

export const validateBlockedResponse = (route, status) =>
  status === 404
    ? []
    : [`${route}: rota bloqueada respondeu HTTP ${status}, esperado 404.`];
