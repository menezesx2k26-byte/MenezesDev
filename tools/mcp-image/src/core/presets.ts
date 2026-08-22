import type { Project, ProjectPreset } from "../types/index.js";

export const PROJECT_PRESETS: Record<Project, ProjectPreset> = {
  menezesdev: {
    banned: ["cyberpunk", "Matrix code rain", "generic startup stock imagery", "invented UI text"],
    identity: "MenezesDev, a Brazilian web studio presenting custom work with technical precision.",
    mood: "confident, modern, sharp, premium, controlled energy",
    palette: "deep neutral blacks with restrained violet light; no uncontrolled neon rainbow",
    style: "premium dark technology editorial",
  },
  m47: {
    banned: ["barber poles", "skulls", "crossed razors", "western lettering", "vintage barbershop clichés"],
    identity: "M47 Barber, a fictional contemporary barbershop concept by MenezesDev.",
    mood: "urban, warm, masculine, precise, compact",
    palette: "deep black, warm skin and wood tones, matte gold accents",
    style: "high-contrast masculine editorial barbershop photography",
  },
  tavola27: {
    banned: ["Italian flag motifs", "tourist restaurant styling", "flying cheese", "plastic-looking food"],
    identity: "Tavola 27, a fictional contemporary Italian restaurant concept by MenezesDev.",
    mood: "warm, slow, refined, intimate, authentic",
    palette: "warm cream, aged wood, olive green, wine red, natural food color",
    style: "natural-light Italian food and hospitality editorial",
  },
  prismae: {
    banned: ["handshakes", "executives pointing at charts", "glass towers", "generic consulting stock photography"],
    identity: "Prismae Consultoria, a fictional business consulting concept by MenezesDev.",
    mood: "clear, rational, structured, contemporary, trustworthy",
    palette: "soft off-white, petroleum green, lime accent, restrained cool neutrals",
    style: "clean data-led corporate visual system with abstract geometry",
  },
};
