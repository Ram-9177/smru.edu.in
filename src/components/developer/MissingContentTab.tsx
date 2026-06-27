"use client";

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/developer/ui";
import type { CompletenessReport, ContentIssue } from "@/types/developer";

type Props = {
  report: CompletenessReport;
  issues: ContentIssue[];
  onQuickEdit?: (issue: ContentIssue) => void;
};

function scoreCard(label: string, items: Array<{ score: number }>) {
  const average = items.length ? Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length) : 0;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-[#0d315c]">{average}%</p>
    </div>
  );
}

const severityTone = (severity: string) => (severity === "high" ? "rose" : severity === "medium" ? "amber" : "blue") as "rose" | "amber" | "blue";

export default function MissingContentTab({ report, issues, onQuickEdit }: Props) {
  const [typeFilter, setTypeFilter] = useState("all");

  const completionMap = useMemo(() => {
    const map = new Map<string, number>();
    [...report.schools, ...report.departments, ...report.programs, ...report.partners, ...report.pages].forEach((item) => {
      map.set(item.id, item.score);
    });
    return map;
  }, [report]);

  const filtered = useMemo(() => issues.filter((issue) => typeFilter === "all" || issue.entityType === typeFilter), [issues, typeFilter]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {scoreCard("Schools", report.schools)}
        {scoreCard("Departments", report.departments)}
        {scoreCard("Programs", report.programs)}
        {scoreCard("Partners", report.partners)}
        {scoreCard("Pages", report.pages)}
      </div>

      <div className="mb-2 flex items-center gap-1">
        {["all", "school", "department", "program", "partner", "page", "route"].map((item) => (
          <button key={item} onClick={() => setTypeFilter(item)} className={`rounded-lg px-2.5 py-1 text-[11px] font-black uppercase ${typeFilter === item ? "bg-[#0d315c] text-white" : "bg-slate-100 text-slate-600"}`}>{item}</button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Entity</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Missing Field</th>
              <th className="px-3 py-2">Completion %</th>
              <th className="px-3 py-2">Severity</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((issue) => (
              <tr key={issue.id} className="border-t border-slate-100">
                <td className="px-3 py-2 font-semibold text-[#0d315c]">{issue.entityLabel}</td>
                <td className="px-3 py-2 text-xs">{issue.entityType}</td>
                <td className="px-3 py-2 text-xs">{issue.missingField}</td>
                <td className="px-3 py-2 text-xs">{completionMap.get(issue.entityId) ?? 0}%</td>
                <td className="px-3 py-2"><Badge label={issue.severity} tone={severityTone(issue.severity)} /></td>
                <td className="px-3 py-2">
                  <button onClick={() => onQuickEdit?.(issue)} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-700 hover:bg-slate-200">Quick Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
