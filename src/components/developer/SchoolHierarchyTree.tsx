"use client";

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/developer/ui";
import type { Department, Program, School } from "@/types/developer";

type Props = {
  schools: School[];
  departments: Department[];
  programs: Program[];
  onOpenEntity: (type: "school" | "department" | "program", id: string) => void;
};

export default function SchoolHierarchyTree({ schools, departments, programs, onOpenEntity }: Props) {
  const [query, setQuery] = useState("");

  const departmentsBySchool = useMemo(() => {
    const map = new Map<string, Department[]>();
    schools.forEach((school) => map.set(school.id, []));
    departments.forEach((department) => {
      if (!map.has(department.schoolId)) map.set(department.schoolId, []);
      map.get(department.schoolId)!.push(department);
    });
    return map;
  }, [schools, departments]);

  const programsByDepartment = useMemo(() => {
    const map = new Map<string, Program[]>();
    departments.forEach((department) => map.set(department.id, []));
    programs.forEach((program) => {
      if (!map.has(program.departmentId)) map.set(program.departmentId, []);
      map.get(program.departmentId)!.push(program);
    });
    return map;
  }, [departments, programs]);

  const filteredSchools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return schools;
    return schools.filter((school) => {
      const schoolText = `${school.name || ""} ${school.slug || ""}`.toLowerCase();
      if (schoolText.includes(q)) return true;
      const schoolDepartments = departmentsBySchool.get(school.id) || [];
      return schoolDepartments.some((department) => {
        const departmentText = `${department.name || ""} ${department.slug || ""}`.toLowerCase();
        if (departmentText.includes(q)) return true;
        const departmentPrograms = programsByDepartment.get(department.id) || [];
        return departmentPrograms.some((program) => `${program.courseName || ""} ${program.slug || ""}`.toLowerCase().includes(q));
      });
    });
  }, [schools, query, departmentsBySchool, programsByDepartment]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#0d315c]">Hierarchy Chain</h3>
          <p className="text-xs text-slate-500">School → Department → Program mapping tree</p>
        </div>
        <Badge label={`${schools.length} schools`} tone="blue" />
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search school / department / program"
        className="mb-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
      />

      <div className="max-h-[520px] overflow-auto rounded-xl border border-slate-200 bg-slate-50/40 p-2">
        {filteredSchools.map((school) => {
          const schoolDepartments = departmentsBySchool.get(school.id) || [];
          return (
            <details key={school.id} className="mb-2 rounded-lg border border-slate-200 bg-white p-2" open>
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-[#0d315c]">{school.name || school.id}</p>
                    <p className="text-[11px] text-slate-500">/{school.slug || "no-slug"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge label={`${schoolDepartments.length} depts`} tone="green" />
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        onOpenEntity("school", school.id);
                      }}
                      className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-700"
                    >
                      Edit School
                    </button>
                  </div>
                </div>
              </summary>

              <div className="mt-2 space-y-2 pl-3">
                {schoolDepartments.length === 0 && <p className="text-xs text-slate-500">No departments mapped.</p>}
                {schoolDepartments.map((department) => {
                  const departmentPrograms = programsByDepartment.get(department.id) || [];
                  return (
                    <details key={department.id} className="rounded-lg border border-slate-200 bg-slate-50 p-2" open>
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">{department.name || department.id}</p>
                            <p className="text-[11px] text-slate-500">/{department.slug || "no-slug"}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge label={`${departmentPrograms.length} programs`} tone="amber" />
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                onOpenEntity("department", department.id);
                              }}
                              className="rounded-md bg-white px-2 py-1 text-[10px] font-black uppercase text-slate-700 border border-slate-200"
                            >
                              Edit Dept
                            </button>
                          </div>
                        </div>
                      </summary>

                      <div className="mt-2 space-y-1 pl-3">
                        {departmentPrograms.length === 0 && <p className="text-xs text-slate-500">No programs mapped.</p>}
                        {departmentPrograms.map((program) => (
                          <div key={program.id} className="flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5">
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-slate-800">{program.courseName || program.id}</p>
                              <p className="text-[10px] text-slate-500">/{program.slug || "no-slug"}</p>
                            </div>
                            <button
                              onClick={() => onOpenEntity("program", program.id)}
                              className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-700"
                            >
                              Edit Program
                            </button>
                          </div>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
