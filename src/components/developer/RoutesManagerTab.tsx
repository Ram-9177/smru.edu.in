"use client";

import React, { useEffect, useMemo, useState } from "react";
import EditorDrawer from "@/components/developer/EditorDrawer";
import { BoolField, Field, SelectField, TextareaField } from "@/components/developer/Fields";
import { toSlug } from "@/lib/developer/slug";
import { Badge, toneByStatus, toneByVisibility } from "@/components/developer/ui";
import type { PageRoute } from "@/types/developer";

type Props = {
  routes: PageRoute[];
  onUpdate: (route: PageRoute) => void;
  focusEntityId?: string | null;
};

const routeGroups = ["public", "hidden", "draft", "internal", "compliance", "partner", "redirects"];
const visibilityFilters = ["all", "public", "hidden", "draft", "internal"];

export default function RoutesManagerTab({ routes, onUpdate, focusEntityId }: Props) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [visibility, setVisibility] = useState("all");
  const [active, setActive] = useState<PageRoute | null>(null);

  useEffect(() => {
    if (!focusEntityId) return;
    const target = routes.find((route) => route.id === focusEntityId);
    if (target) setActive(target);
  }, [focusEntityId, routes]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return routes.filter((route) => {
      const matchesQ = !q || `${route.title || ""} ${route.url}`.toLowerCase().includes(q);
      const matchesG = group === "all" || route.routeGroup === group;
      const matchesV = visibility === "all" || route.visibility === visibility;
      return matchesQ && matchesG && matchesV;
    });
  }, [routes, query, group, visibility]);

  return (
    <>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <input
          placeholder="Search title or URL..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="col-span-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm md:col-span-1"
        />
        <select value={group} onChange={(e) => setGroup(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="all">All Route Groups</option>
          {routeGroups.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1 overflow-auto rounded-xl border border-slate-200 bg-white p-1">
          {visibilityFilters.map((item) => (
            <button
              key={item}
              onClick={() => setVisibility(item)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-black uppercase tracking-wide ${
                visibility === item ? "bg-[#0d315c] text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">URL</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Visibility</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Toggle</th>
              <th className="px-3 py-2">Nav/Footer</th>
              <th className="px-3 py-2">Index</th>
              <th className="px-3 py-2">Redirect</th>
              <th className="px-3 py-2">Exists</th>
              <th className="px-3 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((route) => (
              <tr key={route.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50" onClick={() => setActive(route)}>
                <td className="px-3 py-2 font-semibold text-[#0d315c]">{route.title || "Untitled"}</td>
                <td className="px-3 py-2 text-slate-700">{route.url}</td>
                <td className="px-3 py-2">{route.pageType || "page"}</td>
                <td className="px-3 py-2"><Badge label={route.visibility || "public"} tone={toneByVisibility(route.visibility)} /></td>
                <td className="px-3 py-2"><Badge label={route.status || "live"} tone={toneByStatus(route.status)} /></td>
                <td className="px-3 py-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      const nextVisibility = route.visibility === "public" ? "hidden" : "public";
                      onUpdate({ ...route, visibility: nextVisibility });
                    }}
                    className={`rounded-md px-2 py-1 text-[10px] font-black uppercase ${
                      route.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {route.visibility === "public" ? "On" : "Off"}
                  </button>
                </td>
                <td className="px-3 py-2 text-xs">{route.inNavbar ? "Nav" : "-"} / {route.inFooter ? "Footer" : "-"}</td>
                <td className="px-3 py-2 text-xs">{route.indexable ? "Yes" : "No"}</td>
                <td className="max-w-[160px] truncate px-3 py-2 text-xs" title={route.redirectTarget || ""}>{route.redirectTarget || "-"}</td>
                <td className="px-3 py-2 text-xs">{route.pageExists ? "Yes" : "No"}</td>
                <td className="max-w-[180px] truncate px-3 py-2 text-xs" title={route.notes || ""}>{route.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditorDrawer open={Boolean(active)} title={`Route Editor: ${active?.title || active?.url || ""}`} onClose={() => setActive(null)}>
        {active && (
          <div className="space-y-3">
            <Field label="Title" value={active.title} onChange={(value) => setActive({ ...active, title: value })} />
            <Field label="Route URL" value={active.url} onChange={(value) => setActive({ ...active, url: value })} />
            <SelectField label="Page Type" value={active.pageType} options={["page", "school", "department", "program", "partner", "system", "redirect"]} onChange={(value) => setActive({ ...active, pageType: value as PageRoute["pageType"] })} />
            <SelectField label="Route Group" value={active.routeGroup} options={routeGroups} onChange={(value) => setActive({ ...active, routeGroup: value as PageRoute["routeGroup"] })} />
            <SelectField label="Visibility" value={active.visibility} options={["public", "hidden", "draft", "internal"]} onChange={(value) => setActive({ ...active, visibility: value as PageRoute["visibility"] })} />
            <SelectField label="Status" value={active.status} options={["live", "in-progress", "coming-soon", "archived"]} onChange={(value) => setActive({ ...active, status: value as PageRoute["status"] })} />
            <BoolField label="In Navbar" checked={active.inNavbar} onChange={(value) => setActive({ ...active, inNavbar: value })} />
            <BoolField label="In Footer" checked={active.inFooter} onChange={(value) => setActive({ ...active, inFooter: value })} />
            <BoolField label="Indexable" checked={active.indexable} onChange={(value) => setActive({ ...active, indexable: value })} />
            <BoolField label="Page Exists" checked={active.pageExists} onChange={(value) => setActive({ ...active, pageExists: value })} />
            <Field label="Redirect Target" value={active.redirectTarget} onChange={(value) => setActive({ ...active, redirectTarget: value })} />
            <SelectField label="Redirect Type" value={active.redirectType} options={["internal", "external", "apply-page", "hidden"]} onChange={(value) => setActive({ ...active, redirectType: value as PageRoute["redirectType"] })} />
            <TextareaField label="Notes" value={active.notes} onChange={(value) => setActive({ ...active, notes: value })} rows={3} />
            <button
              className="w-full rounded-xl bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wider text-white"
              onClick={() => {
                const urlDerived = active.url.replace(/^\//, "").split("/").pop() || "";
                const normalizedSlug = toSlug(active.slug || active.title || urlDerived || active.id);
                onUpdate({ ...active, slug: normalizedSlug });
                setActive(null);
              }}
            >
              Save Route
            </button>
          </div>
        )}
      </EditorDrawer>
    </>
  );
}
