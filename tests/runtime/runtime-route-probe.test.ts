import { describe, expect, it } from "vitest";
import {
  validateBlockedResponse,
  validateCanonicalResponse,
} from "../../scripts/runtime-route-probe.mjs";

const page = (extra = "") => `<!doctype html>
<html>
  <head>
    <title>Teste</title>
    <meta name="description" content="Descrição" />
    <link rel="canonical" href="https://example.test/" />
    <meta property="og:title" content="Teste" />
    <meta name="twitter:card" content="summary_large_image" />
    ${extra}
  </head>
  <body>ok</body>
</html>`;

describe("runtime HTTP route validation", () => {
  it("accepts a healthy runtime page", () => {
    expect(validateCanonicalResponse("/", 200, page())).toEqual([]);
  });

  it("requires the complete noindex policy on demo routes", () => {
    expect(validateCanonicalResponse("/demo/m47", 200, page())).toContain(
      "/demo/m47: política noindex completa ausente.",
    );
    expect(
      validateCanonicalResponse(
        "/demo/m47",
        200,
        page('<meta name="robots" content="noindex, nofollow, noarchive" />'),
      ),
    ).toEqual([]);
  });

  it("rejects runtime Google Fonts requests embedded in HTML", () => {
    expect(
      validateCanonicalResponse(
        "/",
        200,
        page('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />'),
      ),
    ).toContain("/: contém request runtime ao Google Fonts.");
  });

  it("requires blocked routes to return 404", () => {
    expect(validateBlockedResponse("/demo/prismae/about", 404)).toEqual([]);
    expect(validateBlockedResponse("/demo/prismae/about", 200)).toEqual([
      "/demo/prismae/about: rota bloqueada respondeu HTTP 200, esperado 404.",
    ]);
  });
});
