/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FaBed,
  FaBath,
  FaShieldAlt,
  FaGamepad,
  FaExpand,
  FaCompress,
  FaSyncAlt,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaArrowRight,
  FaPhoneAlt,
  FaWhatsapp,
  FaEye,
} from "react-icons/fa";
import { SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import { warmUpHostelTiles } from "@/lib/campus-360/texture-cache";

export interface HostelScene {
  id: string;
  name: string;
  category: "room" | "washroom" | "vanity" | "recreation" | "safety";
  categoryLabel: string;
  description: string;
  previewSrc: string;
  highlights: string[];
}

export const HOSTEL_SCENES: HostelScene[] = [
  {
    id: "0-girls-rooms",
    name: "Hostel Room & Study Area",
    category: "room",
    categoryLabel: "Living & Study",
    description: "Dedicated personal study stations with ergonomic seating, overhead storage, individual drawers, vanity mirror unit, AC, and light-control window blinds.",
    previewSrc: "/360/hostel/tiles/0-girls-rooms/preview.jpg",
    highlights: ["Ergonomic Study Desks", "Personal Storage Cabinets", "Dedicated Power Outlets", "Under-Bed Luggage Space"],
  },
  {
    id: "6-girls_handwash",
    name: "Premium Vanity & Handwash Area",
    category: "vanity",
    categoryLabel: "Vanity & Grooming",
    description: "Spacious, modern vanity zone featuring individual grooming mirrors, sleek washbasins, and hygienic layout designed for student comfort and personal care.",
    previewSrc: "/360/hostel/tiles/6-girls_handwash/preview.jpg",
    highlights: ["Individual Vanity Mirrors", "High-Flow Sleek Washbasins", "Private Enclosed Layout", "Spotless Hygiene Standards"],
  },
  {
    id: "3-girls-washroom-360",
    name: "Modern Washroom 360°",
    category: "washroom",
    categoryLabel: "Luxury Washroom",
    description: "Modern, fully appointed restroom facilities featuring premium fixtures, anti-skid flooring, and continuous hygiene maintenance for resident wellbeing.",
    previewSrc: "/360/hostel/tiles/3-girls-washroom-360/preview.jpg",
    highlights: ["Premium Sanitary Ware", "Anti-Skid Safe Flooring", "Dedicated Private Cubicles", "Daily Sanitisation"],
  },
  {
    id: "2-girls-wet--dry",
    name: "Wet & Dry Restroom",
    category: "washroom",
    categoryLabel: "Wet & Dry Zones",
    description: "Thoughtfully engineered wet and dry segregation preventing moisture accumulation, ensuring maximum hygiene, slip resistance, and comfort.",
    previewSrc: "/360/hostel/tiles/2-girls-wet--dry/preview.jpg",
    highlights: ["Moisture Control Layout", "Slip-Resistant Flooring", "Independent Shower Enclosures", "Rapid Ventilation"],
  },
  {
    id: "8-hostel-room-inside",
    name: "Hostel Lounge & Recreation",
    category: "recreation",
    categoryLabel: "Recreation & Lounge",
    description: "Thoughtfully arranged leisure space with carrom and chess facilities to encourage relaxation, student bonding, and recreation within the hostel.",
    previewSrc: "/360/hostel/tiles/8-hostel-room-inside/preview.jpg",
    highlights: ["Carrom & Chess Lounge", "Leisure Relaxation Seating", "Natural Ventilation", "Bright LED Lighting"],
  },
  {
    id: "1-girls-washroom-entry",
    name: "Washroom Entry & Corridor",
    category: "safety",
    categoryLabel: "Corridor & Safety",
    description: "Brightly lit, secure access corridors with protective floor-to-ceiling safety mesh ensuring student safety while providing natural breeze and campus views.",
    previewSrc: "/360/hostel/tiles/1-girls-washroom-entry/preview.jpg",
    highlights: ["Floor-to-Ceiling Safety Mesh", "24/7 Well-Lit Hallways", "Private Washroom Entry", "Scenic Campus Exposure"],
  },
  {
    id: "7-inside-wet-and-dry",
    name: "Inside Wet & Dry Enclosure",
    category: "washroom",
    categoryLabel: "Luxury Washroom",
    description: "Clean interior enclosure with segregated shower and toilet sections designed for complete privacy and hygienic living standards.",
    previewSrc: "/360/hostel/tiles/7-inside-wet-and-dry/preview.jpg",
    highlights: ["Private Shower Stall", "Hygienic Surface Finish", "Continuous Water Supply", "Water-Saving Fixtures"],
  },
  {
    id: "5-girls-door-outside",
    name: "Corridor & Entrance",
    category: "safety",
    categoryLabel: "Corridor & Safety",
    description: "Main corridor entrance connecting residential rooms with amenity zones, engineered for smooth movement and complete security.",
    previewSrc: "/360/hostel/tiles/5-girls-door-outside/preview.jpg",
    highlights: ["CCTV Monitored Zone", "Smooth Transit Passages", "Resident Privacy Doors", "Emergency Signage"],
  },
  {
    id: "4-girls-wet-and-washroom",
    name: "Washroom Facilities",
    category: "washroom",
    categoryLabel: "Wet & Dry Zones",
    description: "High-spec modern washroom suite equipped with contemporary fittings, modern tiles, and easy-clean surfaces.",
    previewSrc: "/360/hostel/tiles/4-girls-wet-and-washroom/preview.jpg",
    highlights: ["Modern Glazed Tiles", "Odor-Free Ventilation", "Sanitised Rest Areas", "Hot & Cold Water Supply"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Spaces (9 Views)" },
  { id: "room", label: "Living & Study Rooms", icon: FaBed },
  { id: "vanity", label: "Premium Vanity", icon: FaEye },
  { id: "washroom", label: "High-End Washrooms", icon: FaBath },
  { id: "recreation", label: "Indoor Recreation", icon: FaGamepad },
  { id: "safety", label: "Corridors & Safety", icon: FaShieldAlt },
] as const;

export default function Hostel360Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeScene, setActiveScene] = useState<HostelScene>(HOSTEL_SCENES[0]);
  const [isFullscreenModal, setIsFullscreenModal] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isJustSwitched, setIsJustSwitched] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewerCardRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const modalIframeRef = useRef<HTMLIFrameElement | null>(null);

  // Pre-warm all hostel 360 scene previews and Level 1 face tiles on mount
  useEffect(() => {
    const sceneIds = HOSTEL_SCENES.map((s) => s.id);
    const cancelWarmup = warmUpHostelTiles(sceneIds);
    return () => {
      cancelWarmup?.();
    };
  }, []);

  // Early activate iframe with wide rootMargin so it is ready before user scrolls to section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredScenes = HOSTEL_SCENES.filter(
    (scene) => selectedCategory === "all" || scene.category === selectedCategory,
  );

  const selectScene = useCallback((scene: HostelScene, shouldScroll: boolean = false) => {
    setActiveScene(scene);
    setIsJustSwitched(true);
    setTimeout(() => setIsJustSwitched(false), 800);

    const postToFrame = (frame: HTMLIFrameElement | null) => {
      if (frame?.contentWindow) {
        try {
          frame.contentWindow.postMessage({ type: "SWITCH_SCENE", sceneId: scene.id }, "*");
        } catch {
          frame.src = `/360/hostel/index.html?scene=${scene.id}`;
        }
      }
    };

    postToFrame(iframeRef.current);
    postToFrame(modalIframeRef.current);

    if (shouldScroll && viewerCardRef.current) {
      const rect = viewerCardRef.current.getBoundingClientRect();
      const yOffset = -75;
      const targetY = rect.top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      });
    }
  }, []);

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);
      if (categoryId !== "all") {
        const firstScene = HOSTEL_SCENES.find((s) => s.category === categoryId);
        if (firstScene && activeScene.category !== categoryId) {
          selectScene(firstScene, false);
        }
      }
    },
    [activeScene.category, selectScene],
  );

  const toggleAutoRotate = useCallback(() => {
    const nextState = !isAutoRotating;
    setIsAutoRotating(nextState);

    const sendRotate = (frame: HTMLIFrameElement | null) => {
      if (frame?.contentWindow) {
        frame.contentWindow.postMessage({ type: "SET_AUTOROTATE", enabled: nextState }, "*");
      }
    };

    sendRotate(iframeRef.current);
    sendRotate(modalIframeRef.current);
  }, [isAutoRotating]);

  const openSceneInFullView = useCallback((scene: HostelScene) => {
    setActiveScene(scene);
    setIsFullscreenModal(true);
    setIframeLoading(true);

    const postToFrame = (frame: HTMLIFrameElement | null) => {
      if (frame?.contentWindow) {
        try {
          frame.contentWindow.postMessage({ type: "SWITCH_SCENE", sceneId: scene.id }, "*");
        } catch {
          frame.src = `/360/hostel/index.html?scene=${scene.id}`;
        }
      }
    };

    postToFrame(iframeRef.current);
    postToFrame(modalIframeRef.current);
  }, []);

  // Lock body scroll and listen for Escape key when Full View modal is open
  useEffect(() => {
    if (isFullscreenModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsFullscreenModal(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isFullscreenModal]);

  // Listen to message events from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "HOSTEL_360_SCENE_CHANGED" && event.data.sceneId) {
        const found = HOSTEL_SCENES.find((s) => s.id === event.data.sceneId);
        if (found) {
          setActiveScene(found);
        }
        setIframeLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section
      id="hostel-360"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#0a2342] via-[#0d315c] to-[#07172b] py-14 text-white sm:py-16 md:py-24"
    >
      {/* Background ambient elements */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#10bb82]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#3b82f6]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header Badging & Title */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#10bb82]/30 bg-[#10bb82]/15 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[#2fe4a7]">
              <span className="h-2 w-2 animate-ping rounded-full bg-[#2fe4a7]" />
              Interactive 360° Tour
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              High-End Hostel &amp; Residential Living
            </h1>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-white/80 md:text-base">
              Explore our fully high-end student accommodation—featuring dedicated personal study suites, luxury vanity stations, segregated hygienic wet &amp; dry washrooms, and 24/7 protected living environments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFullscreenModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#019e6e] px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(1,158,110,0.35)] transition hover:bg-[#10bb82] hover:shadow-[0_12px_28px_rgba(16,187,130,0.45)]"
            >
              <FaExpand className="text-sm" /> Fullscreen 360°
            </button>
            <a
              href="/360/hostel/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white/20"
            >
              <FaExternalLinkAlt className="text-xs" /> Standalone Tour
            </a>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = "icon" in cat ? cat.icon : null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`inline-flex min-h-0 shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-black transition ${
                  isSelected
                    ? "border-[#10bb82] bg-[#10bb82] text-[#0a2342] shadow-[0_4px_16px_rgba(16,187,130,0.35)]"
                    : "border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white"
                }`}
              >
                {Icon && <Icon className="text-xs" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Main 360 Interactive Viewer & Side Overview Panel */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 360 Viewer Card (8 cols) */}
          <div
            ref={viewerCardRef}
            id="hostel-360-player"
            className={`relative flex flex-col overflow-hidden rounded-2xl border bg-slate-950 shadow-2xl transition-all duration-500 lg:col-span-8 ${
              isJustSwitched
                ? "border-[#10bb82] ring-4 ring-[#10bb82]/40 shadow-[0_0_35px_rgba(16,187,130,0.35)]"
                : "border-white/15"
            }`}
          >
            {/* Viewer Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10bb82] shadow-[0_0_8px_#10bb82]" />
                <span className="truncate text-xs font-black uppercase tracking-wider text-white/90">
                  {activeScene.name}
                </span>
                <span className="hidden rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold text-[#10bb82] sm:inline-block">
                  {activeScene.categoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleAutoRotate}
                  title={isAutoRotating ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                    isAutoRotating
                      ? "border-[#10bb82]/40 bg-[#10bb82]/20 text-[#10bb82]"
                      : "border-white/15 bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  <FaSyncAlt className={`text-xs ${isAutoRotating ? "animate-spin" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullscreenModal(true)}
                  title="Expand to Fullscreen"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white"
                >
                  <FaExpand className="text-xs" />
                </button>
              </div>
            </div>

            {/* Viewer Iframe Container */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full min-h-[300px] sm:min-h-[440px] bg-slate-950">
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 text-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#10bb82]" />
                  <p className="mt-3 text-xs font-bold text-white/80">Loading 360° High-Res View...</p>
                  <p className="mt-1 text-[11px] text-white/50">Optimised for mobile &amp; PC</p>
                </div>
              )}
              {isInViewport ? (
                <iframe
                  ref={iframeRef}
                  src={`/360/hostel/index.html?scene=${activeScene.id}`}
                  title={activeScene.name}
                  className="h-full w-full border-0"
                  allow="fullscreen; accelerometer; gyroscope; magnetometer"
                  onLoad={() => setIframeLoading(false)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#10bb82]" />
                </div>
              )}
            </div>

            {/* Viewer Bottom Info strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-900/90 px-4 py-2.5 text-xs text-white/70">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-[#10bb82]">💡</span> Drag mouse/touch to look 360° in all directions
              </span>
              <span className="font-semibold text-white/50">
                Scene {HOSTEL_SCENES.findIndex((s) => s.id === activeScene.id) + 1} of {HOSTEL_SCENES.length}
              </span>
            </div>
          </div>

          {/* Active Space Details Card (4 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl backdrop-blur-md lg:col-span-4">
            <div>
              <span className="inline-block rounded-full bg-[#10bb82]/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#10bb82]">
                {activeScene.categoryLabel}
              </span>
              <h3 className="mt-3 text-2xl font-black text-white">{activeScene.name}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white/75">
                {activeScene.description}
              </p>

              {/* Key Features Bullet List */}
              <div className="mt-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-white/50">Space Highlights</h4>
                <div className="mt-3 space-y-2.5">
                  {activeScene.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2.5 text-xs font-bold text-white/90">
                      <FaCheckCircle className="shrink-0 text-[#10bb82]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="mt-8 border-t border-white/10 pt-5 space-y-3">
              <a
                href={SITE_CTA_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#019e6e] px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#10bb82]"
              >
                <FaWhatsapp className="text-base" /> Hostel Admissions Inquiry
              </a>
              <a
                href={`tel:${SITE_CONTACT.primaryPhone}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white/20"
              >
                <FaPhoneAlt className="text-xs" /> Call Campus Warden / Office
              </a>
            </div>
          </div>
        </div>

        {/* Scene Selection Grid (Thumbnails) */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">
              Explore All 9 Stitched Views &amp; Zones
            </h3>
            <span className="text-xs font-bold text-white/60">
              Showing {filteredScenes.length} space{filteredScenes.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredScenes.map((scene) => {
              const isActive = activeScene.id === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => openSceneInFullView(scene)}
                  className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    isActive
                      ? "border-[#10bb82] bg-gradient-to-b from-[#10bb82]/20 to-white/5 ring-2 ring-[#10bb82]/50 shadow-[0_10px_25px_rgba(16,187,130,0.25)]"
                      : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={scene.previewSrc}
                      alt={scene.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#10bb82] backdrop-blur-md">
                      {scene.categoryLabel}
                    </span>
                    {isActive && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#10bb82] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950">
                        Active View
                      </span>
                    )}

                    {/* Hover Fullscreen Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-slate-950/50 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#019e6e] px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(1,158,110,0.5)]">
                        <FaExpand className="text-xs" /> Launch Full 360°
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-[#10bb82] transition">
                        {scene.name}
                      </h4>
                      <p className="mt-1.5 line-clamp-2 text-xs font-medium text-white/70">
                        {scene.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-bold">
                      <span className="text-white/50">{scene.highlights.length} Key Features</span>
                      <span className="inline-flex items-center gap-1.5 text-[#10bb82] font-black group-hover:translate-x-0.5 transition">
                        Full 360° View <FaExpand className="text-[10px]" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Key Residential Amenities Grid */}
        <div className="mt-16 rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#10bb82]">
              Designed For High-Living Standards
            </span>
            <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Hostel Infrastructure &amp; Amenities Overview
            </h3>
            <p className="mt-2 text-sm font-medium text-white/75">
              Every aspect of the student hostel is designed to provide a secure, hygienic, and empowering home-away-from-home for our students.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#019e6e]/30 text-lg text-[#10bb82]">
                <FaBed />
              </div>
              <h4 className="mt-3 text-base font-black text-white">Study Suites &amp; AC</h4>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Spacious rooms equipped with dedicated ergonomic study desks, personal storage, mirror vanity, and air conditioning.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#019e6e]/30 text-lg text-[#10bb82]">
                <FaBath />
              </div>
              <h4 className="mt-3 text-base font-black text-white">Segregated Wet &amp; Dry</h4>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Engineered washroom architecture segregating wet shower areas from dry zones with high-end fixtures for superior cleanliness.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#019e6e]/30 text-lg text-[#10bb82]">
                <FaShieldAlt />
              </div>
              <h4 className="mt-3 text-base font-black text-white">Full-Height Safety Mesh</h4>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Corridors protected with full-height safety mesh, biometric access, 24/7 security guards, and round-the-clock resident wardens.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#019e6e]/30 text-lg text-[#10bb82]">
                <FaGamepad />
              </div>
              <h4 className="mt-3 text-base font-black text-white">Indoor Recreation</h4>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Dedicated leisure areas with carrom, chess, and student relaxation spots to foster community and wellness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Modal */}
      {isFullscreenModal && (
        <div
          className="fixed inset-0 z-[99999] flex flex-col bg-slate-950 p-2 sm:p-4 backdrop-blur-xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Hostel 360 Tour"
        >
          {/* Modal Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-slate-900/95 px-4 py-3 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 animate-ping rounded-full bg-[#10bb82]" />
              <div>
                <h3 className="text-sm font-black text-white sm:text-base">{activeScene.name}</h3>
                <p className="text-[11px] font-bold text-[#10bb82]">{activeScene.categoryLabel} — Student Hostel 360° Walkthrough</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAutoRotate}
                className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                  isAutoRotating
                    ? "border-[#10bb82] bg-[#10bb82]/20 text-[#10bb82]"
                    : "border-white/20 bg-white/10 text-white/70"
                }`}
              >
                Auto-Rotate: {isAutoRotating ? "ON" : "OFF"}
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreenModal(false)}
                aria-label="Close Fullscreen"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-red-500 hover:text-white"
              >
                <FaCompress className="text-xs" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Modal Iframe */}
          <div className="relative flex-1 w-full bg-slate-950">
            <iframe
              ref={modalIframeRef}
              src={`/360/hostel/index.html?scene=${activeScene.id}`}
              title={`Fullscreen ${activeScene.name}`}
              className="h-full w-full border-0"
              allow="fullscreen; accelerometer; gyroscope; magnetometer"
            />
          </div>

          {/* Modal Bottom Quick Scene Strip */}
          <div className="flex shrink-0 items-center gap-2 overflow-x-auto bg-slate-900/95 px-4 py-3 border-t border-white/10 scrollbar-none rounded-b-2xl">
            <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-[#10bb82] hidden sm:inline">
              Switch View:
            </span>
            {HOSTEL_SCENES.map((scene) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => selectScene(scene, false)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeScene.id === scene.id
                    ? "bg-[#10bb82] text-slate-950 font-black shadow-[0_2px_10px_rgba(16,187,130,0.4)]"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {scene.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
