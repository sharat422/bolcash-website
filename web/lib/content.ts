import fs from "node:fs";
import path from "node:path";

/** Reads /content/<folder>/*.json at build time. File name must equal `slug`. Sorted by `order`. */
export function readCollection<T extends { slug: string; order: number }>(folder: string): T[] {
  const dir = path.join(process.cwd(), "..", "content", folder);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const item = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as T;
      if (item.slug !== f.replace(/\.json$/, ""))
        throw new Error(`${folder}/${f}: slug must match file name`);
      return item;
    })
    .sort((a, b) => a.order - b.order);
}
