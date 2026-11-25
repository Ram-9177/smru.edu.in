"use client";

import dynamic from "next/dynamic";

// One download per school view. next/dynamic only splits the bundle when it is called from a client component, so a
// server page that used it directly still shipped all three views to every school page.
export const SchoolView = dynamic(() => import("@/views/School"));
export const SchoolOfLawView = dynamic(() => import("@/views/SchoolOfLaw"));
export const NursingLandingView = dynamic(() => import("@/views/NursingLandingClient"));
