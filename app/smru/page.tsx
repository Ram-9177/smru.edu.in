import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/seo/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { SITE_IDENTITY } from "@/lib/seo/site";
import { OFFICIAL_DOCUMENTS } from "@/lib/shared/official-documents";
import { UNIVERSITY_INFO } from "@/lib/shared/university";

// The single canonical identity page: teaches search and answer engines that
// "St. Mary's University", "SMRU" and "St. Mary's Rehabilitation University" are one
// institution — and which similarly named institutions they are not.
const TITLE = "SMRU – St. Mary's Rehabilitation University, Hyderabad";
const DESCRIPTION =
  "SMRU is St. Mary's Rehabilitation University, publicly St. Mary's University — a UGC-recognised private university in Hyderabad, Telangana, with six schools and 70+ programmes.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  pathname: "/smru",
});

const FAQS = [
  {
    question: "Is St. Mary's University the same as SMRU?",
    answer:
      "Yes. SMRU is the short name of St. Mary's Rehabilitation University, which operates publicly as St. Mary's University. All three names refer to the same institution in Hyderabad, Telangana; its only official website is smru.edu.in.",
  },
  {
    question: "What does SMRU stand for?",
    answer:
      "SMRU stands for St. Mary's Rehabilitation University. The abbreviation is used in the domain (smru.edu.in), social handles and admissions references.",
  },
  {
    question: "What is the official legal name of the university?",
    answer:
      "The legal name is St. Mary's Rehabilitation University. It was established under Telangana Ordinance No. 2 of 2025 and Telangana Act No. 10 of 2026, and is recognised by the University Grants Commission under Section 2(f) of the UGC Act, 1956.",
  },
  {
    question: "Is St. Mary's University Hyderabad UGC recognised?",
    answer:
      "Yes. St. Mary's Rehabilitation University is recognised by the University Grants Commission under Section 2(f) of the UGC Act, 1956. Programme-level council approvals are a separate category of evidence and are listed on the Approvals & Recognitions page.",
  },
  {
    question: "When was SMRU established?",
    answer:
      "Telangana Ordinance No. 2 of 2025 establishing the university was promulgated on 24 July 2025, and the establishment was enacted as Telangana Act No. 10 of 2026.",
  },
  {
    question: "Who sponsors St. Mary's University?",
    answer:
      "The sponsoring body is the Joseph Sriharsha & Mary Indraja Educational Society, Hyderabad.",
  },
  {
    question: "Is this the same as St. Mary's College, Hyderabad?",
    answer:
      "No. St. Mary's College, Hyderabad is a separate, unrelated institution. St. Mary's University (SMRU) is a state private university with its campus at Deshmukhi, near Ramoji Film City.",
  },
  {
    question: "Is this the same as St. Mary's Group of Institutions?",
    answer:
      "No. St. Mary's Group of Institutions is a separate group of colleges. St. Mary's University (SMRU) is a university established by the Government of Telangana under its own Ordinance and Act.",
  },
  {
    question: "Where is the SMRU campus located?",
    answer:
      "The campus is at Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, near Ramoji Film City, Hyderabad, Telangana 508284, India.",
  },
  {
    question: "What courses does St. Mary's University offer?",
    answer:
      "SMRU offers 70+ undergraduate, postgraduate, diploma and doctoral programmes across six schools: Rehabilitation Sciences, Health & Allied Health Sciences, Psychology, Nursing, Engineering & Emerging Technologies, and Law. Every programme is listed under its school on the Schools page.",
  },
  {
    question: "How do I apply to SMRU?",
    answer:
      "Applications are submitted online at apply.smru.edu.in. The Admissions page lists the current cycle, eligibility routes and the admissions helpline.",
  },
  {
    question: "What is the official website of SMRU?",
    answer:
      "The official website is https://smru.edu.in and the application portal is https://apply.smru.edu.in. Information on third-party listing sites should be verified against these official routes.",
  },
];

const NAMES = [
  { label: "Public name", value: "St. Mary's University (SMRU)", use: "Website, prospectus, signage, everyday use" },
  { label: "Short name", value: "SMRU", use: "Domain, social handles, admissions references" },
  { label: "Legal name", value: "St. Mary's Rehabilitation University", use: "Statutory documents, council filings, degree certificates" },
];

const SCHOOLS = [
  { name: "School of Rehabilitation Sciences", href: "/schools/rehabilitation-sciences/" },
  { name: "School of Health & Allied Health Sciences", href: "/schools/health-allied-health-sciences/" },
  { name: "School of Psychology", href: "/schools/psychology/" },
  { name: "School of Nursing Sciences", href: "/schools/nursing-sciences/" },
  { name: "School of Engineering & Emerging Technologies", href: "/schools/engineering-emerging-technologies/" },
  { name: "School of Law", href: "/schools/law/" },
];

const linkClass = "font-semibold text-[#019e6e] underline underline-offset-2 hover:text-[#0d315c]";

export default function SmruIdentityPage() {
  return (
    <>
      <StructuredData
        id="smru-identity-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "SMRU", path: "/smru" },
        ])}
      />
      <StructuredData
        id="smru-identity-webpage"
        data={buildWebPageSchema({ title: TITLE, description: DESCRIPTION, pathname: "/smru" })}
      />
      <StructuredData id="smru-identity-faq" data={buildFaqSchema(FAQS)} />

      <div className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#f9fbff_100%)] pt-[120px] lg:pt-[136px] pb-20">
        <section className="px-4">
          <div className="mx-auto max-w-4xl">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#019e6e]">Official identity</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#0d315c] md:text-5xl">
              SMRU — St. Mary&apos;s Rehabilitation University
            </h1>
            <div className="mt-5 h-1.5 w-20 rounded-full bg-[#ffaf3a]" />

            {/* Answer-first paragraph: the passage answer engines quote. Bridge sentence is verbatim. */}
            <p className="mt-8 text-lg font-medium leading-8 text-slate-700">
              {SITE_IDENTITY.bridgeSentence} The campus is at Deshmukhi, near Ramoji Film City, and the university
              offers more than 70 programmes across six schools — rehabilitation sciences, health and allied health
              sciences, psychology, nursing, engineering and emerging technologies, and law. Its only official website is{" "}
              <strong>smru.edu.in</strong>.
            </p>

            <h2 className="mt-14 text-2xl font-black text-[#0d315c]">The three names, and when each is used</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#0d315c] text-white">
                    <th className="px-4 py-3 font-bold">Context</th>
                    <th className="px-4 py-3 font-bold">Name</th>
                    <th className="px-4 py-3 font-bold">Used for</th>
                  </tr>
                </thead>
                <tbody>
                  {NAMES.map((n) => (
                    <tr key={n.label} className="border-b border-[#e3edf8] bg-white">
                      <td className="px-4 py-3 font-semibold text-[#0d315c]">{n.label}</td>
                      <td className="px-4 py-3 text-slate-700">{n.value}</td>
                      <td className="px-4 py-3 text-slate-600">{n.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-14 text-2xl font-black text-[#0d315c]">Establishment and recognition</h2>
            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">
              <li>
                <strong>Established:</strong> Telangana Ordinance No. 2 of 2025 (promulgated 24 July 2025), enacted as{" "}
                <a className={linkClass} href={OFFICIAL_DOCUMENTS.smruAct2026.href} target="_blank" rel="noopener noreferrer">
                  Telangana Act No. 10 of 2026 (PDF)
                </a>
                .
              </li>
              <li>
                <strong>UGC:</strong> recognised under Section 2(f) of the UGC Act, 1956 —{" "}
                <a className={linkClass} href={OFFICIAL_DOCUMENTS.ugcRecognition2f.href} target="_blank" rel="noopener noreferrer">
                  UGC recognition letter (PDF)
                </a>
                .
              </li>
              <li>
                <strong>Sponsor body:</strong> {SITE_IDENTITY.parentOrganizationName}.
              </li>
              <li>
                <strong>Programme approvals:</strong> council approvals apply at programme level and are published on the{" "}
                <Link className={linkClass} href="/approvals-recognitions/">
                  Approvals &amp; Recognitions
                </Link>{" "}
                page. University recognition and programme approval are separate categories of evidence.
              </li>
            </ul>

            <h2 className="mt-14 text-2xl font-black text-[#0d315c]">Not to be confused with</h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Several unrelated institutions share part of this name. St. Mary&apos;s University (SMRU) is{" "}
              <strong>not</strong> St. Mary&apos;s College, Hyderabad; <strong>not</strong> St. Mary&apos;s Group of
              Institutions or St. Mary&apos;s College of Engineering &amp; Technology; and <strong>not</strong> St.
              Mary&apos;s University in San Antonio (Texas), Twickenham (London), Halifax (Nova Scotia) or Calgary. The
              only official website for this university is smru.edu.in, and the only application portal is
              apply.smru.edu.in.
            </p>

            <h2 className="mt-14 text-2xl font-black text-[#0d315c]">Six schools</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {SCHOOLS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-xl border border-[#dce7f3] bg-white px-5 py-4 text-sm font-semibold text-[#0d315c] transition hover:border-[#019e6e] hover:text-[#019e6e]"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-base leading-7 text-slate-700">
              Every programme is listed under its school and department on the{" "}
              <Link className={linkClass} href="/schools/">
                Schools page
              </Link>
              .
            </p>

            <h2 className="mt-14 text-2xl font-black text-[#0d315c]">Campus and official contact routes</h2>
            <ul className="mt-6 space-y-2 text-base leading-7 text-slate-700">
              <li>
                <strong>Campus:</strong> {UNIVERSITY_INFO.address} —{" "}
                <a className={linkClass} href={SITE_IDENTITY.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  open in Google Maps
                </a>
              </li>
              <li>
                <strong>Email:</strong> {UNIVERSITY_INFO.email}
              </li>
              <li>
                <strong>Admissions:</strong> {UNIVERSITY_INFO.phone}
              </li>
              <li>
                <strong>Apply:</strong>{" "}
                <a className={linkClass} href="https://apply.smru.edu.in">
                  apply.smru.edu.in
                </a>
              </li>
              <li>
                <strong>More:</strong>{" "}
                <Link className={linkClass} href="/about/">
                  About
                </Link>
                {" · "}
                <Link className={linkClass} href="/admissions/">
                  Admissions
                </Link>
                {" · "}
                <Link className={linkClass} href="/contact/">
                  Contact
                </Link>
                {" · "}
                <Link className={linkClass} href="/mandatory-disclosure/">
                  Mandatory disclosure
                </Link>
              </li>
            </ul>

            <h2 className="mt-14 text-2xl font-black text-[#0d315c]">Frequently asked questions</h2>
            <div className="mt-6 space-y-5">
              {FAQS.map((f) => (
                <div key={f.question} className="rounded-xl border border-[#dce7f3] bg-white px-6 py-5">
                  <h3 className="text-base font-black text-[#0d315c]">{f.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
