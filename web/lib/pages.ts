import { readCollection } from "./content";

export type Page = {
  order: number;
  slug: string;
  group: "trust";
  title: string;
  description: string;
  updated: string; // YYYY-MM-DD
  reviewed?: boolean; // until true, the page shows its draftNote
  draftNote: string;
  sections: { heading: string; paragraphs: string[] }[];
};

// Page copy lives in /content/pages/<slug>.json. Served at /<slug>/.
export const getPages = () => readCollection<Page>("pages");
