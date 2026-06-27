"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CAMPUS_TOUR_CATEGORIES,
  CAMPUS_TOUR_LANGUAGES,
  CAMPUS_TOUR_LOCATIONS,
  CampusTourCategory,
  CampusTourLanguage,
  CampusTourLocation,
  campusTourText,
} from "@/data/campus-tour";

const Campus360Viewer = dynamic(() => import("@/components/Campus360Viewer"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#019e6e]" />
    </div>
  ),
});

type CategoryFilter = "all" | CampusTourCategory;

const COPY = {
  heading: {
    en: "Campus Experience",
    hi: "परिसर अनुभव",
    te: "క్యాంపస్ అనుభవం",
  },
  description: {
    en: "Preview every campus location, then open the full immersive tour.",
    hi: "हर परिसर स्थान का पूर्वावलोकन करें, फिर पूर्ण इमर्सिव टूर खोलें।",
    te: "ప్రతి క్యాంపస్ ప్రదేశాన్ని ప్రివ్యూ చేసి, పూర్తి ఇమర్సివ్ టూర్‌ను తెరవండి.",
  },
  fullTour: {
    en: "Open Full Tour",
    hi: "पूर्ण टूर खोलें",
    te: "పూర్తి టూర్ తెరవండి",
  },
  close: {
    en: "Close",
    hi: "बंद करें",
    te: "మూసివేయండి",
  },
} as const;

function CampusLocationModal({
  location,
  language,
  onClose,
}: {
  location: CampusTourLocation;
  language: CampusTourLanguage;
  onClose: () => void;
}) {
  const title = campusTourText(location.title, language);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl md:rounded-3xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-6 md:py-4">
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#019e6e]">
              {location.projection === "equirectangular" ? "360° Preview" : "Campus Photo"}
            </p>
            <h3 className="truncate text-sm font-black text-white md:text-xl">{title}</h3>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/campus-360?location=${location.slug}&lang=${language}`}
              className="rounded-full bg-[#019e6e] px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white transition hover:bg-[#017a55] md:px-5 md:text-[10px]"
            >
              {COPY.fullTour[language]}
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label={COPY.close[language]}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-500/25"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative aspect-video min-h-[260px] w-full">
          <Campus360Viewer
            panorama={{
              src: location.panoramaSrc,
              preview: location.previewSrc,
              alt: title,
              caption: title,
              projection: location.projection,
              initialZoom: location.slug === "full-campus-360-image" ? 15 : 0,
            }}
            isAutoRotating={location.projection === "equirectangular"}
          />
        </div>
      </div>
    </div>
  );
}

export default function CampusExperienceSection() {
  const [language, setLanguage] = useState<CampusTourLanguage>("en");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [activeLocation, setActiveLocation] = useState<CampusTourLocation | null>(null);

  const locations = useMemo(
    () =>
      category === "all"
        ? CAMPUS_TOUR_LOCATIONS
        : CAMPUS_TOUR_LOCATIONS.filter((location) => location.category === category),
    [category],
  );

  return (
    <section className="overflow-hidden bg-[#f4f9ff] py-9" data-testid="campus-experience">
      {activeLocation ? (
        <CampusLocationModal
          location={activeLocation}
          language={language}
          onClose={() => setActiveLocation(null)}
        />
      ) : null}

      <div className="mx-auto mb-5 w-full max-w-6xl px-5 sm:px-6 md:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-black leading-tight text-[#0d315c] md:text-4xl">
              {COPY.heading[language]}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              {COPY.description[language]}
            </p>
          </div>
          <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            {CAMPUS_TOUR_LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                aria-pressed={language === item.code}
                className={`min-h-0 rounded-lg px-3 py-2 text-[10px] font-black transition ${
                  language === item.code
                    ? "bg-[#0d315c] text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {CAMPUS_TOUR_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              aria-pressed={category === item.id}
              className={`min-h-0 shrink-0 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-wider transition ${
                category === item.id
                  ? "border-[#019e6e] bg-[#019e6e] text-white"
                  : "border-slate-200 bg-white text-[#0d315c] hover:border-[#019e6e]/50"
              }`}
            >
              {campusTourText(item.label, language)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16">
        {locations.map((location) => {
          const title = campusTourText(location.title, language);

          return (
            <button
              key={location.id}
              type="button"
              onClick={() => setActiveLocation(location)}
              className="group relative h-56 w-[78vw] max-w-[310px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white bg-slate-900 text-left shadow-[0_16px_34px_rgba(13,49,92,0.16)] transition duration-300 hover:-translate-y-1 hover:border-[#019e6e]/40"
            >
              <Image
                src={location.previewSrc}
                alt={title}
                fill
                sizes="310px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-[#ffaf3a] backdrop-blur-sm">
                {location.projection === "equirectangular" ? "360°" : "Photo"}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-base font-black leading-tight text-white">{title}</h3>
                <p className="mt-1.5 text-[9px] font-black uppercase tracking-widest text-[#7ff0c8]">
                  {campusTourText(
                    CAMPUS_TOUR_CATEGORIES.find((item) => item.id === location.category)!.label,
                    language,
                  )}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
