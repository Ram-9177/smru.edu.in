"use client";

import React, { useEffect, useMemo, useState } from "react";
import EditorDrawer from "@/components/developer/EditorDrawer";
import { Field, SelectField, TextareaField } from "@/components/developer/Fields";
import { Badge, toneByStatus, toneByVisibility } from "@/components/developer/ui";
import { toSlug } from "@/lib/developer/slug";
import type { CourseCode } from "@/types/developer";

type Props = {
  courseCodes: CourseCode[];
  onUpdate: (courseCode: CourseCode) => void;
  onDelete?: (courseCode: CourseCode) => void;
  focusEntityId?: string | null;
};

const visibilityOptions = ["public", "hidden", "draft", "internal"];
const statusOptions = ["live", "in-progress", "coming-soon", "archived"];

const unique = (values: Array<string | undefined>) =>
  Array.from(new Set(values.map((value) => value || "").filter(Boolean))).sort((a, b) => a.localeCompare(b));

export default function CourseCodesManagerTab({ courseCodes, onUpdate, onDelete, focusEntityId }: Props) {
  const [query, setQuery] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [trackFilter, setTrackFilter] = useState("all");
  const [active, setActive] = useState<CourseCode | null>(null);

  const schoolOptions = useMemo(() => unique(courseCodes.map((item) => item.schoolName)), [courseCodes]);
  const levelOptions = useMemo(() => unique(courseCodes.map((item) => item.level)), [courseCodes]);
  const trackOptions = useMemo(() => unique(courseCodes.map((item) => item.track)), [courseCodes]);

  useEffect(() => {
    if (!focusEntityId) return;
    const target = courseCodes.find((item) => item.id === focusEntityId);
    if (target) setActive(target);
  }, [courseCodes, focusEntityId]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return courseCodes.filter((item) => {
      const haystack = [
        item.serialNo,
        item.schoolCode,
        item.schoolName,
        item.departmentCode,
        item.departmentName,
        item.levelCode,
        item.level,
        item.courseCodeWithTrack,
        item.courseName,
        item.track,
        item.fullCode,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQ = !q || haystack.includes(q);
      const matchesSchool = schoolFilter === "all" || item.schoolName === schoolFilter;
      const matchesLevel = levelFilter === "all" || item.level === levelFilter;
      const matchesTrack = trackFilter === "all" || item.track === trackFilter;
      return matchesQ && matchesSchool && matchesLevel && matchesTrack;
    });
  }, [courseCodes, levelFilter, query, schoolFilter, trackFilter]);

  const addCourseCode = () => {
    const nextSerial =
      Math.max(0, ...courseCodes.map((item) => Number(item.serialNo || 0)).filter((value) => Number.isFinite(value))) + 1;
    setActive({
      id: `course-code-new-${Date.now()}`,
      serialNo: String(nextSerial),
      visibility: "draft",
      status: "in-progress",
      notes: "New course code added from Developer CMS",
    });
  };

  const saveActive = () => {
    if (!active) return;
    const slugSource = active.slug || `${active.fullCode || active.courseCodeWithTrack || active.serialNo || active.id}-${active.courseName || ""}`;
    onUpdate({
      ...active,
      slug: toSlug(slugSource),
    });
    setActive(null);
  };

  return (
    <>
      <div className="mb-4 grid gap-2 lg:grid-cols-[1.3fr_1fr_0.7fr_0.8fr_auto]">
        <input
          placeholder="Search course codes..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
        />
        <select value={schoolFilter} onChange={(event) => setSchoolFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="all">All Schools</option>
          {schoolOptions.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </select>
        <select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="all">All Levels</option>
          {levelOptions.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select value={trackFilter} onChange={(event) => setTrackFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="all">All Tracks</option>
          {trackOptions.map((track) => (
            <option key={track} value={track}>
              {track}
            </option>
          ))}
        </select>
        <button onClick={addCourseCode} className="rounded-xl bg-[#019e6e] px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
          Add Course Code
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Full Code</th>
              <th className="px-3 py-2">Course</th>
              <th className="px-3 py-2">School</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Level</th>
              <th className="px-3 py-2">Track</th>
              <th className="px-3 py-2">Years</th>
              <th className="px-3 py-2">Semesters</th>
              <th className="px-3 py-2">Visibility</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50" onClick={() => setActive(item)}>
                <td className="px-3 py-2 font-black text-[#0d315c]">{item.fullCode || "-"}</td>
                <td className="px-3 py-2 font-semibold text-slate-800">{item.courseName || "Untitled"}</td>
                <td className="px-3 py-2 text-xs text-slate-600">{item.schoolName || "-"}</td>
                <td className="px-3 py-2 text-xs text-slate-600">{item.departmentName || "-"}</td>
                <td className="px-3 py-2 text-xs">{item.level || "-"}</td>
                <td className="px-3 py-2 text-xs">{item.track || "-"}</td>
                <td className="px-3 py-2 text-xs">{item.years || "-"}</td>
                <td className="px-3 py-2 text-xs">{item.semesters || "-"}</td>
                <td className="px-3 py-2">
                  <Badge label={item.visibility || "public"} tone={toneByVisibility(item.visibility)} />
                </td>
                <td className="px-3 py-2">
                  <Badge label={item.status || "live"} tone={toneByStatus(item.status)} />
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      onUpdate({ ...item, visibility: item.visibility === "public" ? "hidden" : "public" });
                    }}
                    className={`rounded-md px-2 py-1 text-[10px] font-black uppercase ${
                      item.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {item.visibility === "public" ? "On" : "Off"}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="px-3 py-8 text-center text-sm font-semibold text-slate-500" colSpan={11}>
                  No course codes match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditorDrawer open={Boolean(active)} title={`Course Code: ${active?.fullCode || active?.courseName || active?.id || ""}`} onClose={() => setActive(null)}>
        {active && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="S.No" value={active.serialNo} onChange={(value) => setActive({ ...active, serialNo: value })} />
              <Field label="Slug" value={active.slug} onChange={(value) => setActive({ ...active, slug: value })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="S Code" value={active.schoolCode} onChange={(value) => setActive({ ...active, schoolCode: value })} />
              <Field label="D Code" value={active.departmentCode} onChange={(value) => setActive({ ...active, departmentCode: value })} />
            </div>

            <Field label="School Name" value={active.schoolName} onChange={(value) => setActive({ ...active, schoolName: value })} />
            <Field label="Department Name" value={active.departmentName} onChange={(value) => setActive({ ...active, departmentName: value })} />

            <div className="grid grid-cols-2 gap-3">
              <Field label="L Code" value={active.levelCode} onChange={(value) => setActive({ ...active, levelCode: value })} />
              <Field label="Level" value={active.level} onChange={(value) => setActive({ ...active, level: value })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="C Code With Track" value={active.courseCodeWithTrack} onChange={(value) => setActive({ ...active, courseCodeWithTrack: value })} />
              <Field label="Full Code" value={active.fullCode} onChange={(value) => setActive({ ...active, fullCode: value })} />
            </div>

            <Field label="Course Name" value={active.courseName} onChange={(value) => setActive({ ...active, courseName: value })} />

            <div className="grid grid-cols-3 gap-3">
              <Field label="Track" value={active.track} onChange={(value) => setActive({ ...active, track: value })} />
              <Field label="Years" value={active.years} onChange={(value) => setActive({ ...active, years: value })} />
              <Field label="Semesters" value={active.semesters} onChange={(value) => setActive({ ...active, semesters: value })} />
            </div>

            <SelectField label="Visibility" value={active.visibility} options={visibilityOptions} onChange={(value) => setActive({ ...active, visibility: value as CourseCode["visibility"] })} />
            <SelectField label="Status" value={active.status} options={statusOptions} onChange={(value) => setActive({ ...active, status: value as CourseCode["status"] })} />
            <TextareaField label="Notes" value={active.notes} onChange={(value) => setActive({ ...active, notes: value })} rows={3} />

            <div className="grid grid-cols-2 gap-2">
              <button className="w-full rounded-xl bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wider text-white" onClick={saveActive}>
                Save Course Code
              </button>
              <button
                disabled={!onDelete}
                className="w-full rounded-xl bg-rose-600 px-3 py-2 text-xs font-black uppercase tracking-wider text-white disabled:opacity-50"
                onClick={() => {
                  if (!active || !onDelete) return;
                  const yes = window.confirm(`Delete course code "${active.fullCode || active.courseName || active.id}"?`);
                  if (!yes) return;
                  onDelete(active);
                  setActive(null);
                }}
              >
                Delete Course Code
              </button>
            </div>
          </div>
        )}
      </EditorDrawer>
    </>
  );
}
