import type { CompliancePage } from "../../data/compliance-pages";

export default function DisclosureStatusTable({ pages }: { pages: CompliancePage[] }) {
  return (
    <div className="overflow-x-auto border border-slate-200 bg-white">
      <table className="w-full min-w-[1100px] text-left text-sm">
        <thead className="bg-[#0d315c] text-white">
          <tr>
            <th className="px-5 py-4 font-black uppercase tracking-widest">Disclosure</th>
            <th className="px-5 py-4 font-black uppercase tracking-widest">Status</th>
            <th className="px-5 py-4 font-black uppercase tracking-widest">Owner</th>
            <th className="px-5 py-4 font-black uppercase tracking-widest">Source Needed</th>
            <th className="px-5 py-4 font-black uppercase tracking-widest">Updated</th>
            <th className="px-5 py-4 font-black uppercase tracking-widest">Review</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={`${page.section}-${page.slug}`} className="border-b border-slate-100 last:border-b-0">
              <td className="px-5 py-4 font-bold text-[#0d315c]">{page.title}</td>
              <td className="px-5 py-4 font-semibold text-slate-600">{page.status}</td>
              <td className="px-5 py-4 font-semibold text-slate-600">{page.ownerOffice}</td>
              <td className="px-5 py-4 font-semibold text-slate-600">{page.sourceDocumentNeeded}</td>
              <td className="px-5 py-4 font-semibold text-slate-600">{page.lastUpdated}</td>
              <td className="px-5 py-4 font-semibold text-slate-600">{page.lastReviewed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
