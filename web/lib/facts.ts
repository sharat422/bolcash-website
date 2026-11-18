import data from "../../content/facts.json";

export type FactId = keyof typeof data;

export type FactData = {
  value: string;
  asOf: string | null;
  sourceName: string;
  sourceUrl: string | null;
};

const facts: Record<FactId, FactData> = data;

export function getFact(id: FactId): FactData {
  const fact = facts[id];
  if (!fact) throw new Error(`Unknown fact: ${id}`);
  return fact;
}
