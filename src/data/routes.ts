import type { RouteDefinition } from "../types";

export const routes = [
  { path: "/", title: "MenezesDev", project: "menezesdev", indexable: true },
  { path: "/projetos/m47", title: "Case M47 Barber", project: "case", indexable: true },
  {
    path: "/projetos/tavola-27",
    title: "Case Tavola 27",
    project: "case",
    indexable: true,
  },
  {
    path: "/projetos/prismae",
    title: "Case Prismae",
    project: "case",
    indexable: true,
  },
  { path: "/demo/m47", title: "M47 Barber", project: "m47", indexable: false },
  {
    path: "/demo/tavola27",
    title: "Tavola 27",
    project: "tavola27",
    indexable: false,
  },
  {
    path: "/demo/tavola27/menu",
    title: "Menu — Tavola 27",
    project: "tavola27",
    indexable: false,
  },
  {
    path: "/demo/tavola27/storia",
    title: "Nossa história — Tavola 27",
    project: "tavola27",
    indexable: false,
  },
  {
    path: "/demo/tavola27/gallery",
    title: "Galeria — Tavola 27",
    project: "tavola27",
    indexable: false,
  },
  {
    path: "/demo/tavola27/contact",
    title: "Contato — Tavola 27",
    project: "tavola27",
    indexable: false,
  },
  { path: "/demo/prismae", title: "Prismae", project: "prismae", indexable: false },
  {
    path: "/demo/prismae/solutions",
    title: "Soluções — Prismae",
    project: "prismae",
    indexable: false,
  },
  {
    path: "/demo/prismae/solutions/strategy",
    title: "Estratégia — Prismae",
    project: "prismae",
    indexable: false,
  },
  {
    path: "/demo/prismae/solutions/processes",
    title: "Processos — Prismae",
    project: "prismae",
    indexable: false,
  },
  {
    path: "/demo/prismae/solutions/indicators",
    title: "Indicadores — Prismae",
    project: "prismae",
    indexable: false,
  },
  {
    path: "/demo/prismae/contact",
    title: "Contato — Prismae",
    project: "prismae",
    indexable: false,
  },
] as const satisfies readonly RouteDefinition[];

export const publicRoutePaths = routes.map(({ path }) => path);
