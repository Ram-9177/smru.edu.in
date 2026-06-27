"use client";

import React, { useMemo, useState } from "react";
import DashboardOverviewTab from "@/components/developer/DashboardOverviewTab";
import CumulativeMapTab from "@/components/developer/CumulativeMapTab";
import CourseCodesManagerTab from "@/components/developer/CourseCodesManagerTab";
import EntityManagerTab from "@/components/developer/EntityManagerTab";
import MissingContentTab from "@/components/developer/MissingContentTab";
import PartnersManagerTab from "@/components/developer/PartnersManagerTab";
import PreviewTab from "@/components/developer/PreviewTab";
import ProgramsManagerTab from "@/components/developer/ProgramsManagerTab";
import RoutesManagerTab from "@/components/developer/RoutesManagerTab";
import SchoolHierarchyTree from "@/components/developer/SchoolHierarchyTree";
import { DEVELOPER_TABS, type DeveloperTabKey } from "@/components/developer/types";
import { Badge } from "@/components/developer/ui";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import type { ContentIssue, CourseCode, Department, PageRoute, Partner, Program, School } from "@/types/developer";

export default function DeveloperDashboardClient() {
  const [activeTab, setActiveTab] = useState<DeveloperTabKey>("dashboard");
  const [focusEntityId, setFocusEntityId] = useState<string | null>(null);
  const { state, liveSource, livePublishedAt, publishNotice, clearPublishNotice, hasPendingChanges, missing, redirects, completeness, updateEntity, deleteEntity, exportState } = useDeveloperCms({
    useOverlay: true,
    autoPublishOnMutate: false,
  });
  const formattedLivePublishedAt = useMemo(() => {
    if (!livePublishedAt) return "";
    const d = new Date(livePublishedAt);
    if (Number.isNaN(d.getTime())) return livePublishedAt;
    return d.toLocaleString();
  }, [livePublishedAt]);

  const invalidRedirectCount = useMemo(() => redirects.filter((item) => !item.valid).length, [redirects]);

  const deleteProgramCascade = (programId: string) => {
    deleteEntity("programs", programId);
    state.partnerLinks
      .filter((link) => link.programId === programId)
      .forEach((link) => deleteEntity("partnerLinks", link.id));
  };

  const deleteDepartmentCascade = (departmentId: string) => {
    deleteEntity("departments", departmentId);
    state.programs
      .filter((program) => program.departmentId === departmentId)
      .forEach((program) => deleteProgramCascade(program.id));
  };

  const deleteSchoolCascade = (schoolId: string) => {
    deleteEntity("schools", schoolId);
    state.departments
      .filter((department) => department.schoolId === schoolId)
      .forEach((department) => deleteDepartmentCascade(department.id));
  };

  const handleQuickEdit = (issue: ContentIssue) => {
    setFocusEntityId(issue.entityId);
    if (issue.entityType === "route") setActiveTab("routes");
    else if (issue.entityType === "school") setActiveTab("schools");
    else if (issue.entityType === "department") setActiveTab("departments");
    else if (issue.entityType === "program") setActiveTab("programs");
    else if (issue.entityType === "partner") setActiveTab("partners");
    else setActiveTab("preview");
  };

  const handleOpenHierarchyEntity = (type: "school" | "department" | "program", id: string) => {
    setFocusEntityId(id);
    if (type === "school") setActiveTab("schools");
    if (type === "department") setActiveTab("departments");
    if (type === "program") setActiveTab("programs");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e8f6ff,transparent_40%),radial-gradient(circle_at_top_right,#f0fff8,transparent_45%),#f7f9fc]">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-4 p-4 lg:flex-row">
        <aside className="w-full shrink-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-[280px]">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#019e6e]">Internal Control System</p>
          <h1 className="mt-2 text-xl font-black tracking-tight text-[#0d315c]">Stmarys University Developer CMS</h1>
          <p className="mt-1 text-xs text-slate-500">Preloaded pseudo CMS for schools, courses, routes, and partners.</p>

          <nav className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {DEVELOPER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-[11px] font-black uppercase tracking-wide transition lg:text-xs ${
                  activeTab === tab.key ? "bg-[#0d315c] text-white shadow" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-6 space-y-2">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">Access</p>
              <p className="mt-1 text-[11px] text-amber-700">Internal, noindex, URL-only.</p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-rose-700">Redirect Alerts</p>
              <p className="mt-1 text-[11px] text-rose-700">{invalidRedirectCount} broken/missing redirects</p>
            </div>
          </div>
        </aside>

        <section className="min-w-0 w-full flex-1 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#0d315c]">{DEVELOPER_TABS.find((tab) => tab.key === activeTab)?.label}</h2>
              <p className="text-xs text-slate-500">Editable internal CMS view with FTP publish download.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge label={liveSource === "live-json" ? "live json" : "seed fallback"} tone={liveSource === "live-json" ? "green" : "amber"} />
              {liveSource === "live-json" && formattedLivePublishedAt && <Badge label={`published ${formattedLivePublishedAt}`} tone="violet" />}
              <Badge label={hasPendingChanges ? "unsaved export" : "export synced"} tone={hasPendingChanges ? "amber" : "green"} />
              <Badge label={`${state.programs.length} programs`} tone="blue" />
              <Badge label={`${state.courseCodes.length} course codes`} tone="violet" />
              <Badge label={`${state.partners.length} partners`} tone="green" />
              <Badge label={`${missing.length} missing fields`} tone="amber" />
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-600">
              Changes stay local while you edit. Use final save once to download the latest `cms-data.json`.
            </p>
            <button
              onClick={exportState}
              className="rounded-xl bg-[#019e6e] px-4 py-2 text-xs font-black uppercase tracking-wider text-white"
            >
              Final Save
            </button>
          </div>

          {publishNotice && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 flex items-start justify-between gap-3">
              <p className="font-semibold">{publishNotice}</p>
              <button onClick={clearPublishNotice} className="shrink-0 rounded-md border border-emerald-300 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-800">
                Dismiss
              </button>
            </div>
          )}

          {activeTab === "dashboard" && <DashboardOverviewTab state={state} missing={missing} redirects={redirects} />}

          {activeTab === "map" && (
            <CumulativeMapTab
              schools={state.schools}
              departments={state.departments}
              programs={state.programs}
              onOpenEntity={handleOpenHierarchyEntity}
              onUpdateSchool={(school) => updateEntity("schools", school)}
              onUpdateDepartment={(department) => updateEntity("departments", department)}
              onUpdateProgram={(program) => updateEntity("programs", program)}
            />
          )}

          {activeTab === "routes" && (
            <RoutesManagerTab routes={state.routes} focusEntityId={focusEntityId} onUpdate={(route) => updateEntity("routes", route as PageRoute)} />
          )}

          {activeTab === "schools" && (
            <div className="space-y-4">
              <SchoolHierarchyTree
                schools={state.schools}
                departments={state.departments}
                programs={state.programs}
                onOpenEntity={handleOpenHierarchyEntity}
              />
              <EntityManagerTab<School>
                title="School"
                entities={state.schools}
                focusEntityId={focusEntityId}
                onUpdate={(entity) => updateEntity("schools", entity)}
                onDelete={(entity) => deleteSchoolCascade(entity.id)}
                primaryFields={[
                  { key: "name", label: "School Name" },
                  { key: "shortName", label: "Short Name" },
                  { key: "slug", label: "Slug" },
                  { key: "heroTitle", label: "Hero Title" },
                  { key: "heroSubtitle", label: "Hero Subtitle" },
                  { key: "overview", label: "Overview", type: "textarea" },
                  { key: "description", label: "Description", type: "textarea" },
                  { key: "deanName", label: "Dean/Head Name" },
                  { key: "image", label: "Image" },
                  { key: "icon", label: "Icon/Logo" },
                  { key: "ctaLabel", label: "CTA Label" },
                  { key: "ctaLink", label: "CTA Link" },
                ]}
              />
            </div>
          )}

          {activeTab === "departments" && (
            <EntityManagerTab<Department>
              title="Department"
              entities={state.departments}
              focusEntityId={focusEntityId}
              onUpdate={(entity) => updateEntity("departments", entity)}
              onDelete={(entity) => deleteDepartmentCascade(entity.id)}
              primaryFields={[
                { key: "name", label: "Department Name" },
                { key: "slug", label: "Slug" },
                {
                  key: "schoolId",
                  label: "Parent School",
                  type: "select",
                  options: state.schools.map((school) => ({
                    label: school.name || school.id,
                    value: school.id,
                  })),
                },
                { key: "shortDescription", label: "Short Description", type: "textarea" },
                { key: "fullDescription", label: "Full Description", type: "textarea" },
                { key: "hodName", label: "HOD Name" },
                { key: "image", label: "Image" },
                { key: "ctaLabel", label: "CTA Label" },
                { key: "ctaLink", label: "CTA Link" },
              ]}
            />
          )}

          {activeTab === "programs" && (
            <ProgramsManagerTab
              programs={state.programs}
              schools={state.schools}
              departments={state.departments}
              partners={state.partners}
              partnerLinks={state.partnerLinks}
              focusEntityId={focusEntityId}
              onUpdateProgram={(program) => updateEntity("programs", program as Program)}
              onDeleteProgram={(program) => deleteProgramCascade(program.id)}
              onUpdatePartnerLink={(link) => updateEntity("partnerLinks", link)}
            />
          )}

          {activeTab === "courseCodes" && (
            <CourseCodesManagerTab
              courseCodes={state.courseCodes}
              focusEntityId={focusEntityId}
              onUpdate={(courseCode) => updateEntity("courseCodes", courseCode as CourseCode)}
              onDelete={(courseCode) => deleteEntity("courseCodes", courseCode.id)}
            />
          )}

          {activeTab === "partners" && (
            <PartnersManagerTab
              partners={state.partners}
              programs={state.programs}
              partnerLinks={state.partnerLinks}
              focusEntityId={focusEntityId}
              onUpdatePartner={(entity) => updateEntity("partners", entity as Partner)}
              onUpdatePartnerLink={(link) => updateEntity("partnerLinks", link)}
              onUpsertRoute={(route) => updateEntity("routes", route as PageRoute)}
              onDeletePartner={(partner) => {
                deleteEntity("partners", partner.id);
                state.partnerLinks
                  .filter((link) => link.partnerId === partner.id)
                  .forEach((link) => deleteEntity("partnerLinks", link.id));

                const partnerRoute = state.routes.find(
                  (route) =>
                    route.pageType === "partner" &&
                    (route.url === `/partner/${partner.slug || ""}` || route.slug === partner.slug)
                );
                if (partnerRoute) deleteEntity("routes", partnerRoute.id);
              }}
            />
          )}

          {activeTab === "missing" && <MissingContentTab report={completeness} issues={missing} onQuickEdit={handleQuickEdit} />}

          {activeTab === "preview" && <PreviewTab state={state} />}
        </section>
      </div>
    </div>
  );
}
