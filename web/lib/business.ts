import fs from "node:fs";
import path from "node:path";

export type Business = {
  order: number;
  slug: string;
  name: string;
  plural: string;
  blurb: string;
  intro: string;
  uses: { title: string; body: string }[];
};

// Page copy lives in /content/business/<slug>.json. Runs at build time only.
const dir = path.join(process.cwd(), "..", "content", "business");

export function getBusinesses(): Business[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const b = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as Business;
      if (b.slug !== f.replace(/\.json$/, "")) throw new Error(`${f}: slug must match file name`);
      return b;
    })
    .sort((a, b) => a.order - b.order);
}

export const businessHref = (slug: string) => `/business/${slug}/`;
