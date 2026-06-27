"use client";

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/developer/ui";
import type { DeveloperCMSState } from "@/types/developer";

type Props = {
  state: DeveloperCMSState;
};

function parseProgramRoute(url = "") {
  const parts = url.split("/").filter(Boolean);
  if (parts.length >= 4 && parts[0] === "schools") {
    return {
      schoolSlug: parts[1],
      departmentSlug: parts[2],
      programSlug: parts[3],
    };
  }
  return null;
}

export default function PreviewTab({ state }: Props) {
  const [routeId, setRouteId] = useState("");
  const [programId, setProgramId] = useState("");

  const schoolById = useMemo(() => new Map(state.schools.map((school) => [school.id, school])), [state.schools]);
  const departmentById = useMemo(() => new Map(state.departments.map((department) => [department.id, department])), [state.departments]);
  const partnerById = useMemo(() => new Map(state.partners.map((partner) => [partner.id, partner])), [state.partners]);

  const selectedRoute = useMemo(
    () => state.routes.find((route) => route.id === routeId) || state.routes.find((route) => route.visibility === "public"),
    [state.routes, routeId]
  );

  const routeResolvedProgram = useMemo(() => {
    if (!selectedRoute) return null;
    const parsed = parseProgramRoute(selectedRoute.url);
    if (!parsed) return null;

    const school = state.schools.find((item) => item.slug === parsed.schoolSlug);
    if (!school) return null;

    const department = state.departments.find(
      (item) => item.schoolId === school.id && item.slug === parsed.departmentSlug
    );
    if (!department) return null;

    return (
      state.programs.find(
        (item) => item.schoolId === school.id && item.departmentId === department.id && item.slug === parsed.programSlug
      ) || null
    );
  }, [selectedRoute, state.schools, state.departments, state.programs]);

  const selectedProgram = useMemo(() => {
    if (programId) return state.programs.find((program) => program.id === programId) || null;
    if (routeResolvedProgram) return routeResolvedProgram;
    return state.programs[0] || null;
  }, [state.programs, programId, routeResolvedProgram]);

  const selectedProgramSchool = selectedProgram ? schoolById.get(selectedProgram.schoolId) : null;
  const selectedProgramDepartment = selectedProgram ? departmentById.get(selectedProgram.departmentId) : null;

  const selectedProgramPartnerLinks = useMemo(
    () => (selectedProgram ? state.partnerLinks.filter((link) => link.programId === selectedProgram.id && link.enabled) : []),
    [state.partnerLinks, selectedProgram]
  );

  const selectedRoutePartner = useMemo(() => {
    if (!selectedRoute || selectedRoute.pageType !== "partner") return null;
    const parts = selectedRoute.url.split("/").filter(Boolean);
    const routeSlug = parts[0] === "partner" ? parts[1] || "" : parts[0] || "";
    return state.partners.find((partner) => partner.slug === routeSlug) || null;
  }, [selectedRoute, state.partners]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Route Preview Selector</p>
          <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" value={selectedRoute?.id || ""} onChange={(e) => setRouteId(e.target.value)}>
            {state.routes.map((route) => (
              <option key={route.id} value={route.id}>{route.title || route.url}</option>
            ))}
          </select>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Program Preview Selector</p>
          <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" value={selectedProgram?.id || ""} onChange={(e) => setProgramId(e.target.value)}>
            {state.programs.map((program) => (
              <option key={program.id} value={program.id}>{program.courseName || program.id}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedRoute && (
        <article className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#f8fbff] to-white p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#019e6e]">Public Route Preview</p>
          <h3 className="mt-2 text-2xl font-black text-[#0d315c]">{selectedRoute.title || "Untitled Page"}</h3>
          <p className="mt-1 text-sm text-slate-500">{selectedRoute.url}</p>
          <div className="mt-3 flex gap-2">
            <Badge label={selectedRoute.visibility || "public"} tone="green" />
            <Badge label={selectedRoute.status || "live"} tone="blue" />
            <Badge label={selectedRoute.indexable ? "indexable" : "noindex"} tone={selectedRoute.indexable ? "green" : "amber"} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="rounded-lg border border-slate-200 bg-white p-3">Type: <strong>{selectedRoute.pageType || "page"}</strong></div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">Navbar: <strong>{selectedRoute.inNavbar ? "Yes" : "No"}</strong></div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">Footer: <strong>{selectedRoute.inFooter ? "Yes" : "No"}</strong></div>
          </div>
        </article>
      )}

      {selectedProgram && (
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#019e6e]">Program Page Preview</p>
          <h3 className="mt-2 text-2xl font-black text-[#0d315c]">{selectedProgram.heroTitle || selectedProgram.courseName || "Program Title"}</h3>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">{selectedProgram.heroSubtitle || selectedProgram.shortOverview || "Hero subtitle / overview will appear here."}</p>

          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
            <strong>Chain:</strong> {selectedProgramSchool?.name || "School"} {" > "} {selectedProgramDepartment?.name || "Department"} {" > "} {selectedProgram.courseName || "Program"}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a href={selectedProgram.applyNowLink || selectedProgram.primaryCtaLink || "#"} className="rounded-lg bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wide text-white">{selectedProgram.primaryCtaLabel || "Apply"}</a>
            <a href={selectedProgram.secondaryCtaLink || selectedProgram.brochureLink || "#"} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-700">{selectedProgram.secondaryCtaLabel || "Brochure"}</a>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="rounded-lg bg-slate-50 p-3">Type: <strong>{selectedProgram.programType || "Other"}</strong></div>
            <div className="rounded-lg bg-slate-50 p-3">Duration: <strong>{selectedProgram.duration || "TBD"}</strong></div>
            <div className="rounded-lg bg-slate-50 p-3">Visibility: <strong>{selectedProgram.visibility || "public"}</strong></div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 p-3">
            <h4 className="text-xs font-black uppercase tracking-[0.12em] text-[#0d315c]">Program Partner Redirects</h4>
            {selectedProgramPartnerLinks.length === 0 && <p className="mt-2 text-xs text-slate-500">No enabled partner mapping for this program.</p>}
            <div className="mt-2 space-y-2">
              {selectedProgramPartnerLinks.map((link) => {
                const partner = partnerById.get(link.partnerId);
                return (
                  <div key={link.id} className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700">
                    <p><strong>Partner:</strong> {partner?.name || link.partnerId || "Unassigned"}</p>
                    <p><strong>Logo:</strong> {partner?.logo || "Not set"}</p>
                    <p><strong>Redirect:</strong> {link.redirectLink || partner?.redirectUrl || "Not set"}</p>
                    <p><strong>CTA:</strong> {link.ctaLabel || "Partner Apply"}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      )}

      {selectedRoutePartner && (
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#019e6e]">Partner Route Preview</p>
          <h3 className="mt-2 text-2xl font-black text-[#0d315c]">{selectedRoutePartner.name || "Partner"}</h3>
          <p className="mt-1 text-sm text-slate-500">/partner/{selectedRoutePartner.slug || "partner"}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">Iframe URL: <strong>{selectedRoutePartner.iframeUrl || "Not set"}</strong></div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">Redirect URL: <strong>{selectedRoutePartner.redirectUrl || "Not set"}</strong></div>
          </div>
          {selectedRoutePartner.iframeUrl && (
            <iframe title="Partner iframe preview" src={selectedRoutePartner.iframeUrl} className="mt-4 h-64 w-full rounded-lg border border-slate-200" />
          )}
        </article>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#0d315c]">Effective JSON Snapshot</h3>
        <pre className="mt-3 max-h-[420px] overflow-auto rounded-lg bg-slate-950 p-4 text-[11px] leading-relaxed text-emerald-200">{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}
