/* eslint-disable @next/next/no-img-element */
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaCompress,
  FaExpand,
  FaMapMarkerAlt,
  FaPause,
  FaPlay,
  FaShareAlt,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import SEO from "../components/SEO";
import {
  CAMPUS_TOUR_INTRO_LOCATION,
  CAMPUS_TOUR_LANGUAGES,
  CAMPUS_TOUR_LOCATION_MAP,
  CAMPUS_TOUR_LOCATIONS,
  CampusTourLanguage,
  CampusTourLocation,
  campusTourAudioSrc,
  campusTourText,
} from "../data/campus-tour";

const Campus360Viewer = dynamic(() => import("@/components/Campus360Viewer"), {
  ssr: false,
});

const UI_TEXT = {
  virtualTour: {
    en: "Virtual Tour",
    hi: "वर्चुअल टूर",
    te: "వర్చువల్ టూర్",
  },
  exploreLocations: {
    en: "Explore Locations",
    hi: "स्थानों का अन्वेषण करें",
    te: "ప్రదేశాలను అన్వేషించండి",
  },
  scrollHint: {
    en: "Scroll to see more →",
    hi: "और देखने के लिए स्क्रॉल करें →",
    te: "మరిన్ని చూడటానికి స్క్రోల్ చేయండి →",
  },
  introLabel: {
    en: "Stmarys University Campus Tour",
    hi: "सेंट मैरीज़ यूनिवर्सिटी परिसर भ्रमण",
    te: "సెయింట్ మేరీస్ యూనివర్సిటీ క్యాంపస్ టూర్",
  },
  introNext: {
    en: "Entry Gate begins in 5 seconds",
    hi: "प्रवेश द्वार 5 सेकंड में शुरू होगा",
    te: "ప్రవేశ ద్వారం 5 సెకన్లలో ప్రారంభమవుతుంది",
  },
  muteNarration: {
    en: "Mute narration",
    hi: "वर्णन म्यूट करें",
    te: "వివరణను మ్యూట్ చేయండి",
  },
  unmuteNarration: {
    en: "Unmute narration",
    hi: "वर्णन की आवाज़ चालू करें",
    te: "వివరణ శబ్దాన్ని ఆన్ చేయండి",
  },
  playNarration: {
    en: "Play narration",
    hi: "वर्णन चलाएँ",
    te: "వివరణను ప్లే చేయండి",
  },
  pauseNarration: {
    en: "Pause narration",
    hi: "वर्णन रोकें",
    te: "వివరణను పాజ్ చేయండి",
  },
  narrationUnavailable: {
    en: "Narration unavailable",
    hi: "वर्णन उपलब्ध नहीं है",
    te: "వివరణ అందుబాటులో లేదు",
  },
  audioControl: {
    en: "Audio",
    hi: "ऑडियो",
    te: "ఆడియో",
  },
  panoramaControl: {
    en: "360° View",
    hi: "360° दृश्य",
    te: "360° దృశ్యం",
  },
} as const;

function viewerPanorama(location: CampusTourLocation, language: CampusTourLanguage) {
  const title = campusTourText(location.title, language);

  return {
    src: location.panoramaSrc,
    preview: location.previewSrc,
    alt: `${title} at Stmarys University`,
    caption: title,
    projection: location.projection,
    initialZoom: 0,
    markers: [],
  };
}

export default function Campus360() {
  const [language, setLanguage] = useState<CampusTourLanguage>("en");
  const [selectedLocation, setSelectedLocation] = useState(CAMPUS_TOUR_LOCATIONS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasLoadedQuery, setHasLoadedQuery] = useState(false);
  const [introPending, setIntroPending] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioState, setAudioState] = useState<"idle" | "playing" | "paused" | "blocked">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playNarration = useCallback(
    async (location: CampusTourLocation, nextLanguage: CampusTourLanguage) => {
      const audio = audioRef.current;
      const src = campusTourAudioSrc(location.slug, nextLanguage);

      if (!audio || !src) {
        if (audio) {
          audio.pause();
          audio.removeAttribute("src");
          audio.load();
        }
        setAudioState("idle");
        return;
      }

      const absoluteSrc = new URL(src, window.location.href).href;
      if (audio.src !== absoluteSrc) {
        audio.pause();
        audio.src = src;
        audio.load();
      }

      try {
        await audio.play();
      } catch {
        setAudioState("blocked");
      }
    },
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedLocation = params.get("location");
    const requestedLanguage = params.get("lang") as CampusTourLanguage | null;
    const location = requestedLocation ? CAMPUS_TOUR_LOCATION_MAP.get(requestedLocation) : null;

    if (location) {
      setSelectedLocation(location);
      setIntroPending(false);
    } else {
      setSelectedLocation(CAMPUS_TOUR_LOCATIONS[0]);
      setIntroPending(true);
    }

    if (requestedLanguage && CAMPUS_TOUR_LANGUAGES.some(({ code }) => code === requestedLanguage)) {
      setLanguage(requestedLanguage);
    }
    setHasLoadedQuery(true);
  }, []);

  useEffect(() => {
    if (!introPending) return;

    let frameId = 0;
    const startIntroAfterSiteSplash = () => {
      if (document.getElementById("site-preloader")) {
        frameId = window.requestAnimationFrame(startIntroAfterSiteSplash);
        return;
      }
      setIntroPending(false);
      setShowIntro(true);
    };

    frameId = window.requestAnimationFrame(startIntroAfterSiteSplash);
    return () => window.cancelAnimationFrame(frameId);
  }, [introPending]);

  useEffect(() => {
    if (!showIntro) return;
    const introTimer = window.setTimeout(() => setShowIntro(false), 5000);
    return () => window.clearTimeout(introTimer);
  }, [showIntro]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!hasLoadedQuery) return;
    const params = new URLSearchParams(window.location.search);
    params.set("location", selectedLocation.slug);
    params.set("lang", language);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [hasLoadedQuery, language, selectedLocation]);

  useEffect(() => {
    if (!hasLoadedQuery) return;
    void playNarration(selectedLocation, language);
  }, [hasLoadedQuery, language, playNarration, selectedLocation]);

  const selectedTitle = campusTourText(selectedLocation.title, language);
  const panorama = viewerPanorama(selectedLocation, language);
  const audioSrc = campusTourAudioSrc(selectedLocation.slug, language);

  const selectLanguage = (nextLanguage: CampusTourLanguage) => {
    setLanguage(nextLanguage);
    void playNarration(selectedLocation, nextLanguage);
  };

  const selectLocation = (location: CampusTourLocation) => {
    setSelectedLocation(location);
    void playNarration(location, language);
  };

  const toggleNarrationPlayback = () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    if (audioState === "blocked" || audio.paused || audio.ended) {
      if (audio.ended) audio.currentTime = 0;
      void audio.play().catch(() => setAudioState("blocked"));
      return;
    }

    audio.pause();
  };

  const toggleNarrationMute = () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      return;
    }
    document.exitFullscreen();
  };

  const handleShare = async () => {
    const shareData = {
      title: `${selectedTitle} - Stmarys University Virtual Tour`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#000814] font-outfit"
      data-testid="campus-360-tour"
      data-current-location={selectedLocation.slug}
      data-intro-state={showIntro ? "visible" : introPending ? "pending" : "complete"}
      data-audio-language={language}
      data-audio-src={audioSrc}
      data-audio-state={!audioSrc ? "unavailable" : isMuted ? "muted" : audioState}
    >
      <SEO
        title="Campus 360° Virtual Tour | Stmarys University"
        description="Explore Stmarys University campus in an immersive multilingual 360° virtual tour."
      />

      <div className="absolute inset-0 z-0">
        {hasLoadedQuery ? (
          <Campus360Viewer
            panorama={panorama}
            isAutoRotating={isAutoRotating && selectedLocation.projection === "equirectangular"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#000814]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#019e6e]" />
          </div>
        )}
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/90 via-black/50 to-transparent px-3 pb-14 pt-3 md:px-6 md:pb-20 md:pt-5">
        <div className="mx-auto flex max-w-[1600px] items-start justify-between gap-3">
          <div className="pointer-events-auto flex items-center gap-3">
            <Link
              href="/explore"
              aria-label="Back to Explore Stmarys University"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:bg-white/20 md:h-12 md:w-12"
            >
              <FaChevronLeft className="-ml-0.5 text-sm" />
            </Link>
            <Link
              href="/"
              aria-label="Open Stmarys University homepage"
              className="hidden rounded-xl bg-white px-3 py-2 shadow-2xl transition hover:scale-[1.02] sm:block"
            >
              <img src="/assets/Logo.webp" alt="Stmarys University" className="h-9 w-auto" />
            </Link>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/15 bg-black/45 p-1.5 backdrop-blur-md">
            {CAMPUS_TOUR_LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => selectLanguage(item.code)}
                aria-pressed={language === item.code}
                className={`min-h-0 rounded-lg px-2.5 py-2 text-[9px] font-black transition md:text-[10px] ${
                  language === item.code
                    ? "bg-[#ffaf3a] text-[#082244]"
                    : "text-white/75 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="pointer-events-none absolute left-4 right-20 top-20 z-10 md:left-8 md:right-28 md:top-24">
        <div className="max-w-3xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ffaf3a]" />
            <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ffaf3a] backdrop-blur-md">
              {UI_TEXT.virtualTour[language]}
            </span>
          </div>
          <h1
            className="max-w-2xl text-2xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.85)] md:text-5xl"
            data-testid="campus-location-title"
          >
            {selectedTitle}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-white/85">
            <FaMapMarkerAlt className="text-sm text-[#019e6e]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] md:text-xs">
              Deshmukhi Campus
            </p>
          </div>
        </div>
      </section>

      <div className="pointer-events-auto absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 md:right-6 md:gap-3">
        <div className="flex items-center justify-end gap-2">
          <span className="rounded-full border border-[#4de3b6]/35 bg-[#063c32]/90 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#8ff5d6] shadow-lg backdrop-blur-md md:text-[9px]">
            {UI_TEXT.audioControl[language]}
          </span>
          <button
            type="button"
            onClick={toggleNarrationPlayback}
            disabled={!audioSrc}
            aria-label={
              !audioSrc
                ? UI_TEXT.narrationUnavailable[language]
                : audioState === "playing"
                  ? UI_TEXT.pauseNarration[language]
                  : UI_TEXT.playNarration[language]
            }
            data-testid="campus-audio-playback"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-[#019e6e] disabled:cursor-not-allowed disabled:opacity-35 md:h-12 md:w-12"
          >
            {audioState === "playing" ? <FaPause /> : <FaPlay className="ml-0.5" />}
          </button>
        </div>
        <button
          type="button"
          onClick={toggleNarrationMute}
          disabled={!audioSrc}
          aria-label={
            !audioSrc
              ? UI_TEXT.narrationUnavailable[language]
              : isMuted
                ? UI_TEXT.unmuteNarration[language]
                : UI_TEXT.muteNarration[language]
          }
          data-testid="campus-audio-mute"
          className="flex h-10 w-10 self-end items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-[#019e6e] disabled:cursor-not-allowed disabled:opacity-35 md:h-12 md:w-12"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        {selectedLocation.projection === "equirectangular" ? (
          <div className="flex items-center justify-end gap-2">
            <span className="rounded-full border border-[#ffca78]/35 bg-[#4a2b09]/90 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#ffd99c] shadow-lg backdrop-blur-md md:text-[9px]">
              {UI_TEXT.panoramaControl[language]}
            </span>
            <button
              type="button"
              onClick={() => setIsAutoRotating((current) => !current)}
              aria-label={isAutoRotating ? "Pause panorama rotation" : "Start panorama rotation"}
              data-testid="campus-panorama-rotation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-[#ffaf3a] hover:text-[#082244] md:h-12 md:w-12"
            >
              {isAutoRotating ? <FaPause /> : <FaPlay className="ml-0.5" />}
            </button>
          </div>
        ) : null}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="flex h-10 w-10 self-end items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-[#ffaf3a] hover:text-[#082244] md:h-12 md:w-12"
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this campus location"
          className="mt-2 flex h-10 w-10 self-end items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-white/20 md:h-12 md:w-12"
        >
          <FaShareAlt />
        </button>
      </div>

      <section className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/85 to-transparent px-3 pb-3 pt-16 md:px-6 md:pb-5 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-2 flex items-center justify-between px-1 md:mb-3">
            <h2 className="text-[9px] font-black uppercase tracking-[0.25em] text-white/75 md:text-xs">
              {UI_TEXT.exploreLocations[language]}
            </h2>
            <p className="hidden text-[9px] font-bold uppercase tracking-widest text-white/45 sm:block">
              {UI_TEXT.scrollHint[language]}
            </p>
          </div>

          <div className="campus-tour-scrollbar flex snap-x gap-2.5 overflow-x-auto pb-3 md:gap-3">
            {CAMPUS_TOUR_LOCATIONS.map((location) => {
              const active = selectedLocation.id === location.id;
              const title = campusTourText(location.title, language);

              return (
                <button
                  key={location.id}
                  type="button"
                  data-location-slug={location.slug}
                  onClick={() => selectLocation(location)}
                  aria-pressed={active}
                  className={`group relative h-[78px] w-[126px] shrink-0 snap-start overflow-hidden rounded-lg text-left transition md:h-[105px] md:w-[175px] md:rounded-xl ${
                    active
                      ? "scale-[0.97] ring-[3px] ring-[#019e6e] ring-offset-2 ring-offset-black"
                      : "opacity-70 hover:-translate-y-1 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={location.previewSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 126px, 175px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                  {location.projection === "equirectangular" ? (
                    <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[7px] font-black text-[#ffaf3a]">
                      360°
                    </span>
                  ) : null}
                  <p className="absolute inset-x-0 bottom-0 line-clamp-2 p-2 text-[8px] font-black uppercase leading-tight tracking-wide text-white md:p-3 md:text-[10px]">
                    {title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => setAudioState("playing")}
        onPause={() => setAudioState(audioRef.current?.src ? "paused" : "idle")}
        onEnded={() => setAudioState("paused")}
        onError={() => setAudioState("idle")}
        data-testid="campus-narration-audio"
      />

      <style jsx global>{`
        .campus-tour-scrollbar::-webkit-scrollbar {
          height: 5px;
        }
        .campus-tour-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 999px;
        }
        .campus-tour-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 999px;
        }
        .psv-navbar {
          display: none !important;
        }
        @keyframes campus-intro-progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>

      {introPending ? <div className="absolute inset-0 z-[59] bg-[#000814]" /> : null}

      {showIntro ? (
        <section
          className="absolute inset-0 z-[60] overflow-hidden bg-[#000814]"
          data-testid="campus-tour-intro"
          aria-label={campusTourText(CAMPUS_TOUR_INTRO_LOCATION.title, language)}
        >
          <Image
            src={CAMPUS_TOUR_INTRO_LOCATION.panoramaSrc}
            alt={campusTourText(CAMPUS_TOUR_INTRO_LOCATION.title, language)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#7ff0c8]">
              {UI_TEXT.introLabel[language]}
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-black uppercase leading-none md:text-6xl">
              {campusTourText(CAMPUS_TOUR_INTRO_LOCATION.title, language)}
            </h1>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
              {UI_TEXT.introNext[language]}
            </p>
            <div className="mt-5 h-1 max-w-xl overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full origin-left bg-[#019e6e]"
                style={{ animation: "campus-intro-progress 5s linear forwards" }}
              />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
