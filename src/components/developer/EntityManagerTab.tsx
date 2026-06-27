"use client";

import React, { useEffect, useMemo, useState } from "react";
import EditorDrawer from "@/components/developer/EditorDrawer";
import { Field, SelectField, TextareaField } from "@/components/developer/Fields";
import { toSlug } from "@/lib/developer/slug";
import { Badge, toneByStatus, toneByVisibility } from "@/components/developer/ui";

type EntityRecord = {
  id: string;
  name?: string;
  slug?: string;
  visibility?: string;
  status?: string;
  notes?: string;
  [key: string]: unknown;
};

type Props<T extends EntityRecord> = {
  title: string;
  entities: T[];
  onUpdate: (entity: T) => void;
  onDelete?: (entity: T) => void;
  primaryFields: Array<{
    key: keyof T;
    label: string;
    type?: "text" | "textarea" | "select";
    options?: Array<{ label: string; value: string }>;
  }>;
  focusEntityId?: string | null;
};

export default function EntityManagerTab<T extends EntityRecord>({ title, entities, onUpdate, onDelete, primaryFields, focusEntityId }: Props<T>) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<T | null>(null);

  useEffect(() => {
    if (!focusEntityId) return;
    const target = entities.find((entity) => entity.id === focusEntityId);
    if (target) setActive(target);
  }, [focusEntityId, entities]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return entities.filter((entity) => !q || `${entity.name || ""} ${entity.slug || ""} ${entity.id}`.toLowerCase().includes(q));
  }, [entities, query]);

  return (
    <>
      <div className="mb-4">
        <input
          placeholder={`Search ${title.toLowerCase()}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Visibility</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Toggle</th>
              <th className="px-3 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entity) => (
              <tr key={entity.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50" onClick={() => setActive(entity)}>
                <td className="px-3 py-2 font-semibold text-[#0d315c]">{entity.name || "Untitled"}</td>
                <td className="px-3 py-2">{entity.slug || "-"}</td>
                <td className="px-3 py-2"><Badge label={entity.visibility || "public"} tone={toneByVisibility(entity.visibility)} /></td>
                <td className="px-3 py-2"><Badge label={entity.status || "live"} tone={toneByStatus(entity.status)} /></td>
                <td className="px-3 py-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      const nextVisibility = entity.visibility === "public" ? "hidden" : "public";
                      onUpdate({ ...entity, visibility: nextVisibility } as T);
                    }}
                    className={`rounded-md px-2 py-1 text-[10px] font-black uppercase ${
                      entity.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {entity.visibility === "public" ? "On" : "Off"}
                  </button>
                </td>
                <td className="max-w-[220px] truncate px-3 py-2 text-xs" title={(entity.notes as string) || ""}>{(entity.notes as string) || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditorDrawer open={Boolean(active)} title={`${title} Editor: ${active?.name || active?.id || ""}`} onClose={() => setActive(null)}>
        {active && (
          <div className="space-y-3">
            {primaryFields.map((field) => {
              if (field.type === "textarea") {
                return (
                  <TextareaField
                    key={String(field.key)}
                    label={field.label}
                    value={(active[field.key] as string) || ""}
                    onChange={(value) => setActive({ ...active, [field.key]: value })}
                    rows={4}
                  />
                );
              }

              if (field.type === "select") {
                return (
                  <SelectField
                    key={String(field.key)}
                    label={field.label}
                    value={(active[field.key] as string) || ""}
                    options={field.options || []}
                    onChange={(value) => setActive({ ...active, [field.key]: value })}
                  />
                );
              }

              return (
                <Field
                  key={String(field.key)}
                  label={field.label}
                  value={(active[field.key] as string) || ""}
                  onChange={(value) => setActive({ ...active, [field.key]: value })}
                />
              );
            })}
            <SelectField label="Visibility" value={(active.visibility as string) || "public"} options={["public", "hidden", "draft", "internal"]} onChange={(value) => setActive({ ...active, visibility: value })} />
            <SelectField label="Status" value={(active.status as string) || "live"} options={["live", "in-progress", "coming-soon", "archived"]} onChange={(value) => setActive({ ...active, status: value })} />
            <TextareaField label="Notes" value={(active.notes as string) || ""} onChange={(value) => setActive({ ...active, notes: value })} rows={3} />
            <div className="grid grid-cols-2 gap-2">
              <button
                className="w-full rounded-xl bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wider text-white"
                onClick={() => {
                  const next = { ...active };
                  const fallback = (next.name as string) || next.id;
                  const normalized = toSlug((next.slug as string) || fallback);
                  if (normalized) next.slug = normalized;
                  onUpdate(next);
                  setActive(null);
                }}
              >
                Save {title}
              </button>
              <button
                disabled={!onDelete}
                className="w-full rounded-xl bg-rose-600 px-3 py-2 text-xs font-black uppercase tracking-wider text-white disabled:opacity-50"
                onClick={() => {
                  if (!onDelete) return;
                  const yes = window.confirm(`Delete ${title.toLowerCase()} "${active.name || active.id}"?`);
                  if (!yes) return;
                  onDelete(active);
                  setActive(null);
                }}
              >
                Delete {title}
              </button>
            </div>
          </div>
        )}
      </EditorDrawer>
    </>
  );
}
