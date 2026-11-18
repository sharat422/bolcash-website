import type { NextConfig } from "next";

const config: NextConfig = {
  // Every route is pre-rendered to plain HTML in /out. Content pages work without JS.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { externalDir: true }, // lets lib/facts.ts import ../content/facts.json
};

export default config;
