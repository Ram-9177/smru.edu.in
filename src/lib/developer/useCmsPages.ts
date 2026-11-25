"use client";

import { STATIC_PAGE_CONTENT } from "@/data/developer/static-seed";
import { useLiveCms } from "./useLiveCms";

// Page texts: the published ones when there are any, otherwise the built-in ones.
export const useCmsPages = () => useLiveCms()?.pages ?? STATIC_PAGE_CONTENT;
