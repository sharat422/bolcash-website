// Run after `pnpm build`. Fails if
//  - any internal href/src in out/**/*.html has no file in out/, or
//  - a page links to /go/play or /go/appstore while that page is not a real store redirect.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
if (!fs.existsSync(out)) {
  console.error("out/ not found. Run `pnpm build` first.");
  process.exit(2);
}

const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) htmlFiles.push(p);
  }
})(out);

const resolves = (url) => {
  const p = path.join(out, decodeURIComponent(url));
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
  return fs.existsSync(path.join(p, "index.html")) || fs.existsSync(`${p}.html`);
};

// /go/<store>/ is a real redirect only when a store URL was configured at build time.
const isRedirect = (name) => {
  const f = path.join(out, "go", name, "index.html");
  return fs.existsSync(f) && fs.readFileSync(f, "utf-8").includes('http-equiv="refresh"');
};
const goAllowed = { "/go/play": isRedirect("play"), "/go/appstore": isRedirect("appstore") };

const pageOf = (file) =>
  "/" +
  path
    .relative(out, file)
    .replace(/\\/g, "/")
    .replace(/index\.html$/, "");

const missing = new Map(); // url -> pages that use it
const premature = new Map(); // /go/ links with no real store URL behind them
const add = (map, url, page) => map.set(url, [...(map.get(url) ?? []), page]);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf-8");
  for (const [, url] of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)[^"]*"/g)) {
    if (url.startsWith("//")) continue;
    const go = url.replace(/\/$/, "");
    if (go in goAllowed && !goAllowed[go]) {
      add(premature, url, pageOf(file));
      continue;
    }
    if (!resolves(url)) add(missing, url, pageOf(file));
  }
}

// sitemap.xml and robots.txt must match the built pages: every indexable page listed, nothing else.
const problems = [];
const sitemapFile = path.join(out, "sitemap.xml");
const robotsFile = path.join(out, "robots.txt");
if (!fs.existsSync(sitemapFile)) problems.push("out/sitemap.xml is missing");
if (!fs.existsSync(robotsFile)) problems.push("out/robots.txt is missing");
if (fs.existsSync(sitemapFile)) {
  const xml = fs.readFileSync(sitemapFile, "utf-8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]));
  const listed = new Set(locs.map((u) => u.pathname));
  const noindex = (file) =>
    /<meta name="robots" content="[^"]*noindex/.test(fs.readFileSync(file, "utf-8"));
  const indexable = new Set();
  for (const file of htmlFiles) {
    if (path.basename(file) !== "index.html" || noindex(file)) continue;
    indexable.add(pageOf(file));
  }
  for (const p of listed) {
    if (!indexable.has(p))
      problems.push(`sitemap lists ${p}, which is not an indexable built page`);
  }
  for (const p of indexable) {
    if (!listed.has(p)) problems.push(`built page ${p} is not in the sitemap`);
  }
  if (new Set(locs.map((u) => u.origin)).size > 1) problems.push("sitemap mixes different origins");
  if (fs.existsSync(robotsFile)) {
    const robots = fs.readFileSync(robotsFile, "utf-8");
    const want = `Sitemap: ${locs[0]?.origin}/sitemap.xml`;
    if (!robots.includes(want)) problems.push(`robots.txt must contain "${want}"`);
    if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) problems.push("robots.txt blocks the whole site");
  }
}
for (const p of problems) console.error(`SEO ${p}`);

const show = (pages) => `${pages.slice(0, 3).join(", ")}${pages.length > 3 ? ", ..." : ""}`;
for (const [url, pages] of premature)
  console.error(
    `PREMATURE ${url}: linked, but no real store URL is configured (on ${show(pages)})`,
  );
for (const [url, pages] of missing) console.error(`DEAD ${url}  (used on ${show(pages)})`);
if (premature.size || missing.size || problems.length) process.exit(1);

console.log(`OK: every internal link in ${htmlFiles.length} pages resolves to a file in out/.`);
