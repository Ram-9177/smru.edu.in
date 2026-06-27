"use client";

import React, { useEffect, useMemo, useState } from "react";
import EditorDrawer from "@/components/developer/EditorDrawer";
import { BoolField, Field, SelectField, TextareaField } from "@/components/developer/Fields";
import { toSlug } from "@/lib/developer/slug";
import { Badge, toneByStatus, toneByVisibility } from "@/components/developer/ui";
import type { CoursePartnerLink, PageRoute, Partner, Program } from "@/types/developer";

type Props = {
  partners: Partner[];
  programs: Program[];
  partnerLinks: CoursePartnerLink[];
  onUpdatePartner: (partner: Partner) => void;
  onDeletePartner: (partner: Partner) => void;
  onUpdatePartnerLink: (link: CoursePartnerLink) => void;
  onUpsertRoute: (route: PageRoute) => void;
  focusEntityId?: string | null;
};

export default function PartnersManagerTab({
  partners,
  programs,
  partnerLinks,
  onUpdatePartner,
  onDeletePartner,
  onUpdatePartnerLink,
  onUpsertRoute,
  focusEntityId,
}: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Partner | null>(null);
  const [singleLink, setSingleLink] = useState("");

  const applySingleLink = (partner: Partner, rawValue: string): Partner => {
    const value = rawValue.trim();
    if (!value) return partner;

    if (value.startsWith("/")) {
      return {
        ...partner,
        redirectUrl: value,
      };
    }

    const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return {
      ...partner,
      iframeUrl: normalized,
      website: normalized,
      redirectUrl: partner.redirectUrl?.startsWith("/") ? partner.redirectUrl : "",
    };
  };

  useEffect(() => {
    if (!focusEntityId) return;
    const target = partners.find((partner) => partner.id === focusEntityId);
    if (target) setActive(target);
  }, [focusEntityId, partners]);

  useEffect(() => {
    if (!active) {
      setSingleLink("");
      return;
    }
    setSingleLink(active.iframeUrl || active.redirectUrl || active.website || "");
  }, [active?.id]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return partners.filter((partner) => !q || `${partner.name || ""} ${partner.slug || ""}`.toLowerCase().includes(q));
  }, [partners, query]);

  const assignedLinks = useMemo(() => partnerLinks.filter((link) => link.partnerId === active?.id), [partnerLinks, active?.id]);

  const addProgramMapping = () => {
    if (!active || programs.length === 0) return;
    onUpdatePartnerLink({
      id: `pl-${active.id}-${Date.now()}`,
      partnerId: active.id,
      programId: programs[0].id,
      ctaLabel: "Apply via Partner",
      redirectLink: active.redirectUrl || "",
      redirectType: active.redirectUrl?.startsWith("http") ? "external" : "internal",
      enabled: true,
      visibility: "draft",
      status: "in-progress",
    });
  };

  const addPartner = () => {
    const id = `partner-custom-${Date.now()}`;
    const partner: Partner = {
      id,
      name: "New Partner",
      slug: "",
      partnerType: "edutech",
      visibility: "draft",
      status: "in-progress",
      shortDescription: "",
      fullDescription: "",
      website: "",
      redirectUrl: "",
      iframeUrl: "",
      notes: "Created from Partner CMS",
    };
    onUpdatePartner(partner);
    setActive(partner);
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <input placeholder="Search partners..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
        <button onClick={addPartner} className="rounded-xl bg-[#0d315c] px-3 py-2 text-xs font-black uppercase tracking-wide text-white">
          Add Partner
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Partner</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Redirect</th>
              <th className="px-3 py-2">Visibility</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Toggle</th>
              <th className="px-3 py-2">Mapped Courses</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((partner) => (
              <tr key={partner.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50" onClick={() => setActive(partner)}>
                <td className="px-3 py-2 font-semibold text-[#0d315c]">{partner.name || "Untitled"}</td>
                <td className="px-3 py-2 text-xs">{partner.partnerType || "-"}</td>
                <td className="max-w-[220px] truncate px-3 py-2 text-xs" title={partner.redirectUrl || ""}>{partner.redirectUrl || "-"}</td>
                <td className="px-3 py-2"><Badge label={partner.visibility || "public"} tone={toneByVisibility(partner.visibility)} /></td>
                <td className="px-3 py-2"><Badge label={partner.status || "live"} tone={toneByStatus(partner.status)} /></td>
                <td className="px-3 py-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      const nextVisibility = partner.visibility === "public" ? "hidden" : "public";
                      onUpdatePartner({ ...partner, visibility: nextVisibility });
                    }}
                    className={`rounded-md px-2 py-1 text-[10px] font-black uppercase ${
                      partner.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {partner.visibility === "public" ? "On" : "Off"}
                  </button>
                </td>
                <td className="px-3 py-2 text-xs">{partnerLinks.filter((link) => link.partnerId === partner.id && link.enabled).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditorDrawer open={Boolean(active)} title={`Partner Manager: ${active?.name || active?.id || ""}`} onClose={() => setActive(null)}>
        {active && (
          <div className="space-y-3">
            <Field label="Partner Name" value={active.name} onChange={(value) => setActive({ ...active, name: value })} />
            <Field label="Slug" value={active.slug} onChange={(value) => setActive({ ...active, slug: value })} />
            <Field
              label="Portal Link (Paste Once)"
              value={singleLink}
              onChange={(value) => {
                setSingleLink(value);
                setActive(applySingleLink(active, value));
              }}
            />
            <Field label="Logo" value={active.logo} onChange={(value) => setActive({ ...active, logo: value })} />
            <Field label="Partner Type" value={active.partnerType} onChange={(value) => setActive({ ...active, partnerType: value })} />
            <TextareaField label="Short Description" value={active.shortDescription} onChange={(value) => setActive({ ...active, shortDescription: value })} rows={2} />
            <TextareaField label="Full Description" value={active.fullDescription} onChange={(value) => setActive({ ...active, fullDescription: value })} rows={3} />
            <Field label="Website" value={active.website} onChange={(value) => setActive({ ...active, website: value })} />
            <Field label="Iframe URL" value={active.iframeUrl} onChange={(value) => setActive({ ...active, iframeUrl: value })} />
            <Field label="Redirect URL" value={active.redirectUrl} onChange={(value) => setActive({ ...active, redirectUrl: value })} />
            <BoolField label="Open In New Tab" checked={active.openInNewTab} onChange={(value) => setActive({ ...active, openInNewTab: value })} />
            <SelectField label="Visibility" value={active.visibility} options={["public", "hidden", "draft", "internal"]} onChange={(value) => setActive({ ...active, visibility: value as Partner["visibility"] })} />
            <SelectField label="Status" value={active.status} options={["live", "in-progress", "coming-soon", "archived"]} onChange={(value) => setActive({ ...active, status: value as Partner["status"] })} />
            <TextareaField label="Notes" value={active.notes} onChange={(value) => setActive({ ...active, notes: value })} rows={2} />

            <div className="rounded-xl border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wide text-[#0d315c]">Course Mapping</h4>
                <button onClick={addProgramMapping} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-700">Add Mapping</button>
              </div>
              {assignedLinks.length === 0 && <p className="text-xs text-slate-500">No courses mapped yet.</p>}
              {assignedLinks.map((link) => (
                <div key={link.id} className="mb-2 rounded-lg border border-slate-200 p-2 space-y-2">
                  <SelectField label="Program" value={link.programId} options={programs.map((program) => program.id)} onChange={(value) => onUpdatePartnerLink({ ...link, programId: value })} />
                  <Field label="CTA Label" value={link.ctaLabel} onChange={(value) => onUpdatePartnerLink({ ...link, ctaLabel: value })} />
                  <Field label="Redirect URL" value={link.redirectLink} onChange={(value) => onUpdatePartnerLink({ ...link, redirectLink: value })} />
                  <SelectField label="Redirect Type" value={link.redirectType} options={["internal", "external", "apply-page", "hidden"]} onChange={(value) => onUpdatePartnerLink({ ...link, redirectType: value as CoursePartnerLink["redirectType"] })} />
                  <BoolField label="Enabled" checked={link.enabled} onChange={(value) => onUpdatePartnerLink({ ...link, enabled: value })} />
                </div>
              ))}
            </div>

            {!!(active.iframeUrl || active.redirectUrl || active.website) && (
              <div className="rounded-xl border border-slate-200 p-3">
                <h4 className="mb-2 text-xs font-black uppercase tracking-wide text-[#0d315c]">Iframe Preview</h4>
                <iframe
                  title="Partner preview"
                  src={active.iframeUrl || active.redirectUrl || active.website}
                  className="h-56 w-full rounded-lg border border-slate-200"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                className="w-full rounded-xl bg-[#019e6e] px-3 py-2 text-xs font-black uppercase tracking-wider text-white"
                onClick={() => {
                  const normalizedSlug = toSlug(active.slug || active.name || "");
                  const prepped = applySingleLink(active, singleLink);
                  const nextPartner = { ...prepped, slug: normalizedSlug };
                  onUpdatePartner(nextPartner);

                  if (normalizedSlug) {
                    onUpsertRoute({
                      id: `route-partner-${normalizedSlug}`,
                      title: `${nextPartner.name || normalizedSlug} Partner Page`,
                      url: `/partner/${normalizedSlug}`,
                      slug: normalizedSlug,
                      pageType: "partner",
                      routeGroup: "partner",
                      visibility: nextPartner.visibility || "draft",
                      status: nextPartner.status || "in-progress",
                      inNavbar: false,
                      inFooter: false,
                      indexable: false,
                      pageExists: true,
                      notes: "Partner-managed route entry. Public page can use standard nav/footer shell.",
                    });
                  }

                  setActive(null);
                }}
              >
                Save Partner
              </button>

              <button
                className="w-full rounded-xl bg-rose-600 px-3 py-2 text-xs font-black uppercase tracking-wider text-white"
                onClick={() => {
                  if (!active) return;
                  const yes = window.confirm(`Delete partner "${active.name || active.id}"?`);
                  if (!yes) return;
                  onDeletePartner(active);
                  setActive(null);
                }}
              >
                Delete Partner
              </button>
            </div>
          </div>
        )}
      </EditorDrawer>
    </>
  );
}
