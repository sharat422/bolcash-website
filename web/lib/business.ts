import { readCollection } from "./content";

export type Business = {
  order: number;
  slug: string;
  name: string;
  plural: string;
  blurb: string;
  intro: string;
  uses: { title: string; body: string }[];
};

// Page copy lives in /content/business/<slug>.json.
export const getBusinesses = () => readCollection<Business>("business");

export const businessHref = (slug: string) => `/business/${slug}/`;
