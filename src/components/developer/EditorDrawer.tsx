"use client";

import React from "react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function EditorDrawer({ open, title, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2500]">
      <button className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close editor" />
      <aside className="absolute right-0 top-0 h-full w-[520px] max-w-[95vw] overflow-y-auto bg-white shadow-2xl border-l border-slate-200">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0d315c]">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
        <div className="p-5 space-y-4">{children}</div>
      </aside>
    </div>
  );
}
