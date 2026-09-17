import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const CAMPUS_LIFE_HIGHLIGHTS = [
  {
    title: "Student Life",
    subtitle: "Discover everyday life beyond the classroom",
    image: "/images/campus-life/student-life.webp",
    href: "/campus-360/?location=student-life",
  },
  {
    title: "Classroom",
    subtitle: "Explore modern spaces for interactive learning",
    image: "/images/campus-life/classroom.webp",
    href: "/campus-360/?location=class-room",
  },
  {
    title: "Amphitheatre",
    subtitle: "See where campus events come alive",
    image: "/images/campus-life/amphitheatre.webp",
    href: "/campus-360/?location=amphitheatre",
  },
  {
    title: "Sports & Fitness",
    subtitle: "Tour recreation and fitness facilities",
    image: "/images/campus-life/sports-complex.webp",
    href: "/campus-360/?location=cricket-ground-gymnasium-and-indoor-games",
  },
] as const;

export default function CampusLife360Section() {
  return (
    <section
      aria-labelledby="campus-life-360-heading"
      className="overflow-hidden border border-slate-200 bg-white shadow-sm cut-corner-panel"
    >
      <div className="flex flex-col gap-5 border-b border-slate-100 bg-gradient-to-r from-[#f3faf7] to-white p-6 sm:flex-row sm:items-end sm:justify-between md:p-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#019e6e]">
            Beyond the classroom
          </p>
          <h2 id="campus-life-360-heading" className="text-2xl font-black text-[#0d315c] md:text-3xl">
            Explore Campus Life in 360°
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
            Step inside the spaces where students learn, connect, perform, and stay active.
          </p>
        </div>
        <Link
          href="/campus-360/"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start bg-[#0d315c] px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:bg-[#019e6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#019e6e] cut-corner-badge sm:self-auto"
        >
          View Full Campus Tour <FaArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2">
        {CAMPUS_LIFE_HIGHLIGHTS.map((highlight) => (
          <Link
            key={highlight.title}
            href={highlight.href}
            aria-label={`Explore ${highlight.title} in the 360 degree campus tour`}
            className="group relative isolate min-h-[230px] overflow-hidden bg-[#0d315c] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#ffaf3a]"
          >
            <Image
              src={highlight.image}
              alt=""
              fill
              sizes="(max-width: 639px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071b35]/95 via-[#071b35]/20 to-transparent" />
            <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/45 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
              360° Tour
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h3 className="text-lg font-black">{highlight.title}</h3>
              <p className="mt-1 max-w-xs text-xs font-medium leading-relaxed text-white/80">
                {highlight.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
