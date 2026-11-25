"use client";

import { SEED_PARTNERS } from "./seed-partners";
import { useLiveCms } from "./useLiveCms";

// Training partners: the published ones when there are any, otherwise the built-in ones.
export const useCmsPartners = () => useLiveCms()?.partners ?? SEED_PARTNERS;
