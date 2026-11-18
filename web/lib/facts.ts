import data from "../../content/facts.json";

export type FactId = keyof typeof data;

export type FactData = {
  value: string;
  asOf: string | null;
  sourceName: string;
  sourceUrl: string | null;
  /** Numbers that tools need, e.g. GST rates. Must match `value`. */
  data?: Record<string, unknown>;
};

const facts: Record<FactId, FactData> = data;

export function getFact(id: FactId): FactData {
  const fact = facts[id];
  if (!fact) throw new Error(`Unknown fact: ${id}`);
  return fact;
}

export function factData<T>(id: FactId): T {
  const d = getFact(id).data;
  if (!d) throw new Error(`Fact ${id} has no data`);
  return d as T;
}
