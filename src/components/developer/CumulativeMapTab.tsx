"use client";

import React, { useMemo, useState } from "react";
import { Field, SelectField, TextareaField } from "@/components/developer/Fields";
import { Badge } from "@/components/developer/ui";
import { toSlug } from "@/lib/developer/slug";
import type { Department, Program, School } from "@/types/developer";

type Props = {
  schools: School[];
  departments: Department[];
  programs: Program[];
  onOpenEntity: (type: "school" | "department" | "program", id: string) => void;
  onUpdateSchool: (school: School) => void;
  onUpdateDepartment: (department: Department) => void;
  onUpdateProgram: (program: Program) => void;
};

type ActiveNode = { type: "school" | "department" | "program"; id: string } | null;

export default function CumulativeMapTab({
  schools,
  departments,
  programs,
  onOpenEntity,
  onUpdateSchool,
  onUpdateDepartment,
  onUpdateProgram,
}: Props) {
  const [schoolId, setSchoolId] = useState(schools[0]?.id || "");
  const [departmentId, setDepartmentId] = useState("");
  const [activeNode, setActiveNode] = useState<ActiveNode>(null);

  const selectedSchool = useMemo(() => schools.find((school) => school.id === schoolId) || schools[0] || null, [schools, schoolId]);

  const schoolDepartments = useMemo(
    () => departments.filter((department) => department.schoolId === selectedSchool?.id),
    [departments, selectedSchool?.id]
  );

  const selectedDepartment = useMemo(() => {
    if (departmentId) return schoolDepartments.find((department) => department.id === departmentId) || null;
    return schoolDepartments[0] || null;
  }, [schoolDepartments, departmentId]);

  const departmentPrograms = useMemo(
    () => programs.filter((program) => program.departmentId === selectedDepartment?.id),
    [programs, selectedDepartment?.id]
  );

  const editingSchool = useMemo(
    () => (activeNode?.type === "school" ? schools.find((item) => item.id === activeNode.id) || null : null),
    [activeNode, schools]
  );
  const editingDepartment = useMemo(
    () => (activeNode?.type === "department" ? departments.find((item) => item.id === activeNode.id) || null : null),
    [activeNode, departments]
  );
  const editingProgram = useMemo(
    () => (activeNode?.type === "program" ? programs.find((item) => item.id === activeNode.id) || null : null),
    [activeNode, programs]
  );

  const [draftSchool, setDraftSchool] = useState<School | null>(null);
  const [draftDepartment, setDraftDepartment] = useState<Department | null>(null);
  const [draftProgram, setDraftProgram] = useState<Program | null>(null);

  React.useEffect(() => setDraftSchool(editingSchool), [editingSchool]);
  React.useEffect(() => setDraftDepartment(editingDepartment), [editingDepartment]);
  React.useEffect(() => setDraftProgram(editingProgram), [editingProgram]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#0d315c]">Cumulative Mind Map</h3>
        <p className="mt-1 text-xs text-slate-500">School → Department → Program with direct edit privileges.</p>
        <div className="mt-3 flex items-center gap-2">
          <Badge label={`${schools.length} schools`} tone="blue" />
          <Badge label={`${departments.length} departments`} tone="green" />
          <Badge label={`${programs.length} programs`} tone="amber" />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-3">
          <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-slate-500">Schools</p>
          <div className="space-y-2 max-h-[500px] overflow-auto">
            {schools.map((school) => (
              <button
                key={school.id}
                onClick={() => {
                  setSchoolId(school.id);
                  setDepartmentId("");
                  setActiveNode({ type: "school", id: school.id });
                }}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${selectedSchool?.id === school.id ? "border-[#0d315c] bg-[#0d315c] text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}
              >
                <p className="font-bold">{school.name || school.id}</p>
                <p className={`text-[11px] ${selectedSchool?.id === school.id ? "text-white/70" : "text-slate-500"}`}>/{school.slug || "no-slug"}</p>
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center text-2xl font-black text-slate-300">→</div>

        <section className="rounded-2xl border border-slate-200 bg-white p-3">
          <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-slate-500">Departments</p>
          <div className="space-y-2 max-h-[500px] overflow-auto">
            {schoolDepartments.length === 0 && <p className="text-xs text-slate-500">No departments in this school.</p>}
            {schoolDepartments.map((department) => (
              <button
                key={department.id}
                onClick={() => {
                  setDepartmentId(department.id);
                  setActiveNode({ type: "department", id: department.id });
                }}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${selectedDepartment?.id === department.id ? "border-[#019e6e] bg-[#019e6e] text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}
              >
                <p className="font-bold">{department.name || department.id}</p>
                <p className={`text-[11px] ${selectedDepartment?.id === department.id ? "text-white/70" : "text-slate-500"}`}>/{department.slug || "no-slug"}</p>
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center text-2xl font-black text-slate-300">→</div>

        <section className="rounded-2xl border border-slate-200 bg-white p-3">
          <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-slate-500">Programs / Courses</p>
          <div className="space-y-2 max-h-[500px] overflow-auto">
            {departmentPrograms.length === 0 && <p className="text-xs text-slate-500">No programs in this department.</p>}
            {departmentPrograms.map((program) => (
              <button
                key={program.id}
                onClick={() => setActiveNode({ type: "program", id: program.id })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 hover:border-[#0d315c] hover:bg-white"
              >
                <p className="font-bold">{program.courseName || program.id}</p>
                <p className="text-[11px] text-slate-500">/{program.slug || "no-slug"}</p>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-black uppercase tracking-[0.12em] text-[#0d315c]">Mind Map Editor</h4>
          {activeNode && (
            <button
              onClick={() => onOpenEntity(activeNode.type, activeNode.id)}
              className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-700"
            >
              Open Full Editor
            </button>
          )}
        </div>

        {!activeNode && <p className="text-sm text-slate-500">Select any School/Department/Program node to edit here directly.</p>}

        {draftSchool && activeNode?.type === "school" && (
          <div className="space-y-3">
            <Field label="School Name" value={draftSchool.name} onChange={(value) => setDraftSchool({ ...draftSchool, name: value })} />
            <Field label="Slug" value={draftSchool.slug} onChange={(value) => setDraftSchool({ ...draftSchool, slug: value })} />
            <button
              className={`rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wide ${
                draftSchool.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
              }`}
              onClick={() => setDraftSchool({ ...draftSchool, visibility: draftSchool.visibility === "public" ? "hidden" : "public" })}
            >
              Visibility: {draftSchool.visibility === "public" ? "On" : "Off"}
            </button>
            <TextareaField label="Overview" value={draftSchool.overview} onChange={(value) => setDraftSchool({ ...draftSchool, overview: value })} rows={3} />
            <Field label="CTA Link" value={draftSchool.ctaLink} onChange={(value) => setDraftSchool({ ...draftSchool, ctaLink: value })} />
            <button
              className="rounded-lg bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wide text-white"
              onClick={() => onUpdateSchool({ ...draftSchool, slug: toSlug(draftSchool.slug || draftSchool.name || draftSchool.id) })}
            >
              Save School (Mind Map)
            </button>
          </div>
        )}

        {draftDepartment && activeNode?.type === "department" && (
          <div className="space-y-3">
            <Field label="Department Name" value={draftDepartment.name} onChange={(value) => setDraftDepartment({ ...draftDepartment, name: value })} />
            <Field label="Slug" value={draftDepartment.slug} onChange={(value) => setDraftDepartment({ ...draftDepartment, slug: value })} />
            <button
              className={`rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wide ${
                draftDepartment.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
              }`}
              onClick={() => setDraftDepartment({ ...draftDepartment, visibility: draftDepartment.visibility === "public" ? "hidden" : "public" })}
            >
              Visibility: {draftDepartment.visibility === "public" ? "On" : "Off"}
            </button>
            <SelectField
              label="Parent School"
              value={draftDepartment.schoolId}
              options={schools.map((school) => ({ label: school.name || school.id, value: school.id }))}
              onChange={(value) => setDraftDepartment({ ...draftDepartment, schoolId: value })}
            />
            <TextareaField label="Description" value={draftDepartment.fullDescription} onChange={(value) => setDraftDepartment({ ...draftDepartment, fullDescription: value })} rows={3} />
            <button
              className="rounded-lg bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wide text-white"
              onClick={() => onUpdateDepartment({ ...draftDepartment, slug: toSlug(draftDepartment.slug || draftDepartment.name || draftDepartment.id) })}
            >
              Save Department (Mind Map)
            </button>
          </div>
        )}

        {draftProgram && activeNode?.type === "program" && (
          <div className="space-y-3">
            <Field label="Program Name" value={draftProgram.courseName} onChange={(value) => setDraftProgram({ ...draftProgram, courseName: value })} />
            <Field label="Slug" value={draftProgram.slug} onChange={(value) => setDraftProgram({ ...draftProgram, slug: value })} />
            <button
              className={`rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wide ${
                draftProgram.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
              }`}
              onClick={() => setDraftProgram({ ...draftProgram, visibility: draftProgram.visibility === "public" ? "hidden" : "public" })}
            >
              Visibility: {draftProgram.visibility === "public" ? "On" : "Off"}
            </button>
            <SelectField
              label="School"
              value={draftProgram.schoolId}
              options={schools.map((school) => ({ label: school.name || school.id, value: school.id }))}
              onChange={(value) => {
                const dept = departments.find((item) => item.schoolId === value);
                setDraftProgram({ ...draftProgram, schoolId: value, departmentId: dept?.id || draftProgram.departmentId });
              }}
            />
            <SelectField
              label="Department"
              value={draftProgram.departmentId}
              options={departments
                .filter((department) => department.schoolId === draftProgram.schoolId)
                .map((department) => ({ label: department.name || department.id, value: department.id }))}
              onChange={(value) => setDraftProgram({ ...draftProgram, departmentId: value })}
            />
            <Field label="Apply Now Redirect" value={draftProgram.applyNowLink} onChange={(value) => setDraftProgram({ ...draftProgram, applyNowLink: value })} />
            <TextareaField label="Overview" value={draftProgram.fullOverview} onChange={(value) => setDraftProgram({ ...draftProgram, fullOverview: value })} rows={3} />
            <button
              className="rounded-lg bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wide text-white"
              onClick={() => onUpdateProgram({ ...draftProgram, slug: toSlug(draftProgram.slug || draftProgram.courseName || draftProgram.id) })}
            >
              Save Program (Mind Map)
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
