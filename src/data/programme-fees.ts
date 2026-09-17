// Per-programme fee plumbing.
//
// SMRU has not published a public per-programme fee table, and fees must never be
// guessed (a wrong fee on a university site is a regulatory problem). This module is
// the single place real figures land once the Registrar supplies them: fill an entry
// keyed by the canonical programme path and the facts table + Course `offers` schema
// pick it up automatically. Until then every lookup returns `undefined`, the page shows
// the "published at counselling" line, and the gap is logged in docs/seo/needs-input.md.

export type ProgrammeFee = {
  /** Annual tuition in INR (numeric rupees, no separators), when officially published. */
  annualINR?: number;
  /** Total programme tuition in INR, when officially published. */
  totalINR?: number;
  /** Indicative annual tuition in USD for international applicants, when published. */
  annualUSD?: number;
  /** Source note (document / counselling reference) for auditability. */
  source?: string;
};

// Key: canonical programme path "/schools/{school}/{dept}/{programme}".
// Example (commented — do NOT uncomment without an official figure):
// "/schools/health-allied-health-sciences/physiotherapy/bpt": { annualINR: 0, source: "@@NEEDS_UNIVERSITY_INPUT@@" },
export const PROGRAMME_FEES: Record<string, ProgrammeFee> = {};

export const getProgrammeFee = (pathname: string): ProgrammeFee | undefined => {
  const fee = PROGRAMME_FEES[pathname.replace(/\/$/, "")];
  if (!fee) return undefined;
  // A placeholder marker never counts as a real fee.
  if (fee.source === "@@NEEDS_UNIVERSITY_INPUT@@" || (!fee.annualINR && !fee.totalINR)) return undefined;
  return fee;
};

export const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;
