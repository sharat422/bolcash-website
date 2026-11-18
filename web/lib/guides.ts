import { readCollection } from "./content";
import type { FactId } from "./facts";

export type Guide = {
  order: number;
  slug: string;
  title: string;
  summary: string;
  updated: string; // YYYY-MM-DD
  taxLegal: boolean; // adds the "confirm with a CA" note
  reviewed?: boolean; // until true, the page shows a visible "Draft: TODO: verify" note
  facts: FactId[];
  sections: { heading: string; paragraphs: string[] }[];
  tools: string[];
  related: string[];
  sources: { name: string; url: string }[];
};

// Guide copy lives in /content/guides/<slug>.json.
export const getGuides = () => readCollection<Guide>("guides");

export const guideHref = (slug: string) => `/guides/${slug}/`;
