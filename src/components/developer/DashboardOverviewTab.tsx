"use client";

import React from "react";
import type { ContentIssue, DeveloperCMSState, RedirectCheckResult } from "@/types/developer";

type Props = {
  state: DeveloperCMSState;
  missing: ContentIssue[];
  redirects: RedirectCheckResult[];
};

function card(label: string, value: number) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-[#0d315c]">{value}</p>
    </div>
  );
}

export default function DashboardOverviewTab({ state, missing, redirects }: Props) {
  const routes = state.routes;

  const visibilityCount = {
    public: routes.filter((r) => r.visibility === "public").length,
    hidden: routes.filter((r) => r.visibility === "hidden").length,
    draft: routes.filter((r) => r.visibility === "draft").length,
    internal: routes.filter((r) => r.visibility === "internal").length,
  };

  const brokenRedirects = redirects.filter((r) => !r.valid).length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {card("Total Pages", routes.length)}
        {card("Public Pages", visibilityCount.public)}
        {card("Hidden Pages", visibilityCount.hidden)}
        {card("Draft Pages", visibilityCount.draft)}
        {card("Internal Pages", visibilityCount.internal)}
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-7">
        {card("Total Schools", state.schools.length)}
        {card("Total Departments", state.departments.length)}
        {card("Total Programs", state.programs.length)}
        {card("Course Codes", state.courseCodes.length)}
        {card("Total Partners", state.partners.length)}
        {card("Missing Fields", missing.length)}
        {card("Broken Redirects", brokenRedirects)}
      </div>
    </div>
  );
}
