import type { FactId } from "./facts";
import { readCollection } from "./content";

export type Tool = {
  order: number;
  slug: string;
  name: string;
  blurb: string;
  intro: string;
  steps: { title: string; body?: string }[];
  formula?: string;
  facts?: FactId[];
  disclaimer?: boolean;
  note?: string;
};

// Page copy lives in /content/tools/<slug>.json. The maths is in lib/tools/calculators.ts.
export const getTools = () => readCollection<Tool>("tools");

export const toolHref = (slug: string) => `/tools/${slug}/`;
