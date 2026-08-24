import { join } from "node:path";

export const runtimeRoutes = [
  "/",
  "/projetos/m47",
  "/projetos/tavola-27",
  "/projetos/prismae",
];

export const staticRoutes = [
  "/demo/m47",
  "/demo/tavola27",
  "/demo/tavola27/menu",
  "/demo/tavola27/storia",
  "/demo/tavola27/gallery",
  "/demo/tavola27/contact",
  "/demo/prismae",
  "/demo/prismae/solutions",
  "/demo/prismae/solutions/strategy",
  "/demo/prismae/solutions/processes",
  "/demo/prismae/solutions/indicators",
  "/demo/prismae/contact",
];

export const canonicalRoutes = [...runtimeRoutes, ...staticRoutes];
export const blockedRoutes = ["/demo/prismae/about"];

export const staticRouteFile = (clientRoot, route) =>
  route === "/"
    ? join(clientRoot, "index.html")
    : join(clientRoot, `${route.slice(1)}.html`);
