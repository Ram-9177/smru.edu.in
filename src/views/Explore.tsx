import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCameraRetro,
  FaCompass,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import CampusExperienceSection from "@/components/CampusExperienceSection";
import ProgramsExplorer from "@/components/ProgramsExplorer";
import { SITE_CTA_LINKS, SITE_SOCIAL_LINKS, SITE_CONTACT } from "@/lib/shared/site-constants";

const quickLinks = [
  { href: "/campus-360/", label: "Campus 360 Tour" },
  { href: "/campus-guide/", label: "Campus Guide" },
  { href: "#why-smru", label: "Why Choose SMRU" },
  { href: "#programs", label: "Programs & Courses" },
  { href: "/brochure/", label: "Download Brochure" },
  { href: "#website-sections", label: "Website Sections" },
  { href: "#social-media", label: "Social Media" },
];

const websiteLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/schools/", label: "Schools" },
  { href: "/admissions/", label: "Admissions" },
  { href: "/events/", label: "Events" },
  { href: "/search/", label: "Search" },
  { href: "/contact/", label: "Contact" },
  { href: "/campus-360/", label: "Campus 360" },
];

const highlights = [
  ["120-acre campus", "Purpose-built campus near Hyderabad."],
  ["Educational legacy", "St. Mary’s institutional education legacy."],
  ["Care-led university", "Rehabilitation, health, psychology, nursing, engineering and applied sciences."],
  ["Applied learning", "Labs, clinical exposure and guided professional readiness."],
  ["Student support", "Mentoring, counselling, wellbeing and residential support."],
  ["Multiple pathways", "Diploma, UG, PG, professional and doctoral-level programmes."],
];

export default function Explore() {
  return (
    <div className="bg-white font-outfit text-[#0d315c]">
      <section className="relative overflow-hidden bg-[#0d315c]">
        <Image
          src="/assets/hero-campus.webp"
          alt="Stmarys University campus"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0d315c]/70" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl">Explore SMRU</h1>
          <p className="mt-3 max-w-2xl text-base font-semibold text-white/90 md:text-lg">
            Campus, programs, student life and admission help in one quick page.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/campus-360/"
              className="cut-corner-panel flex min-h-[190px] flex-col justify-between border border-white/10 bg-[#10bb82] p-6 text-white shadow-[0_14px_30px_rgba(16,187,130,0.22)] transition hover:-translate-y-1 hover:border-white/30"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center cut-corner-badge bg-white/20 text-2xl">
                <FaCameraRetro />
              </span>
              <span>
                <span className="block text-2xl font-black">Campus 360</span>
                <span className="mt-1 block text-sm font-bold text-white/80">Explore virtually</span>
              </span>
            </Link>
            <Link
              href="/campus-guide/"
              className="cut-corner-panel flex min-h-[190px] flex-col justify-between border border-white/10 bg-[#0d315c] p-6 text-white shadow-[0_14px_30px_rgba(13,49,92,0.18)] transition hover:-translate-y-1 hover:border-white/30"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center cut-corner-badge bg-white/20 text-2xl">
                <FaCompass />
              </span>
              <span>
                <span className="block text-2xl font-black">Campus Guide</span>
                <span className="mt-1 block text-sm font-bold text-white/80">Find your way</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0d315c] px-4 py-5">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-5">
          <a href={SITE_CTA_LINKS.whatsapp} className="cut-corner-badge bg-[#e6f8ef] px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-[#166534]">
            <FaWhatsapp className="mx-auto mb-2 text-lg" /> WhatsApp
          </a>
          <a href={`tel:${SITE_CONTACT.primaryPhone}`} className="cut-corner-badge bg-[#fff8d8] px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-[#854d0e]">
            <FaPhoneAlt className="mx-auto mb-2 text-base" /> Call Us
          </a>
          <a href="https://apply.smru.edu.in" className="cut-corner-badge bg-[#e9f0ff] px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-[#1e3a8a]">
            <FaArrowRight className="mx-auto mb-2 text-base" /> Apply
          </a>
          <Link href="/contact/" className="cut-corner-badge bg-[#fff2e8] px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-[#9a3412]">
            <FaEnvelope className="mx-auto mb-2 text-base" /> Enquiry
          </Link>
          <Link href="/brochure/" className="cut-corner-badge col-span-2 bg-[#fff0f0] px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-[#991b1b] sm:col-span-1">
            Brochure
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h2 className="text-3xl font-black">Quick Explore</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => (
            <Link key={item.label} href={item.href} className="cut-corner-card flex items-center justify-between border border-[#dbe8f8] bg-[#f7fbff] px-5 py-4 text-sm font-black transition hover:border-[#019e6e] hover:bg-white">
              {item.label} <FaArrowRight className="text-[#019e6e]" />
            </Link>
          ))}
        </div>
      </section>

      <div id="campus-experience">
        <CampusExperienceSection />
      </div>

      <section id="programs" className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h2 className="mb-6 text-3xl font-black">Programs &amp; Courses</h2>
        <ProgramsExplorer />
      </section>

      <section id="website-sections" className="bg-[#f4f9ff] px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Website Sections</h2>
          <p className="mt-2 text-slate-600">Jump to key pages from the SMRU website navigation.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {websiteLinks.map((item) => (
              <Link key={item.label} href={item.href} className="cut-corner-card border border-[#dbe8f8] bg-white px-5 py-4 text-center text-sm font-black transition hover:border-[#019e6e]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="social-media" className="bg-[#0d315c] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Follow Student Life</h2>
          <p className="mt-2 text-white/75">Stay connected with campus updates, events and student activities.</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <a href={SITE_SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="cut-corner-card flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-4 text-sm font-bold transition hover:bg-white/20">
              <FaInstagram className="text-xl" /> Instagram
            </a>
            <a href={SITE_SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="cut-corner-card flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-4 text-sm font-bold transition hover:bg-white/20">
              <FaYoutube className="text-xl" /> YouTube
            </a>
            <a href={SITE_SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="cut-corner-card flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-4 text-sm font-bold transition hover:bg-white/20">
              <FaFacebookF className="text-xl" /> Facebook
            </a>
            <a href={SITE_SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="cut-corner-card flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-4 text-sm font-bold transition hover:bg-white/20">
              <FaLinkedinIn className="text-xl" /> LinkedIn
            </a>
            <a href={SITE_CTA_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="cut-corner-card flex items-center gap-3 border border-white/15 bg-[#019e6e] px-4 py-4 text-sm font-bold transition hover:bg-[#10bb82]">
              <FaWhatsapp className="text-xl" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="cut-corner-panel border border-[#dbe8f8] bg-white p-7">
          <h2 className="text-2xl font-black">Visit Us</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana - 508284, India.
          </p>
          <p className="mt-3 text-sm font-bold text-slate-600">Mon - Sat: 9:30 AM - 5:00 PM</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=St.%20Mary's%20Rehabilitation%20University%2C%20Deshmukhi%2C%20Telangana" className="mt-5 inline-flex items-center gap-2 cut-corner-badge bg-[#019e6e] px-5 py-3 text-sm font-black text-white">
            <FaMapMarkerAlt /> Get Directions
          </a>
        </div>
      </section>

      <section id="why-smru" className="bg-[#0d315c] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Why Choose St. Mary&apos;s?</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map(([title, description]) => (
              <article key={title} className="cut-corner-card border border-white/15 bg-white/5 p-5">
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
