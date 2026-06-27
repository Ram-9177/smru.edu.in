"use client";

import React, { useEffect, useMemo, useState } from "react";
import EditorDrawer from "@/components/developer/EditorDrawer";
import { BoolField, Field, SelectField, TextareaField } from "@/components/developer/Fields";
import { toSlug } from "@/lib/developer/slug";
import { Badge, toneByStatus, toneByVisibility } from "@/components/developer/ui";
import type { CoursePartnerLink, Department, Partner, Program, School } from "@/types/developer";

type Props = {
  programs: Program[];
  schools: School[];
  departments: Department[];
  partners: Partner[];
  partnerLinks: CoursePartnerLink[];
  onUpdateProgram: (program: Program) => void;
  onDeleteProgram?: (program: Program) => void;
  onUpdatePartnerLink: (link: CoursePartnerLink) => void;
  focusEntityId?: string | null;
};

const programTypes = ["UG", "PG", "Diploma", "Certificate", "PhD", "Fellowship", "Other"];
const programSections = ["Basic", "Hero", "Overview", "Admissions", "Curriculum", "Faculty/Labs", "Careers", "SEO", "Internal", "Partner Mapping"] as const;
type ProgramSection = typeof programSections[number];

const toCsv = (value?: string[]) => (value || []).join(", ");
const fromCsv = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);

export default function ProgramsManagerTab({ programs, schools, departments, partners, partnerLinks, onUpdateProgram, onDeleteProgram, onUpdatePartnerLink, focusEntityId }: Props) {
  const [query, setQuery] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [active, setActive] = useState<Program | null>(null);
  const [activeSection, setActiveSection] = useState<ProgramSection>("Basic");

  const schoolById = useMemo(() => new Map(schools.map((school) => [school.id, school])), [schools]);
  const departmentById = useMemo(() => new Map(departments.map((department) => [department.id, department])), [departments]);

  useEffect(() => {
    if (!focusEntityId) return;
    const target = programs.find((program) => program.id === focusEntityId);
    if (target) setActive(target);
  }, [focusEntityId, programs]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return programs.filter((program) => {
      const matchesQ = !q || `${program.courseName || ""} ${program.slug || ""}`.toLowerCase().includes(q);
      const matchesSchool = schoolFilter === "all" || program.schoolId === schoolFilter;
      const matchesDepartment = departmentFilter === "all" || program.departmentId === departmentFilter;
      return matchesQ && matchesSchool && matchesDepartment;
    });
  }, [programs, query, schoolFilter, departmentFilter]);

  const activeLinks = useMemo(() => partnerLinks.filter((link) => link.programId === active?.id), [partnerLinks, active?.id]);
  const partnerById = useMemo(() => new Map(partners.map((partner) => [partner.id, partner])), [partners]);

  const addLink = () => {
    if (!active) return;
    const id = `pl-${active.id}-${Date.now()}`;
    onUpdatePartnerLink({
      id,
      programId: active.id,
      partnerId: "",
      ctaLabel: "Partner Apply CTA",
      redirectLink: "",
      redirectType: "internal",
      enabled: false,
      visibility: "draft",
      status: "in-progress",
      notes: "Placeholder mapping added from Program CMS",
    });
  };

  return (
    <>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <input placeholder="Search programs..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
        <select value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="all">All Schools</option>
          {schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
        </select>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All Departments</option>
          {departments
            .filter((department) => schoolFilter === "all" || department.schoolId === schoolFilter)
            .map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Course</th>
              <th className="px-3 py-2">School</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Visibility</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Toggle</th>
              <th className="px-3 py-2">Partner Links</th>
              <th className="px-3 py-2">Completeness</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((program) => (
              <tr key={program.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50" onClick={() => { setActive(program); setActiveSection("Basic"); }}>
                <td className="px-3 py-2 font-semibold text-[#0d315c]">{program.courseName || "Untitled"}</td>
                <td className="px-3 py-2 text-xs text-slate-600">{schoolById.get(program.schoolId)?.name || "-"}</td>
                <td className="px-3 py-2 text-xs text-slate-600">{departmentById.get(program.departmentId)?.name || "-"}</td>
                <td className="px-3 py-2">{program.programType || "Other"}</td>
                <td className="px-3 py-2"><Badge label={program.visibility || "public"} tone={toneByVisibility(program.visibility)} /></td>
                <td className="px-3 py-2"><Badge label={program.status || "live"} tone={toneByStatus(program.status)} /></td>
                <td className="px-3 py-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      const nextVisibility = program.visibility === "public" ? "hidden" : "public";
                      onUpdateProgram({ ...program, visibility: nextVisibility });
                    }}
                    className={`rounded-md px-2 py-1 text-[10px] font-black uppercase ${
                      program.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {program.visibility === "public" ? "On" : "Off"}
                  </button>
                </td>
                <td className="px-3 py-2 text-xs">{partnerLinks.filter((item) => item.programId === program.id && item.enabled).length}</td>
                <td className="px-3 py-2 text-xs">{program.contentCompleteness || 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditorDrawer open={Boolean(active)} title={`Program CMS: ${active?.courseName || active?.id || ""}`} onClose={() => setActive(null)}>
        {active && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Hierarchy</p>
              <p className="mt-1 text-sm font-semibold text-[#0d315c]">
                {(schoolById.get(active.schoolId)?.name || "School")} {" > "}
                {(departmentById.get(active.departmentId)?.name || "Department")} {" > "}
                {(active.courseName || "Program")}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 p-1">
              {programSections.map((section) => (
                <button key={section} onClick={() => setActiveSection(section)} className={`rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-wide ${activeSection === section ? "bg-[#0d315c] text-white" : "text-slate-500 hover:bg-slate-100"}`}>{section}</button>
              ))}
            </div>

            {activeSection === "Basic" && (
              <div className="space-y-3">
                <Field label="Course Name" value={active.courseName} onChange={(value) => setActive({ ...active, courseName: value })} />
                <Field label="Short Name" value={active.shortName} onChange={(value) => setActive({ ...active, shortName: value })} />
                <Field label="Slug" value={active.slug} onChange={(value) => setActive({ ...active, slug: value })} />
                <SelectField label="Program Type" value={active.programType} options={programTypes} onChange={(value) => setActive({ ...active, programType: value as Program["programType"] })} />
                <SelectField
                  label="School"
                  value={active.schoolId}
                  options={schools.map((school) => ({ label: school.name || school.id, value: school.id }))}
                  onChange={(value) => {
                    const firstDepartmentForSchool = departments.find((department) => department.schoolId === value)?.id || "";
                    setActive({
                      ...active,
                      schoolId: value,
                      departmentId:
                        departments.some((department) => department.schoolId === value && department.id === active.departmentId)
                          ? active.departmentId
                          : firstDepartmentForSchool,
                    });
                  }}
                />
                <SelectField
                  label="Department"
                  value={active.departmentId}
                  options={departments
                    .filter((department) => department.schoolId === active.schoolId)
                    .map((department) => ({ label: department.name || department.id, value: department.id }))}
                  onChange={(value) => setActive({ ...active, departmentId: value })}
                />
                <Field label="Mode" value={active.mode} onChange={(value) => setActive({ ...active, mode: value })} />
                <Field label="Duration" value={active.duration} onChange={(value) => setActive({ ...active, duration: value })} />
                <Field label="Internship Duration" value={active.internshipDuration} onChange={(value) => setActive({ ...active, internshipDuration: value })} />
                <Field label="Total Intake" value={active.totalIntake} onChange={(value) => setActive({ ...active, totalIntake: value })} />
                <Field label="Campus" value={active.campus} onChange={(value) => setActive({ ...active, campus: value })} />
                <Field label="Medium of Instruction" value={active.mediumOfInstruction} onChange={(value) => setActive({ ...active, mediumOfInstruction: value })} />
              </div>
            )}

            {activeSection === "Hero" && (
              <div className="space-y-3">
                <Field label="Hero Title" value={active.heroTitle} onChange={(value) => setActive({ ...active, heroTitle: value })} />
                <TextareaField label="Hero Subtitle" value={active.heroSubtitle} onChange={(value) => setActive({ ...active, heroSubtitle: value })} rows={2} />
                <Field label="Hero Image" value={active.heroImage} onChange={(value) => setActive({ ...active, heroImage: value })} />
                <Field label="Brochure Link" value={active.brochureLink} onChange={(value) => setActive({ ...active, brochureLink: value })} />
                <Field label="Apply Now Redirect (Custom)" value={active.applyNowLink} onChange={(value) => setActive({ ...active, applyNowLink: value })} />
                <Field label="Primary CTA Label" value={active.primaryCtaLabel} onChange={(value) => setActive({ ...active, primaryCtaLabel: value })} />
                <Field label="Primary CTA Link" value={active.primaryCtaLink} onChange={(value) => setActive({ ...active, primaryCtaLink: value })} />
                <Field label="Secondary CTA Label" value={active.secondaryCtaLabel} onChange={(value) => setActive({ ...active, secondaryCtaLabel: value })} />
                <Field label="Secondary CTA Link" value={active.secondaryCtaLink} onChange={(value) => setActive({ ...active, secondaryCtaLink: value })} />
              </div>
            )}

            {activeSection === "Overview" && (
              <div className="space-y-3">
                <TextareaField label="Short Overview" value={active.shortOverview} onChange={(value) => setActive({ ...active, shortOverview: value })} rows={3} />
                <TextareaField label="Full Overview" value={active.fullOverview} onChange={(value) => setActive({ ...active, fullOverview: value })} rows={4} />
                <TextareaField label="Why Choose This Program" value={active.whyChoose} onChange={(value) => setActive({ ...active, whyChoose: value })} rows={3} />
                <Field label="Highlights (comma-separated)" value={toCsv(active.highlights)} onChange={(value) => setActive({ ...active, highlights: fromCsv(value) })} />
                <TextareaField label="Learning Outcomes" value={active.learningOutcomes} onChange={(value) => setActive({ ...active, learningOutcomes: value })} rows={3} />
                <TextareaField label="Career Outcomes" value={active.careerOutcomes} onChange={(value) => setActive({ ...active, careerOutcomes: value })} rows={3} />
              </div>
            )}

            {activeSection === "Admissions" && (
              <div className="space-y-3">
                <TextareaField label="Eligibility" value={active.eligibility} onChange={(value) => setActive({ ...active, eligibility: value })} rows={2} />
                <TextareaField label="Admission Process" value={active.admissionProcess} onChange={(value) => setActive({ ...active, admissionProcess: value })} rows={2} />
                <TextareaField label="Required Documents" value={active.requiredDocuments} onChange={(value) => setActive({ ...active, requiredDocuments: value })} rows={2} />
                <Field label="Important Dates" value={active.importantDates} onChange={(value) => setActive({ ...active, importantDates: value })} />
                <Field label="Fees Note" value={active.feesNote} onChange={(value) => setActive({ ...active, feesNote: value })} />
                <Field label="Scholarship Note" value={active.scholarshipNote} onChange={(value) => setActive({ ...active, scholarshipNote: value })} />
                <Field label="Admissions Link" value={active.admissionsLink} onChange={(value) => setActive({ ...active, admissionsLink: value })} />
                <Field label="Enquiry Link" value={active.enquiryLink} onChange={(value) => setActive({ ...active, enquiryLink: value })} />
              </div>
            )}

            {activeSection === "Curriculum" && (
              <div className="space-y-3">
                <TextareaField label="Curriculum Summary" value={active.curriculumSummary} onChange={(value) => setActive({ ...active, curriculumSummary: value })} rows={3} />
                <TextareaField label="Year-wise Structure" value={active.yearWiseStructure} onChange={(value) => setActive({ ...active, yearWiseStructure: value })} rows={2} />
                <TextareaField label="Semester-wise Structure" value={active.semesterWiseStructure} onChange={(value) => setActive({ ...active, semesterWiseStructure: value })} rows={2} />
                <Field label="Core Subjects (comma-separated)" value={toCsv(active.coreSubjects)} onChange={(value) => setActive({ ...active, coreSubjects: fromCsv(value) })} />
                <Field label="Electives (comma-separated)" value={toCsv(active.electives)} onChange={(value) => setActive({ ...active, electives: fromCsv(value) })} />
                <TextareaField label="Clinical Training Info" value={active.clinicalTrainingInfo} onChange={(value) => setActive({ ...active, clinicalTrainingInfo: value })} rows={2} />
                <TextareaField label="Internship Info" value={active.internshipInfo} onChange={(value) => setActive({ ...active, internshipInfo: value })} rows={2} />
                <Field label="Curriculum PDF" value={active.curriculumPdf} onChange={(value) => setActive({ ...active, curriculumPdf: value })} />
                <Field label="Syllabus PDF" value={active.syllabusPdf} onChange={(value) => setActive({ ...active, syllabusPdf: value })} />
              </div>
            )}

            {activeSection === "Faculty/Labs" && (
              <div className="space-y-3">
                <Field label="Faculty Assigned (comma-separated)" value={toCsv(active.facultyAssigned)} onChange={(value) => setActive({ ...active, facultyAssigned: fromCsv(value) })} />
                <Field label="Labs Assigned (comma-separated)" value={toCsv(active.labsAssigned)} onChange={(value) => setActive({ ...active, labsAssigned: fromCsv(value) })} />
                <Field label="Clinical Centers Assigned (comma-separated)" value={toCsv(active.clinicalCentersAssigned)} onChange={(value) => setActive({ ...active, clinicalCentersAssigned: fromCsv(value) })} />
                <Field label="Training Partner Assigned (comma-separated)" value={toCsv(active.trainingPartnerAssigned)} onChange={(value) => setActive({ ...active, trainingPartnerAssigned: fromCsv(value) })} />
              </div>
            )}

            {activeSection === "Careers" && (
              <div className="space-y-3">
                <TextareaField label="Career Opportunities" value={active.careerOpportunities} onChange={(value) => setActive({ ...active, careerOpportunities: value })} rows={2} />
                <TextareaField label="Higher Studies" value={active.higherStudies} onChange={(value) => setActive({ ...active, higherStudies: value })} rows={2} />
                <TextareaField label="Placement Note" value={active.placementNote} onChange={(value) => setActive({ ...active, placementNote: value })} rows={2} />
                <TextareaField label="Internship Support Note" value={active.internshipSupportNote} onChange={(value) => setActive({ ...active, internshipSupportNote: value })} rows={2} />
              </div>
            )}

            {activeSection === "SEO" && (
              <div className="space-y-3">
                <Field label="Meta Title" value={active.metaTitle} onChange={(value) => setActive({ ...active, metaTitle: value })} />
                <TextareaField label="Meta Description" value={active.metaDescription} onChange={(value) => setActive({ ...active, metaDescription: value })} rows={2} />
                <Field label="OG Image" value={active.ogImage} onChange={(value) => setActive({ ...active, ogImage: value })} />
                <Field label="Canonical URL" value={active.canonicalUrl} onChange={(value) => setActive({ ...active, canonicalUrl: value })} />
                <BoolField label="Indexable" checked={active.indexable} onChange={(value) => setActive({ ...active, indexable: value })} />
                <BoolField label="In Sitemap" checked={active.inSitemap} onChange={(value) => setActive({ ...active, inSitemap: value })} />
              </div>
            )}

            {activeSection === "Internal" && (
              <div className="space-y-3">
                <SelectField label="Visibility" value={active.visibility} options={["public", "hidden", "draft", "internal"]} onChange={(value) => setActive({ ...active, visibility: value as Program["visibility"] })} />
                <SelectField label="Status" value={active.status} options={["live", "in-progress", "coming-soon", "archived"]} onChange={(value) => setActive({ ...active, status: value as Program["status"] })} />
                <Field label="Content Completeness %" value={String(active.contentCompleteness || 0)} onChange={(value) => setActive({ ...active, contentCompleteness: Number(value) || 0 })} />
                <TextareaField label="Draft Comments" value={active.draftComments} onChange={(value) => setActive({ ...active, draftComments: value })} rows={2} />
                <TextareaField label="Notes" value={active.notes} onChange={(value) => setActive({ ...active, notes: value })} rows={3} />
              </div>
            )}

            {activeSection === "Partner Mapping" && (
              <div className="space-y-2 rounded-lg border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0d315c]">Partner Mapping</h4>
                  <button onClick={addLink} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-700">Add Placeholder</button>
                </div>
                {activeLinks.length === 0 && <p className="text-xs text-slate-500">No partner links mapped.</p>}
                {activeLinks.map((link) => (
                  <div key={link.id} className="rounded-lg border border-slate-200 p-2 space-y-2">
                    <SelectField
                      label="Partner"
                      value={link.partnerId}
                      options={partners.map((partner) => ({ label: partner.name || partner.id, value: partner.id }))}
                      onChange={(value) => onUpdatePartnerLink({ ...link, partnerId: value })}
                    />
                    <Field label="CTA Label" value={link.ctaLabel} onChange={(value) => onUpdatePartnerLink({ ...link, ctaLabel: value })} />
                    <Field label="Redirect Link" value={link.redirectLink} onChange={(value) => onUpdatePartnerLink({ ...link, redirectLink: value })} />
                    <SelectField label="Redirect Type" value={link.redirectType} options={["internal", "external", "apply-page", "hidden"]} onChange={(value) => onUpdatePartnerLink({ ...link, redirectType: value as CoursePartnerLink["redirectType"] })} />
                    <BoolField label="Enabled" checked={link.enabled} onChange={(value) => onUpdatePartnerLink({ ...link, enabled: value })} />
                    {link.partnerId && (
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-2 text-xs text-slate-600">
                        <p><strong>Partner:</strong> {partnerById.get(link.partnerId)?.name || link.partnerId}</p>
                        <p><strong>Redirect:</strong> {link.redirectLink || partnerById.get(link.partnerId)?.redirectUrl || "-"}</p>
                        <p><strong>Logo:</strong> {partnerById.get(link.partnerId)?.logo || "Add logo in Partner Manager"}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                className="w-full rounded-xl bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wider text-white"
                onClick={() => {
                  const next = {
                    ...active,
                    slug: toSlug(active.slug || active.courseName || active.id),
                    primaryCtaLink: active.applyNowLink || active.primaryCtaLink,
                  };
                  onUpdateProgram(next);
                  setActive(null);
                }}
              >
                Save Program
              </button>
              <button
                disabled={!onDeleteProgram}
                className="w-full rounded-xl bg-rose-600 px-3 py-2 text-xs font-black uppercase tracking-wider text-white disabled:opacity-50"
                onClick={() => {
                  if (!onDeleteProgram) return;
                  const yes = window.confirm(`Delete program "${active.courseName || active.id}"?`);
                  if (!yes) return;
                  onDeleteProgram(active);
                  setActive(null);
                }}
              >
                Delete Program
              </button>
            </div>
          </div>
        )}
      </EditorDrawer>
    </>
  );
}
