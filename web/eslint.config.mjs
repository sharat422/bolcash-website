import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  { ignores: [".next/", "out/", "playwright-report/", "test-results/", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
