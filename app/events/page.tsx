import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaUsers,
} from "react-icons/fa";
import StructuredData from "@/components/seo/StructuredData";
import { UNIVERSITY_EVENTS } from "@/data/events";
import { buildMetadata } from "@/lib/metadata";
import { buildItemListSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "University Events",
  description:
    "Explore campus events, institutional initiatives, and student activities at St.Mary's University in Hyderabad.",
  pathname: "/events",
  keywords: ["St.Mary's University events", "university events Hyderabad", "campus activities"],
});

export default function EventsPage() {
  const events = [...UNIVERSITY_EVENTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <StructuredData
        id="events-list-schema"
        data={buildItemListSchema(
          events.map((event) => ({
            name: event.title,
            url: `/events#${event.slug}`,
          }))
        )}
      />

      <section className="relative overflow-hidden border-b border-[#173f6c] bg-[#0d315c] px-4 py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(1,158,110,0.3),transparent_45%)]" />
        <div className="smru-container relative z-10">
          <span className="text-xs font-black uppercase tracking-[0.24em] text-[#ffaf3a]">
            Campus Life
          </span>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
            University Events
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/75 md:text-lg">
            Campus activities, institutional initiatives, and student life updates from St.Mary&apos;s University.
          </p>
        </div>
      </section>

      <section className="bg-[#eef6f5] px-4 py-14 md:py-20">
        <div className="smru-container">
          <div className="space-y-10">
            {events.map((event, index) => (
              <article
                id={event.slug}
                key={event.slug}
                className="scroll-mt-32 overflow-hidden cut-corner-panel border border-[#d8e8e6] bg-white shadow-[0_18px_44px_rgba(13,49,92,0.08)]"
              >
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[300px] bg-slate-100 sm:min-h-[420px]">
                    <Image
                      src={event.images[0].src}
                      alt={event.images[0].alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute left-5 top-5 bg-[#0d315c]/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffaf3a] backdrop-blur">
                      {event.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-black uppercase tracking-[0.1em] text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <FaCalendarAlt className="text-[#019e6e]" /> {event.displayDate}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#ffaf3a]" /> {event.location}
                      </span>
                    </div>

                    <h2 className="mt-5 text-3xl font-black tracking-tight text-[#0d315c] sm:text-4xl">
                      {event.title}
                    </h2>

                    <div className="mt-5 space-y-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                      {event.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {event.participants.length > 0 && (
                      <div className="mt-7 border-t border-slate-100 pt-6">
                        <h3 className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#0d315c]">
                          <FaUsers className="text-[#019e6e]" /> Participants
                        </h3>
                        <ul className="mt-3 grid gap-2 text-sm font-medium text-slate-600 sm:grid-cols-2">
                          {event.participants.map((participant) => (
                            <li key={participant}>• {participant}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-7 flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 bg-[#eef6f5] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#0d315c]"
                        >
                          <FaTag className="text-[#019e6e]" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {event.images.length > 1 && (
                  <div className="grid gap-3 border-t border-slate-100 bg-slate-50 p-3 sm:grid-cols-2">
                    {event.images.slice(1).map((image) => (
                      <div key={image.src} className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/#events"
              className="inline-flex items-center gap-3 bg-[#0d315c] px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-[#019e6e]"
            >
              <FaArrowLeft /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
