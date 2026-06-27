/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaDesktop,
  FaImage,
  FaMapMarkerAlt,
  FaPause,
  FaPlay,
  FaVolumeUp,
  FaWalking,
  FaSearch,
  FaSearchPlus,
  FaSearchMinus,
  FaRedo,
  FaMagic,
  FaCloudSun,
  FaMusic,
  FaClock,
  FaAward,
  FaWhatsapp,
  FaPhoneAlt,
  FaPaperPlane,
  FaQuestionCircle,
  FaFileDownload,
  FaMapMarkedAlt,
  FaHandPointer,
  FaFileAlt,
  FaHeadset,
  FaThLarge,
  FaRegCompass,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import logo from "../assets/Logo.webp";
import CinematicIntro from "../components/CinematicIntro";

const Campus360Viewer = dynamic(() => import("@/components/Campus360Viewer"), {
  ssr: false,
});

type Language = "en" | "te" | "hi";
type LocalizedText = Partial<Record<Language, string>>;
type Screen = "welcome" | "language" | "tourType" | "preview" | "map";
type AudioKind = "point";

type GuidePoint = {
  id: string;
  title: LocalizedText;
  mapX: number;
  mapY: number;
  image?: string;
  audioFileName?: string;
  transcript: LocalizedText;
  panorama360?: {
    src: string;
    preview?: string;
    alt: string;
    caption?: string;
    projection?: "equirectangular" | "flat";
    initialYaw?: number;
    initialPitch?: number;
    initialZoom?: number;
    markers?: Array<{
      id: string;
      targetPointId: string;
      yaw: number;
      pitch: number;
      label: string;
    }>;
  };
  audio?: {
    en?: string;
    te?: string;
    hi?: string;
  };
  futureGuide?: {
    enabled: boolean;
    presenter?: {
      en?: string;
      te?: string;
      hi?: string;
    };
    captions?: {
      en?: string;
      te?: string;
      hi?: string;
    };
  };
};

type GuideContent = {
  mapImage?: string;
  welcome: {
    title: LocalizedText;
    subtitle: LocalizedText;
    audioFileName?: string;
  };
  icons: {
    icon: [
      { url: string; type: string },
    ],
    shortcut: string,
    apple: string,
  };
  tour: {
    title: LocalizedText;
    description: LocalizedText;
  };
  pointOrder: string[];
  points: GuidePoint[];
};

const LANGUAGES: Array<{ code: Language; label: string; nativeLabel: string }> = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
];

const AUDIO_MISSING_MESSAGE = "Audio for this point will be added soon.";
const CONTENT_ERROR_MESSAGE = "Campus guide content is not available right now.";
const MAP_ZOOM_SCALE = 2.5;

function localized(value: LocalizedText | undefined, language: Language, fallback = "") {
  return value?.[language] || value?.en || fallback;
}

const UI_STRINGS: Record<string, LocalizedText> = {
  exitApp: { en: "Exit App", te: "బయటకు వెళ్లండి", hi: "ऐप से बाहर निकलें" },
  explore: { en: "Explore Stmarys University", te: "సెయింట్ మేరీస్ యూనివర్సిటీని అన్వేషించండి", hi: "सेंट मैरीज़ यूनिवर्सिटी का अन्वेषण करें" },
  immersive: { en: "Immersive Campus Experience", te: "లీనమయ్యే క్యాంపస్ అనుభవం", hi: "इमर्सिव कैंपस अनुभव" },
  begin: { en: "Begin Journey", te: "ప్రయాణాన్ని ప్రారంభించండి", hi: "यात्रा शुरू करें" },
  chooseMode: { en: "Choose Your Mode", te: "మీ మోడ్‌ను ఎంచుకోండి", hi: "अपना మోడ్ సంప్రదించండి" },
  selectModeDesc: { en: "Select how you want to experience Stmarys University", te: "మీరు సెయింట్ మేరీస్ యూనివర్సిటీని ఎలా అనుభవించాలో ఎంచుకోండి", hi: "चुनें कि आप सेंट मैरीज़ यूनिवर्सिटी का अनुभव कैसे करना चाहते हैं" },
  physical: { en: "Physical Tour", te: "ఫిజికల్ టూర్", hi: "फिजिकल टूर" },
  virtual: { en: "Virtual Tour", te: "వర్చువల్ టూర్", hi: "वर्चुअल टूर" },
  physicalDesc: { en: "For visitors currently on campus with audio navigation.", te: "ఆడియో నావిగేషన్‌తో ప్రస్తుతం క్యాంపస్‌లో ఉన్న సందర్శకుల కోసం.", hi: "ऑडियो नेविगेशन के साथ वर्तमान में कैंपस में मौजूद आगंतुकों के लिए।" },
  virtualDesc: { en: "Explore from anywhere with high-res imagery.", te: "అధిక-రిజల్యూషన్ చిత్రాలతో ఎక్కడి నుండైనా అన్వేషించండి.", hi: "कहीं से भी हाई-रिसोल्यूशन इमेजरी के साथ अन्वेषण करें।" },
  selectLang: { en: "Select Language", te: "భాషను ఎంచుకోండి", hi: "भाषा चुनें" },
  langDesc: { en: "Available narrations for your tour", te: "మీ పర్యటన కోసం అందుబాటులో ఉన్న వివరణలు", hi: "आपके दौरे के लिए उपलब्ध वर्णन" },
  goBack: { en: "Go Back", te: "వెనక్కి వెళ్ళు", hi: "पीछे हटें" },
  ready: { en: "Ready to Start", te: "ప్రారంభించడానికి సిద్ధంగా ఉంది", hi: "शुरू करने के लिए तैयार" },
  startExp: { en: "Start Experience", te: "అనుభవాన్ని ప్రారంభించండి", hi: "अनुभव शुरू करें" },
  back: { en: "Back", te: "వెనుకకు", hi: "पीछे" },
  mode: { en: "Mode", te: "మోడ్", hi: "मोड" },
  voice: { en: "Voice", te: "వాయిస్", hi: "आवाज" },
  points: { en: "Points", te: "పాయింట్లు", hi: "बिंदु" },
  liveExp: { en: "Live Experience", te: "లైవ్ అనుభవం", hi: "లైవ్ అనుభవం" },
  interactiveMap: { en: "Interactive Satellite Map", te: "ఇంటరాక్టివ్ శాటిలైట్ మ్యాప్", hi: "इंटरैक्टिव सैटेलाइट मैप" },
  navigator: { en: "On-Ground Navigator", te: "ఆన్-గ్రౌండ్ నావిగేటర్", hi: "ऑन-ग्राउंड नेविगेटर" },
  virtualExp: { en: "Virtual Experience", te: "వర్చువల్ అనుభవం", hi: "वर्चुअल अनुभव" },
  activeMode: { en: "Institutional Mode active", te: "సంస్థాగత మోడ్ సక్రియంగా ఉంది", hi: "संस्थागत मोड सक्रिय" },
  progress: { en: "Global Progress", te: "మొత్తం పురోగతి", hi: "कुल प्रगति" },
  pointScript: { en: "Point Script", te: "పాయింట్ స్క్రిప్ట్", hi: "पॉइंट स्क्रिप्ट" },
  liveNarration: { en: "Live Narration", te: "లైవ్ నరేషన్", hi: "लाइव वर्णन" },
  selectPoint: { en: "Select a point to view its script.", te: "స్క్రిప్ట్‌ను చూడటానికి ఒక పాయింట్‌ని ఎంచుకోండి.", hi: "उसकी स्क्रिप्ट देखने के लिए एक बिंदु चुनें।" },
  routeQueue: { en: "Route Queue", te: "రూట్ క్యూ", hi: "रूट कतार" },
  landmarksFound: { en: "Landmarks Found", te: "ఆనవాళ్లు కనుగోనబడ్డాయి", hi: "स्थल मिले" },
  search: { en: "Search landmarks...", te: "ఆనవాళ్లను వెతకండి...", hi: "स्थल खोजें..." },
};

function validateGuide(data: unknown): GuideContent {
  const guide = data as GuideContent;
  if (
    !guide ||
    typeof guide !== "object" ||
    !guide.welcome ||
    !guide.tour ||
    !Array.isArray(guide.points) ||
    !Array.isArray(guide.pointOrder)
  ) {
    throw new Error("Invalid campus guide content");
  }
  return guide;
}

function pointAudioPath(language: Language, point?: GuidePoint) {
  if (point?.audio?.[language]) return point.audio[language];
  if (!point?.audioFileName) return "";
  return `/campus-guide/audio/${language}/common/${point.audioFileName}`;
}

type CampusFacts = {
  area: string;
  connectivity: string;
  facilities: string[];
  timing: string;
  gate: string;
  accessibility: string;
};

function getCampusFacts(pointId: string): CampusFacts {
  switch (pointId) {
    case "point-overview":
      return {
        area: "120 Acres Total",
        connectivity: "Gigabit Campus WiFi",
        facilities: ["Satellite Imaging", "Unified Security Hub", "Eco Green Belts"],
        timing: "08:00 AM - 08:00 PM",
        gate: "Gates 1, 2, & 3",
        accessibility: "Shuttle Transit Available"
      };
    case "point-1": // Main Entry Gate
      return {
        area: "Entry Security Plaza",
        connectivity: "Stmarys University Guest WiFi",
        facilities: ["Visitor Verification Check", "CCTV Integration", "Visitor Parking Zone"],
        timing: "24/7 Security Operations",
        gate: "Gate 1 (Main Highway Gate)",
        accessibility: "Wheelchair Ramp Ready"
      };
    case "point-22": // Main Block
      return {
        area: "65,000 sq.ft. Built-up",
        connectivity: "High Speed Fiber WiFi",
        facilities: ["Smart Classrooms", "Faculty Lounge", "Auditorium Access"],
        timing: "09:00 AM - 05:00 PM",
        gate: "Gate 1 (North Entrance)",
        accessibility: "Elevator & Braille Indicators"
      };
    case "point-7": // Central Library
      return {
        area: "3-Floor Complex",
        connectivity: "E-Resource Access Portal",
        facilities: ["RFID Book Checkout", "Dedicated Silent Zones", "E-catalogue Hub"],
        timing: "08:00 AM - 08:00 PM",
        gate: "Gate 1 (Adjacent to Admin)",
        accessibility: "Lift & Handrails Available"
      };
    case "point-6": // Sports Complex
      return {
        area: "10-Acre Outdoor Zone",
        connectivity: "Outdoor Access Points",
        facilities: ["Olympic Swimming Pool", "Tennis & Basketball Courts", "Gymnasium & Shower Rooms"],
        timing: "06:00 AM - 07:00 PM",
        gate: "Gate 2 (Sports Avenue)",
        accessibility: "Ground Level Access"
      };
    case "point-11": // Boys' Hostel
      return {
        area: "Residential Blocks",
        connectivity: "Hostel Dedicated WiFi",
        facilities: ["In-house Mess & Dining", "Recreation Lounge", "Laundry Services"],
        timing: "Curfew: 09:30 PM",
        gate: "Gate 3 (Residential Gate)",
        accessibility: "Elevator Equipped"
      };
    case "point-21": // Amphitheatre
      return {
        area: "1,500 Seating Capacity",
        connectivity: "Event Coverage WiFi",
        facilities: ["Acoustic Sound System", "Backstage Rooms", "Outdoor Lighting Rig"],
        timing: "Special Event Timings Only",
        gate: "Gate 1 (Central Plaza)",
        accessibility: "Wide Ramp Access"
      };
    case "point-clock-tower":
      return {
        area: "Central Landmark Ring",
        connectivity: "Stmarys University Hotspot Coverage",
        facilities: ["Heritage Brickwork", "Beautiful Landscape Gardens", "Night Illumination"],
        timing: "Open Public Landmark",
        gate: "Gate 1 (Central Pathway)",
        accessibility: "Paved Walkways"
      };
    case "point-16": // Admission Reception
      return {
        area: "Reception & Counseling Lounge",
        connectivity: "High Speed Fiber WiFi",
        facilities: ["Counseling Cabins", "Document Verification Hub", "Help Desk Center"],
        timing: "09:00 AM - 05:30 PM",
        gate: "Gate 1 (Main Entrance Hub)",
        accessibility: "Wheelchair Accessible Entrance"
      };
    default:
      return {
        area: "Academic Campus Area",
        connectivity: "Campus WiFi Enabled",
        facilities: ["Digital Classrooms", "CCTV Surveillance Area", "Pure Water Dispensers"],
        timing: "09:00 AM - 05:00 PM",
        gate: "Main Gate 1 Access",
        accessibility: "Standard Ramp Access"
      };
  }
}


function MissingImage({ title }: { title: string }) {
  return (
    <div className="flex h-full min-h-[180px] w-full items-center justify-center bg-[linear-gradient(135deg,#f0f9ff,#e0f2fe)] text-[#0d315c] border-2 border-dashed border-blue-100 rounded-lg">
      <div className="text-center p-6">
        <div className="relative mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-2xl bg-white shadow-sm">
          <FaMagic className="text-2xl text-[#019e6e] animate-pulse" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0d315c] opacity-40">Image Under Review</p>
        <p className="mt-1 text-sm font-black uppercase tracking-[0.1em] text-[#019e6e]">{title || "Campus image"}</p>
      </div>
    </div>
  );
}

function PointImage({ src, title }: { src?: string; title: string }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {!src || failed ? (
          <motion.div
            key="missing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <MissingImage title={title} />
          </motion.div>
        ) : (
          <motion.img
            key={src}
            src={src}
            alt={title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CampusGuide() {
  const [guide, setGuide] = useState<GuideContent | null>(null);
  const [contentError, setContentError] = useState(false);
  const [screen, setScreen] = useState<Screen>("welcome");
  const [language, setLanguage] = useState<Language>("en");
  const [tourType, setTourType] = useState<"physical" | "virtual">("physical");
  const [activePointId, setActivePointId] = useState("");
  const [footerMinimized, setFooterMinimized] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMessage, setAudioMessage] = useState("");
  const [endedAudio, setEndedAudio] = useState<{ kind: AudioKind; pointId?: string } | null>(null);
  const [mapFailed, setMapFailed] = useState(false);
  const [hyderabadTime, setHyderabadTime] = useState("");
  const [isMapZoomed, setIsMapZoomed] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioKindRef = useRef<AudioKind>("point");
  const audioPointIdRef = useRef<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScriptOpen, setIsScriptOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isPointsOpen, setIsPointsOpen] = useState(false);
  const [activeDetailsTab, setActiveDetailsTab] = useState<"narration" | "specs" | "logistics">("narration");


  const [showCinematic360, setShowCinematic360] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const bgm = new Audio("/assets/ambient-bgm.mp3");
    bgm.loop = true;
    bgm.volume = 0.12;
    bgm.preload = "auto";
    bgmRef.current = bgm;

    return () => {
      bgm.pause();
      bgmRef.current = null;
    };
  }, []);

  useEffect(() => {
    const bgm = bgmRef.current;
    if (!bgm) return;

    if (showCinematic360 && isBgmPlaying) {
      bgm.play().catch((err) => console.log("BGM play interrupted:", err));
    } else {
      bgm.pause();
    }
  }, [showCinematic360, isBgmPlaying]);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setHyderabadTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/campus-guide/data/guide.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Campus guide content missing");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setGuide(validateGuide(data));
      })
      .catch(() => {
        if (!cancelled) setContentError(true);
      });

  }, []);

  useEffect(() => {
    if (!guide || typeof window === "undefined") return;

    // 1. Preload the primary overview panorama (both preview and high-res) immediately
    const overviewPoint = guide.points.find(p => p.id === 'point-overview');
    if (overviewPoint?.panorama360?.src) {
      const overviewPreview = new Image();
      overviewPreview.src = overviewPoint.panorama360.src.replace('/panorama.jpg', '/preview.jpg');
      
      const overviewFull = new Image();
      overviewFull.src = overviewPoint.panorama360.src;
    }

    // 2. Preload only the low-res preview images for all other points in the background
    guide.points.forEach((point) => {
      if (point.id !== 'point-overview' && point.panorama360?.src) {
        const previewSrc = point.panorama360.src.replace('/panorama.jpg', '/preview.jpg');
        const previewImg = new Image();
        previewImg.src = previewSrc;
      }
    });
  }, [guide]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setAudioProgress(audio.currentTime);
        setAudioDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
      const ended = { kind: audioKindRef.current, pointId: audioPointIdRef.current };
      setEndedAudio(ended);
      
      if (ended.kind === "point" && ended.pointId) {
        setCompletedIds((current) => new Set(current).add(ended.pointId));
      }
    };
    const handleError = () => {
      setIsPlaying(false);
      if (audioKindRef.current === "point") {
        setAudioMessage(AUDIO_MISSING_MESSAGE);
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  const orderedPoints = useMemo(() => {
    if (!guide) return [];
    const byId = new Map(guide.points.map((point) => [point.id, point]));
    const ordered = guide.pointOrder
      .map((id) => byId.get(id))
      .filter((point): point is GuidePoint => 
        Boolean(point) && 
        Boolean(point.panorama360?.src)
      );
    return ordered;
  }, [guide]);

  const activeIndex = Math.max(
    0,
    orderedPoints.findIndex((point) => point.id === activePointId)
  );
  const activePoint = orderedPoints[activeIndex];
  const defaultOverviewPoint = orderedPoints.find(p => p.id === "point-overview") || orderedPoints[0];
  const currentPointForViewer = activePointId ? activePoint : defaultOverviewPoint;
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < orderedPoints.length - 1;
  const isTourComplete =
    orderedPoints.length > 0 && orderedPoints.every((point) => completedIds.has(point.id));
  const activeTitle = localized(activePoint?.title, language, "Campus point");
  const activeTranscript = localized(activePoint?.transcript, language);

  const progressPercentage = useMemo(() => {
    if (!orderedPoints.length) return 0;
    return Math.round((completedIds.size / orderedPoints.length) * 100);
  }, [completedIds.size, orderedPoints.length]);

  const filteredPoints = useMemo(() => {
    if (!searchQuery.trim()) return orderedPoints;
    const q = searchQuery.toLowerCase();
    return orderedPoints.filter((p) => {
      const title = localized(p.title, language).toLowerCase();
      return title.includes(q);
    });
  }, [orderedPoints, searchQuery, language]);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    setIsPlaying(false);
  };

  const playAudio = async ({
    src,
    kind,
    pointId,
    silentOnMissing = false,
  }: {
    src: string;
    kind: AudioKind;
    pointId?: string;
    silentOnMissing?: boolean;
  }) => {
    const audio = audioRef.current;
    if (!audio || !src) {
      if (!silentOnMissing) setAudioMessage(AUDIO_MISSING_MESSAGE);
      return;
    }

    audioKindRef.current = kind;
    audioPointIdRef.current = pointId;
    setAudioMessage("");
    setEndedAudio(null);

    const absoluteSrc = new URL(src, window.location.href).href;
    if (audio.src !== absoluteSrc) {
      audio.pause();
      audio.src = src;
      audio.load();
    }

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
      if (!silentOnMissing) setAudioMessage(AUDIO_MISSING_MESSAGE);
    }
  };

  const startTour = () => {
    const firstPoint = orderedPoints[0];
    setCompletedIds(new Set());
    
    if (firstPoint) {
      setActivePointId(firstPoint.id);
      setScreen("map");
      setIsMapZoomed(false);
      setShowTutorial(true); // Launch tutorial on first tour start
      setAudioMessage("");
      setEndedAudio(null);
      void playAudio({
        src: pointAudioPath(language, firstPoint),
        kind: "point",
        pointId: firstPoint.id,
      });
    } else {
      setScreen("map");
    }
  };

  const activatePoint = (pointId: string, langOverride?: Language) => {
    const point = orderedPoints.find((item) => item.id === pointId);
    stopAudio();
    setActivePointId(pointId);
    setAudioMessage("");
    setEndedAudio(null);
    setIsSidebarOpen(false); // Auto-close sidebar on mobile/interaction to clear map
    setIsMapZoomed(false); // Changed to false to show all points by default
    setActiveDetailsTab("narration");


    if (point) {
      const activeLang = langOverride || language;
      void playAudio({
        src: pointAudioPath(activeLang, point),
        kind: "point",
        pointId: point.id,
      });
      if (point.panorama360?.src) {
        setShowCinematic360(true);
        setIsBgmPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (!guide) return;
    const params = new URLSearchParams(window.location.search);
    const skip = params.get("skipIntro") === "true";
    const startPoint = params.get("point");
    const lang = params.get("lang");

    if (skip || startPoint) {
      setScreen("map");
      setTourType("virtual"); // Default to virtual tour when deep-linked
      
      const targetLang = (lang === "te" || lang === "hi" || lang === "en") ? (lang as Language) : language;
      if (lang && (lang === "te" || lang === "hi" || lang === "en")) {
        setLanguage(lang as Language);
      }

      if (startPoint) {
        const point = guide.points.find((p) => p.id === startPoint);
        if (point) {
          setTimeout(() => {
            activatePoint(startPoint, targetLang);
          }, 300);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guide]);

  const movePoint = (direction: -1 | 1) => {
    const nextPoint = orderedPoints[activeIndex + direction];
    if (nextPoint) activatePoint(nextPoint.id);
  };

  const playCurrentPoint = () => {
    if (!activePoint) return;
    const audio = audioRef.current;
    const src = pointAudioPath(language, activePoint);
    const absoluteSrc = src ? new URL(src, window.location.href).href : "";

    if (
      audio &&
      audio.src === absoluteSrc &&
      audio.currentTime > 0 &&
      !audio.ended
    ) {
      void audio.play().catch(() => setAudioMessage(AUDIO_MISSING_MESSAGE));
      return;
    }

    void playAudio({ src, kind: "point", pointId: activePoint.id });
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      return;
    }

    const audio = audioRef.current;
    if (audio?.src && audio.currentTime > 0 && !audio.ended) {
      void audio.play().catch(() => setAudioMessage(AUDIO_MISSING_MESSAGE));
      return;
    }

    playCurrentPoint();
  };

  if (contentError) {
    return (
      <main className="min-h-[60vh] bg-[#f8fbff] px-5 py-20">
        <div className="smru-container">
          <div className="cut-corner-panel border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(13,49,92,0.08)]">
            <p className="text-lg font-black text-[#0d315c]">{CONTENT_ERROR_MESSAGE}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!guide) {
    return (
      <main className="min-h-[60vh] bg-[#f8fbff] px-5 py-20">
        <div className="smru-container">
          <div className="h-56 animate-pulse cut-corner-panel bg-slate-100" />
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[5000] flex flex-col bg-white overflow-hidden font-outfit">
      {/* App Header / Navigation Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 md:px-8">
        <div className="flex items-center gap-3">
          <img src={logo.src} alt="St. Mary&apos;s University Logo" className="h-8 w-auto sm:h-10" />
          <div className="h-6 w-px bg-slate-200" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0d315c] sm:text-xs">
            Campus <span className="text-[#019e6e]">Expedition</span>
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => {
            stopAudio();
            window.location.href = "/";
          }}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#0d315c] transition hover:bg-red-50 hover:text-red-600 hover:border-red-100 sm:px-6 sm:py-2.5 sm:text-xs"
        >
          <span>{localized(UI_STRINGS.exitApp, language)}</span>
        </button>
      </header>

      {/* Main App Content Scroll Area */}
      <main className="flex-1 overflow-y-auto">
        {!guide ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#019e6e] border-t-transparent" />
            <p className="text-sm font-bold text-slate-500">Initializing Experience...</p>
          </div>
        ) : screen === "welcome" ? (
          <section className="relative flex min-h-full flex-col items-center justify-center p-6 text-center bg-[#f8fbff] overflow-hidden">
            {/* Ambient Background Radial Glows */}
            <div className="absolute inset-0 z-0 opacity-30 [background-image:radial-gradient(#019e6e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[50vw] h-[50vh] bg-[#019e6e]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[50vw] h-[50vh] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 max-w-4xl w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-[3rem] p-8 md:p-16 shadow-[0_32px_100px_rgba(13,49,92,0.08)] text-center flex flex-col items-center"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 border border-emerald-200/50 text-[10px] font-black uppercase tracking-widest text-[#019e6e] mb-6">
                <FaRegCompass className="animate-spin text-xs" style={{ animationDuration: '8s' }} /> Interactive Guide 2.0
              </span>
              
              <h1 className="text-4xl font-black text-[#0d315c] sm:text-7xl tracking-tight leading-none uppercase">
                {localized(UI_STRINGS.explore, language).split(" ")[0]} <span className="text-[#019e6e]">St. Mary&apos;s</span>
              </h1>
              <h2 className="text-3xl font-black text-[#0d315c] sm:text-5xl mt-1 tracking-tight leading-none uppercase">
                University
              </h2>
              
              <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-slate-400 max-w-lg leading-relaxed">
                {localized(UI_STRINGS.immersive, language)}
              </p>

              {/* Entrance Gate Widescreen Preview Card */}
              <div className="mt-8 relative h-48 w-full max-w-lg overflow-hidden rounded-3xl border border-white/50 shadow-2xl group/gate">
                <img 
                  src="/assets/Campus guide images/Main Gate.webp" 
                  alt="Stmarys University Main Gate" 
                  className="h-full w-full object-cover transition-transform duration-10000 group-hover/gate:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-6 text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Campus Entry</p>
                  <p className="text-sm font-black text-white uppercase tracking-wider">Main Gate &amp; Entrance Plaza</p>
                </div>
              </div>
              
              <button
                onClick={() => setScreen("tourType")}
                className="mt-10 group relative overflow-hidden rounded-full bg-[#0d315c] px-12 py-5 text-xs font-black uppercase tracking-widest text-white shadow-2xl transition-all hover:bg-[#019e6e] hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {localized(UI_STRINGS.begin, language)} <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-[#019e6e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>
          </section>
        ) : screen === "tourType" ? (
          <section className="relative flex min-h-full flex-col items-center justify-center p-6 bg-[#f8fbff] overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 z-0 opacity-30 [background-image:radial-gradient(#019e6e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[50vw] h-[50vh] bg-[#019e6e]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl">
              <div className="text-center mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#019e6e]">Expedition Modes</span>
                <h2 className="text-3xl font-black uppercase text-[#0d315c] mt-2 tracking-tight">{localized(UI_STRINGS.chooseMode, language)}</h2>
                <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{localized(UI_STRINGS.selectModeDesc, language)}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { id: "physical", icon: FaWalking, label: UI_STRINGS.physical, desc: UI_STRINGS.physicalDesc, tag: "ON-GROUND GPS NARRATOR" },
                  { id: "virtual", icon: FaDesktop, label: UI_STRINGS.virtual, desc: UI_STRINGS.virtualDesc, tag: "WIDESCREEN 360 THEATER" }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setTourType(type.id as any);
                      setScreen("language");
                    }}
                    className="group relative flex flex-col items-center rounded-[2.5rem] border border-slate-100 bg-white p-8 text-center shadow-[0_16px_40px_rgba(13,49,92,0.04)] transition-all duration-300 hover:border-[#019e6e]/40 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(1,158,110,0.08)] active:scale-[0.98] overflow-hidden"
                  >
                    <div className="absolute top-4 left-4 rounded-full bg-slate-50 px-3 py-1 text-[8px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                      {type.tag}
                    </div>
                    <div className="mb-6 mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-2xl text-[#0d315c] transition-all duration-300 group-hover:bg-[#019e6e] group-hover:text-white group-hover:scale-110 shadow-inner">
                      <type.icon />
                    </div>
                    <h3 className="text-lg font-black uppercase text-[#0d315c] tracking-tight">{localized(type.label, language)}</h3>
                    <p className="mt-3 text-xs font-semibold leading-relaxed text-slate-500 max-w-[260px]">{localized(type.desc, language)}</p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#019e6e] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Select Mode <FaChevronRight className="text-[8px] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : screen === "language" ? (
          <section className="relative flex min-h-full flex-col items-center justify-center p-6 bg-[#f8fbff] overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 z-0 opacity-30 [background-image:radial-gradient(#019e6e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl">
              <div className="text-center mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#019e6e]">Voice Settings</span>
                <h2 className="text-3xl font-black uppercase text-[#0d315c] mt-2 tracking-tight">{localized(UI_STRINGS.selectLang, language)}</h2>
                <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{localized(UI_STRINGS.langDesc, language)}</p>
              </div>

              <div className="grid gap-4">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setScreen("preview");
                    }}
                    className="group relative flex items-center justify-between overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-5 text-left shadow-[0_10px_30px_rgba(13,49,92,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#019e6e]/40 hover:shadow-[0_20px_40px_rgba(1,158,110,0.05)] active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 font-black text-xs text-[#0d315c] transition-colors group-hover:bg-[#019e6e] group-hover:text-white shadow-inner">
                        {l.code.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-base font-black text-[#0d315c] tracking-tight">{l.label}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{l.nativeLabel}</p>
                      </div>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-300 transition-all group-hover:bg-[#019e6e]/10 group-hover:text-[#019e6e] group-hover:translate-x-1">
                      <FaChevronRight className="text-xs" />
                    </div>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setScreen("tourType")}
                className="mt-8 w-full text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#0d315c] transition-colors"
              >
                {localized(UI_STRINGS.goBack, language)}
              </button>
            </div>
          </section>
        ) : screen === "preview" ? (
          <section className="smru-container py-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#019e6e]">{localized(UI_STRINGS.ready, language)}</span>
                <h2 className="mt-4 text-4xl font-black uppercase text-[#0d315c] md:text-5xl leading-none tracking-tight">
                  {localized(guide.welcome.title, language, "Stmarys Campus Guide")}
                </h2>
                <p className="mt-6 text-sm font-semibold leading-relaxed text-slate-600 md:text-base">
                  {localized(guide.welcome.subtitle, language)}
                </p>
                
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{localized(UI_STRINGS.mode, language)}</p>
                    <p className="mt-1 text-xs font-black text-[#0d315c] uppercase">{tourType}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{localized(UI_STRINGS.voice, language)}</p>
                    <p className="mt-1 text-xs font-black text-[#0d315c] uppercase">{LANGUAGES.find(l => l.code === language)?.label}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{localized(UI_STRINGS.points, language)}</p>
                    <p className="mt-1 text-xs font-black text-[#0d315c] uppercase">{orderedPoints.length} Stops</p>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={startTour}
                    className="group relative flex-1 overflow-hidden rounded-2xl bg-[#0d315c] py-6 text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-[#019e6e] hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {localized(UI_STRINGS.startExp, language)} <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                  <button
                    onClick={() => setScreen("language")}
                    className="rounded-2xl border border-slate-200 bg-white px-10 py-6 text-xs font-black uppercase tracking-widest text-[#0d315c] transition-all hover:bg-slate-50 active:scale-95"
                  >
                    {localized(UI_STRINGS.back, language)}
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[3rem] shadow-2xl ring-1 ring-slate-100/50 relative">
                  <img 
                    src="/assets/Campus guide images/campus-main.webp" 
                    alt="Campus Overview" 
                    className="h-full w-full object-cover transition-transform duration-[10000ms] hover:scale-110"
                  />
                  {/* Floating Stat Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/80 border border-white/60 p-6 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#019e6e] flex items-center justify-center text-white shadow-lg shadow-[#019e6e]/30 animate-pulse">
                        <FaMapMarkedAlt className="text-xl" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#019e6e]">{localized(UI_STRINGS.liveExp, language)}</p>
                        <p className="text-xs font-black text-[#0d315c] uppercase tracking-wide">{localized(UI_STRINGS.interactiveMap, language)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="smru-container relative pb-48 pt-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d315c] text-white shadow-lg">
                  {tourType === "physical" ? <FaWalking /> : <FaDesktop />}
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase text-[#0d315c]">
                    {tourType === "physical" ? localized(UI_STRINGS.navigator, language) : localized(UI_STRINGS.virtualExp, language)}
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#019e6e]">
                    {localized(UI_STRINGS.activeMode, language)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 rounded-2xl bg-[#f8fbff] px-6 py-3 ring-1 ring-slate-100">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{localized(UI_STRINGS.progress, language)}</span>
                  <div className="mt-1.5 h-1 w-32 overflow-hidden rounded-full bg-slate-200">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      className="h-full bg-[#019e6e]" 
                    />
                  </div>
                </div>
                <span className="text-xl font-black text-[#0d315c]">{progressPercentage}%</span>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div className="space-y-6">
                <div className="relative overflow-hidden border border-slate-100 bg-slate-900 shadow-2xl md:rounded-[3rem] aspect-[1200/760] w-full">
                  {/* High-Tech HUD Overlay */}
                  <div className="absolute left-6 top-6 z-40 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>🛰️ Interactive Aerial Tour</span>
                  </div>

                  {/* Primary 360° Interactive Canvas */}
                  {currentPointForViewer?.panorama360 && (
                    <Campus360Viewer 
                      panorama={currentPointForViewer.panorama360} 
                      onMarkerClick={(id) => activatePoint(id)}
                      isAutoRotating={!activePointId}
                    />
                  )}
                </div>

                {activePointId && activePoint && (
                  <article id="active-point-details" className="rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-xl scroll-mt-24 md:p-10 relative">
                    <button 
                      onClick={() => {
                        stopAudio();
                        setActivePointId("");
                      }}
                      className="absolute top-6 right-6 z-10 rounded-full bg-slate-100 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-red-50 hover:text-red-600 hover:ring-1 hover:ring-red-100 transition-all md:top-10 md:right-10"
                    >
                      Close
                    </button>
                    <div className="grid gap-10 mt-8 md:mt-0 md:grid-cols-[1.2fr_1fr]">
                      <div className="relative overflow-hidden rounded-[2rem] shadow-lg bg-slate-900 w-full aspect-[4/3] md:aspect-video mx-auto">
                        <PointImage 
                          src={
                            activePoint.panorama360?.src
                              ? activePoint.panorama360.src.replace('/panorama.jpg', '/preview.jpg')
                              : activePoint.image
                          } 
                          title={activeTitle} 
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#019e6e] text-[10px] font-black text-white">
                              {activeIndex + 1}
                            </span>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#019e6e]">Location Detail</p>
                          </div>
                          
                          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d315c] md:text-4xl pr-16 md:pr-0">
                            {activeTitle}
                          </h2>

                          {/* Tab Switcher */}
                          <div className="flex border-b border-slate-100 gap-6 mt-6 mb-4">
                            {[
                              { id: "narration", label: "Narration" },
                              { id: "specs", label: "Specs & Tech" },
                              { id: "logistics", label: "Visitor Info" }
                            ].map(tab => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveDetailsTab(tab.id as any)}
                                className={`pb-2 text-[10px] font-black uppercase tracking-widest relative transition-colors ${
                                  activeDetailsTab === tab.id ? "text-[#019e6e]" : "text-slate-400 hover:text-[#0d315c]"
                                }`}
                              >
                                {tab.label}
                                {activeDetailsTab === tab.id && (
                                  <motion.div 
                                    layoutId="activeTabUnderline" 
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#019e6e]" 
                                  />
                                )}
                              </button>
                            ))}
                          </div>

                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeDetailsTab + "_" + activePoint.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {activeDetailsTab === "narration" && (
                                <div className="mt-2">
                                  <div className="max-h-[220px] overflow-y-auto pr-4 text-xs font-semibold leading-relaxed text-slate-600 md:text-sm whitespace-pre-wrap">
                                    {activeTranscript}
                                  </div>
                                  {activePoint.panorama360?.src && (
                                    <button
                                      onClick={() => {
                                        setShowCinematic360(true);
                                        setIsBgmPlaying(true);
                                      }}
                                      className="mt-6 flex items-center gap-2 rounded-full bg-[#0d315c] px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-md hover:bg-[#019e6e] hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                      <FaDesktop /> View in Fullscreen 360° Theater
                                    </button>
                                  )}
                                </div>
                              )}

                              {activeDetailsTab === "specs" && (
                                <div className="mt-2 space-y-4">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100/50">
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Facility Area</p>
                                      <p className="text-[10px] font-black text-[#0d315c] mt-0.5 uppercase">{getCampusFacts(activePoint.id).area}</p>
                                    </div>
                                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100/50">
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Connectivity</p>
                                      <p className="text-[10px] font-black text-[#0d315c] mt-0.5 uppercase">{getCampusFacts(activePoint.id).connectivity}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">Technical Features</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {getCampusFacts(activePoint.id).facilities.map((fac, idx) => (
                                        <span key={idx} className="bg-emerald-50/70 text-[#019e6e] text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100/30">
                                          ✓ {fac}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {activeDetailsTab === "logistics" && (
                                <div className="mt-2 space-y-4">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100/50">
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Office Hours</p>
                                      <p className="text-[10px] font-black text-[#0d315c] mt-0.5 uppercase">{getCampusFacts(activePoint.id).timing}</p>
                                    </div>
                                    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100/50">
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Closest Gate</p>
                                      <p className="text-[10px] font-black text-[#0d315c] mt-0.5 uppercase">{getCampusFacts(activePoint.id).gate}</p>
                                    </div>
                                  </div>
                                  <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100/50">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Accessibility Transit</p>
                                    <p className="text-[10px] font-black text-[#0d315c] mt-0.5 uppercase">{getCampusFacts(activePoint.id).accessibility}</p>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div className="mt-6 border-t border-slate-50 pt-4">
                           <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Campus Highlights</p>
                           <div className="flex flex-wrap gap-1.5">
                              {["Smart Tech", "Secure Campus", "Accessible"].map(h => (
                                <span key={h} className="rounded-full bg-slate-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#0d315c] ring-1 ring-slate-100">{h}</span>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              </div>

              <aside className="space-y-6">
                <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0d315c]">Route Queue</h3>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-[10px] font-bold text-[#0d315c]">
                      {filteredPoints.length}
                    </div>
                  </div>
                  
                  <div className="relative mt-6">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      placeholder="Search landmarks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl bg-slate-50 py-4 pl-12 pr-4 text-base font-bold outline-none ring-1 ring-slate-100 focus:ring-[#019e6e]/30 md:text-xs"
                    />
                  </div>

                  <div className="mt-6 max-h-[500px] space-y-2 overflow-y-auto pr-1">
                    {filteredPoints.map((point) => {
                      const idx = orderedPoints.findIndex(p => p.id === point.id);
                      const status = point.id === activePoint?.id ? "active" : completedIds.has(point.id) ? "completed" : "upcoming";
                      return (
                        <button
                          key={point.id}
                          onClick={() => activatePoint(point.id)}
                          className={["flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all", status === "active" ? "border-[#019e6e] bg-[#019e6e]/5 shadow-sm" : "border-slate-50 bg-white hover:bg-slate-50"].join(" ")}
                        >
                          <span className={["flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black", status === "active" ? "bg-[#019e6e] text-white" : status === "completed" ? "bg-[#0d315c] text-white" : "bg-slate-100 text-slate-400"].join(" ")}>
                            {status === "completed" ? <FaCheck className="text-[8px]" /> : idx + 1}
                          </span>
                          <span className={["truncate text-xs font-bold", status === "active" ? "text-[#0d315c]" : "text-slate-500"].join(" ")}>{localized(point.title, language)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,#0d315c,#092342)] p-8 text-white shadow-2xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Hyderabad Hub</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl text-[#ffaf3a]">
                      <FaCloudSun />
                    </div>
                    <div>
                      <p className="text-2xl font-black">{hyderabadTime}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">32°C • Mostly Sunny</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}
      </main>

      {/* Persistent App Controller - Only visible during the active tour */}
      {screen === "map" && (
        <footer className="fixed inset-x-4 bottom-4 z-[6000] mx-auto max-w-2xl lg:inset-x-auto lg:right-8 lg:max-w-md">
          <div className={["rounded-[2.5rem] border border-white/60 bg-white/95 shadow-[0_30px_100px_rgba(13,49,92,0.3)] backdrop-blur-2xl transition-all duration-500", footerMinimized ? "p-2" : "p-4"].join(" ")}>
            
            {/* Minimal State Toggle */}
            <button 
              onClick={() => setFooterMinimized(!footerMinimized)}
              className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-12 items-center justify-center rounded-full bg-[#0d315c] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              {footerMinimized ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
            </button>

            {!footerMinimized && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 px-2 pt-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Expedition Timeline</span>
                  <span className="text-[10px] font-black text-[#019e6e]">{activeIndex + 1} / {orderedPoints.length}</span>
                </div>
                <div className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-slate-100">
                  {orderedPoints.map((p) => {
                    const status = p.id === activePoint?.id ? "active" : completedIds.has(p.id) ? "completed" : "upcoming";
                    return (
                      <button
                        key={p.id}
                        onClick={() => activatePoint(p.id)}
                        className={["h-full flex-1 transition-all duration-300", status === "active" ? "bg-[#019e6e] scale-y-150" : status === "completed" ? "bg-[#0d315c]" : "bg-slate-200"].join(" ")}
                      />
                    );
                  })}
                </div>
                {/* Audio Line */}
                <div className="relative mt-3 h-[1px] w-full bg-slate-100">
                  <motion.div animate={{ width: `${(audioProgress / (audioDuration || 1)) * 100}%` }} className="h-full bg-[#019e6e]" />
                </div>
              </motion.div>
            )}

            {/* Consolidated Navigation Pill - Single Line Sleek Design */}
            <div className={["flex items-center gap-2 rounded-full bg-white p-1 shadow-[0_10px_40px_rgba(0,0,0,0.1)] ring-1 ring-slate-100 transition-all duration-500", footerMinimized ? "w-full max-w-md mx-auto" : "w-full"].join(" ")}>
              
              {/* Navigation Group - Left */}
              <div className="flex items-center gap-1 px-1 shrink-0">
                <button
                  onClick={() => movePoint(-1)}
                  disabled={!hasPrevious}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-[#0d315c] transition-all hover:bg-slate-100 active:scale-90 disabled:opacity-20"
                >
                  <FaChevronLeft className="text-[10px]" />
                </button>
                
                <button
                  onClick={toggleAudio}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d315c] text-white shadow-lg transition-transform active:scale-95"
                >
                  {isPlaying ? <FaPause className="text-[10px]" /> : <FaPlay className="ml-0.5 text-[10px]" />}
                </button>

                <button
                  onClick={() => movePoint(1)}
                  disabled={!hasNext}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#019e6e] text-white shadow-md transition-all hover:opacity-90 active:scale-90 disabled:opacity-20"
                >
                  <FaChevronRight className="text-[10px]" />
                </button>
              </div>

              {/* Status & Info Center */}
              <div className="flex flex-1 items-center gap-3 overflow-hidden px-2 border-l border-slate-100">
                {/* Visual Audio Equalizer animation when playing */}
                {isPlaying ? (
                  <div className="flex items-end gap-0.5 h-3.5 shrink-0 px-1">
                    {[...Array(4)].map((_, i) => (
                      <span 
                        key={i} 
                        className="w-[2px] h-full bg-[#019e6e] rounded-full scale-y-[0.3] equalizer-bar"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center shrink-0 px-1 text-slate-300">
                    <FaVolumeUp className="text-[10px]" />
                  </div>
                )}

                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-[10px] font-black uppercase tracking-widest text-[#0d315c] leading-tight">{activeTitle}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="h-1 flex-1 max-w-[60px] rounded-full bg-slate-100 overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#019e6e]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(audioProgress / (audioDuration || 1)) * 100}%` }}
                      />
                    </div>
                    <p className="text-[8px] font-black text-slate-400 tabular-nums">
                      {Math.floor(audioProgress)}s / {Math.floor(audioDuration || 0)}s
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Toggle - Right */}
              <button 
                onClick={() => setFooterMinimized(!footerMinimized)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-50 transition-colors shrink-0"
              >
                <span className="text-[9px] font-black uppercase tracking-widest text-[#019e6e]">
                  {footerMinimized ? "Open" : "Close"}
                </span>
                <FaChevronUp className={["text-[8px] text-[#019e6e] transition-transform duration-500", !footerMinimized ? "rotate-180" : ""].join(" ")} />
              </button>
            </div>
            
            {!footerMinimized && activePoint && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 flex items-center gap-4 border-t border-slate-50 pt-4"
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                  <PointImage 
                    src={
                      activePoint.panorama360?.src
                        ? activePoint.panorama360.src.replace('/panorama.jpg', '/preview.jpg')
                        : activePoint.image
                    } 
                    title={activeTitle} 
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-xs font-black uppercase text-[#0d315c]">{activeTitle}</p>
                  <button 
                    onClick={() => document.getElementById("active-point-details")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-[9px] font-black text-[#019e6e] underline"
                  >
                    View Full Gallery
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </footer>
      )}

      {/* Tutorial Overlay */}
      {showTutorial && screen === "map" && (
        <TutorialOverlay onComplete={() => setShowTutorial(false)} />
      )}

 
      {/* Side Sticky Navigation & Tools - Only visible when tour is active (declutter onboarding) */}
      {screen === "map" && (
        <>
          {/* Script Sidebar - Left Side (Shifted Up for Mobile Accessibility) */}
          <div className="fixed left-0 top-[35%] z-[7000] -translate-y-1/2 pointer-events-none">
            <motion.div
              animate={{ x: isScriptOpen ? 0 : "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative flex items-center pointer-events-auto"
            >
              {/* Script Content Panel */}
              <div className="h-[60vh] w-[300px] sm:w-[320px] overflow-y-auto bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-slate-100 rounded-r-[2rem]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-black uppercase text-[#0d315c]">{localized(UI_STRINGS.pointScript, language)}</h2>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#019e6e]">{localized(UI_STRINGS.liveNarration, language)}</p>
                  </div>
                  <button onClick={() => setIsScriptOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-red-500 transition-colors">
                    <FaChevronLeft />
                  </button>
                </div>
                
                {activePoint ? (
                  <div className="space-y-6">
                    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-50 shadow-inner ring-1 ring-slate-100">
                      <PointImage 
                        src={
                          activePoint.panorama360?.src
                            ? activePoint.panorama360.src.replace('/panorama.jpg', '/preview.jpg')
                            : activePoint.image
                        } 
                        title={activeTitle} 
                      />
                    </div>
                    <div className="text-base sm:text-lg font-bold leading-relaxed text-slate-700 whitespace-pre-wrap">
                      {activeTranscript || "Script for this point is currently being updated."}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <FaMagic className="text-2xl text-slate-200 mb-4" />
                    <p className="text-xs font-bold text-slate-400">{localized(UI_STRINGS.selectPoint, language)}</p>
                  </div>
                )}
              </div>

              {/* Toggle Tab */}
              <button
                onClick={() => setIsScriptOpen(prev => !prev)}
                className={`absolute left-full flex h-24 w-11 flex-col items-center justify-center gap-3 border-y border-r border-white/10 shadow-[8px_0_25px_rgba(13,49,92,0.2)] transition-all duration-500 hover:w-13 active:scale-90 ${
                  isScriptOpen 
                    ? "bg-[#019e6e] rounded-r-[2rem]" 
                    : "bg-[#0d315c] rounded-r-2xl hover:bg-[#0d315c]/95"
                }`}
              >
                <div className={`transition-all duration-500 ${isScriptOpen ? "scale-125 rotate-[-12deg]" : "opacity-80"}`}>
                  <FaFileAlt className="text-lg text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90 [writing-mode:vertical-lr] rotate-180 py-1">
                  {localized(UI_STRINGS.pointScript, language).split(" ").pop()}
                </span>
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              </button>
            </motion.div>
          </div>

          {/* Location Points Sidebar - Left Side (Below Script) */}
          {!isScriptOpen && (
            <div className="fixed left-0 top-[55%] z-[7000] -translate-y-1/2 pointer-events-none">
              <motion.div
                animate={{ x: isPointsOpen ? 0 : "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative flex items-center pointer-events-auto"
              >
                {/* Points Content Panel */}
                <div className="h-[60vh] w-[300px] sm:w-[320px] overflow-y-auto bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-slate-100 rounded-r-[2rem]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-black uppercase text-[#0d315c]">{localized(UI_STRINGS.routeQueue, language)}</h2>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#019e6e]">{filteredPoints.length} {localized(UI_STRINGS.landmarksFound, language)}</p>
                    </div>
                    <button onClick={() => setIsPointsOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-red-500 transition-colors">
                      <FaChevronLeft />
                    </button>
                  </div>

                  <div className="relative mb-6">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
                    <input
                      type="text"
                      placeholder={localized(UI_STRINGS.search, language)}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 py-3 pl-10 pr-4 text-xs font-bold outline-none ring-1 ring-slate-100 focus:ring-[#019e6e]/30"
                    />
                  </div>

                  <div className="space-y-2 pr-1">
                    {filteredPoints.map((point) => {
                      const idx = orderedPoints.findIndex(p => p.id === point.id);
                      const status = point.id === activePoint?.id ? "active" : completedIds.has(point.id) ? "completed" : "upcoming";
                      return (
                        <button
                          key={point.id}
                          onClick={() => {
                            activatePoint(point.id);
                            if (window.innerWidth < 1024) setIsPointsOpen(false); // Close on mobile after selection
                          }}
                          className={["flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all", status === "active" ? "border-[#019e6e] bg-[#019e6e]/5 shadow-sm" : "border-slate-50 bg-white hover:bg-slate-50"].join(" ")}
                        >
                          <span className={["flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-black", status === "active" ? "bg-[#019e6e] text-white" : status === "completed" ? "bg-[#0d315c] text-white" : "bg-slate-100 text-slate-400"].join(" ")}>
                            {status === "completed" ? <FaCheck className="text-[7px]" /> : idx + 1}
                          </span>
                          <span className={["truncate text-[11px] font-bold", status === "active" ? "text-[#0d315c]" : "text-slate-500"].join(" ")}>{localized(point.title, language)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toggle Tab */}
                <button
                  onClick={() => setIsPointsOpen(prev => !prev)}
                  className={`absolute left-full flex h-24 w-11 flex-col items-center justify-center gap-3 border-y border-r border-white/10 shadow-[8px_0_25px_rgba(13,49,92,0.2)] transition-all duration-500 hover:w-13 active:scale-90 ${
                    isPointsOpen 
                      ? "bg-[#019e6e] rounded-r-[2rem]" 
                      : "bg-[#0d315c] rounded-r-2xl hover:bg-[#0d315c]/95"
                  }`}
                >
                  <div className={`transition-all duration-500 ${isPointsOpen ? "scale-125 rotate-[-12deg]" : "opacity-80"}`}>
                    <FaMapMarkerAlt className="text-lg text-white" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90 [writing-mode:vertical-lr] rotate-180 py-1">
                    Points
                  </span>
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                </button>
              </motion.div>
            </div>
          )}

          {/* Collapsible Action Sidebar - Zero Gap Sticky */}
          <div className="fixed right-0 top-1/2 z-[7000] -translate-y-1/2 pointer-events-none">
            <motion.div
              animate={{ x: isSidebarOpen ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative flex items-center pointer-events-auto"
            >
              {/* Toggle Arrow - Perfectly Flush to Right-Full */}
              <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className={`absolute right-full flex h-24 w-11 flex-col items-center justify-center gap-3 border-y border-l border-white/10 shadow-[-8px_0_25px_rgba(13,49,92,0.2)] transition-all duration-500 hover:w-13 active:scale-90 ${
                  isSidebarOpen 
                    ? "bg-[#019e6e] rounded-l-[2rem]" 
                    : "bg-[#0d315c] rounded-l-2xl hover:bg-[#0d315c]/95"
                }`}
              >
                <div className={`transition-all duration-500 ${isSidebarOpen ? "scale-125 rotate-[12deg]" : "opacity-80"}`}>
                  <FaThLarge className="text-lg text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90 [writing-mode:vertical-lr] py-1">
                  Tools
                </span>
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              </button>

              {/* Action Buttons - Compact Website Style */}
              <div className="flex flex-col gap-1 p-1 pr-0">
                {[
                  { icon: <FaWhatsapp />, label: "WHATSAPP", color: "#d1f9d6", text: "#1b5e20", href: "https://wa.me/919493321969" },
                  { icon: <FaPhoneAlt />, label: "CALL US", color: "#fff9c4", text: "#827717", href: "tel:08065459645" },
                  { icon: <FaPaperPlane />, label: "APPLY", color: "#e3f2fd", text: "#0d47a1", href: "https://apply.smru.edu.in" },
                  { icon: <FaQuestionCircle />, label: "ENQUIRY", color: "#ffe0b2", text: "#e65100", href: "https://smru.edu.in/contact" },
                  { icon: <FaFileDownload />, label: "BROCHURE", color: "#ffcdd2", text: "#b71c1c", href: "#" },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      backgroundColor: action.color, 
                      color: action.text,
                      clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)"
                    }}
                    className="group flex h-16 w-16 flex-col items-center justify-center gap-1 shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <div className="text-xl transition-transform group-hover:scale-110">{action.icon}</div>
                    <span className="text-[7px] font-black uppercase tracking-tight text-center px-1">{action.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* Next-Level Cinematic 360 Theater Overlay */}
      <AnimatePresence>
        {showCinematic360 && activePoint?.panorama360 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[8000] flex flex-col md:flex-row bg-[#050b14] overflow-hidden font-outfit"
          >
            {/* Blurred Breathing Ambient Background Canvas (Only on Mobile) */}
            <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none opacity-35 md:hidden">
              <motion.img 
                src={activePoint.image || activePoint.panorama360.src}
                alt="" 
                className="h-full w-full object-cover blur-3xl scale-125"
                animate={{
                  scale: [1.25, 1.35, 1.25],
                  opacity: [0.3, 0.45, 0.3]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Desktop Left Sidebar Panel */}
            <div className="hidden md:flex md:w-[380px] shrink-0 bg-slate-950/70 border-r border-white/10 flex-col p-8 z-20 justify-between select-none relative h-full backdrop-blur-2xl">
              {/* Blurred background image detail */}
              <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
                <img src={activePoint.image || activePoint.panorama360.src} alt="" className="w-full h-full object-cover blur-xl scale-110" />
                <div className="absolute inset-0 bg-slate-950/85" />
              </div>
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-[#019e6e]/10 rounded-full blur-[60px] pointer-events-none z-0" />
              <div className="absolute top-0 left-0 w-36 h-36 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none z-0" />

              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <img src={logo.src} alt="Logo" className="h-6 w-auto" />
                  <div className="h-4 w-px bg-white/20" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#019e6e]">360° Theater</span>
                </div>

                {/* Current Exploration info */}
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#019e6e] text-[8px] font-black text-white">
                      {activeIndex + 1}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Location {activeIndex + 1} of {orderedPoints.length}</span>
                  </div>
                  <h2 className="text-xl font-black uppercase text-white tracking-tight leading-tight pt-1">{activeTitle}</h2>
                </div>

                {/* Narration script details */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[9px] font-black uppercase tracking-wider text-[#019e6e]">Narration Script</h4>
                  <div className="overflow-y-auto text-xs leading-relaxed text-slate-300 pr-1 select-text scrollbar-thin scrollbar-thumb-white/10 max-h-[35vh]">
                    {activeTranscript || "Explore this beautiful learning space."}
                  </div>
                </div>
              </div>

              {/* Audio narration visualizer & controllers */}
              <div className="relative z-10 pt-4 border-t border-white/10 space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 shadow-inner">
                  {isPlaying && (
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit select-none">
                      <span className="text-[8px] font-black uppercase tracking-wider text-[#019e6e]">Narrating</span>
                      {[...Array(6)].map((_, i) => (
                        <span 
                          key={i} 
                          className="w-[2px] h-3 bg-[#019e6e] rounded-full scale-y-[0.3] equalizer-bar"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleAudio}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0d315c] shadow-lg hover:scale-105 active:scale-95 transition-all"
                      >
                        {isPlaying ? <FaPause className="text-[10px]" /> : <FaPlay className="ml-0.5 text-[10px]" />}
                      </button>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/80">Voice Narration</p>
                        <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Stmarys University Guide</p>
                      </div>
                    </div>

                    {/* BGM Toggle */}
                    <button
                      onClick={() => setIsBgmPlaying(!isBgmPlaying)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs shadow-lg transition-all active:scale-90 ${
                        isBgmPlaying 
                          ? "bg-[#019e6e]/20 border-[#019e6e] text-[#019e6e]" 
                          : "bg-black/45 border-white/10 text-white/60 hover:text-white"
                      }`}
                      title="Toggle Music"
                    >
                      <FaMusic className={isBgmPlaying ? "animate-spin" : ""} style={{ animationDuration: '4s' }} />
                    </button>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => movePoint(-1)}
                    disabled={!hasPrevious}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <FaChevronLeft className="text-[10px]" /> Prev
                  </button>
                  <button
                    onClick={() => movePoint(1)}
                    disabled={!hasNext}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#019e6e] text-xs font-black uppercase tracking-widest text-white hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md shadow-[#019e6e]/20"
                  >
                    Next <FaChevronRight className="text-[10px]" />
                  </button>
                </div>

                {/* WhatsApp & Online Apply */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://wa.me/919493321969"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 bg-[#d1f9d6] text-[#1b5e20] rounded-xl font-black text-[9px] uppercase tracking-widest text-center active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    <FaWhatsapp className="text-sm" /> WhatsApp
                  </a>
                  <a
                    href="https://apply.smru.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 bg-emerald-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest text-center active:scale-95 transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-500/10"
                  >
                    <FaPaperPlane className="text-[9px]" /> Apply Online
                  </a>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setShowCinematic360(false)}
                  className="w-full py-3.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl font-black text-[9px] uppercase tracking-widest text-center active:scale-95 transition-all mt-2"
                >
                  ✕ Close Theater
                </button>
              </div>
            </div>

            {/* Desktop Full-Screen Widescreen 360 Canvas Panel & Mobile Immersive View */}
            <div className="flex-1 h-full relative bg-slate-950 flex flex-col items-center justify-center">
              {/* WebGL Canvas fills container */}
              <div className="absolute inset-0 w-full h-full z-10">
                <Campus360Viewer 
                  panorama={activePoint.panorama360} 
                  onMarkerClick={(id) => activatePoint(id)}
                  isAutoRotating={true}
                />
              </div>

              {/* Vignette overlays for aesthetic look */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-20" />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20" />

              {/* Mobile-Only Overlay Interface */}
              <div className="md:hidden absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4">
                {/* Mobile Top Header */}
                <div className="flex items-center justify-between w-full pointer-events-auto">
                  <div className="flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-white shadow-lg">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#019e6e] text-[8px] font-black">
                      {activeIndex + 1}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider max-w-[120px] truncate">
                      {activeTitle}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsBgmPlaying(!isBgmPlaying)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs shadow-lg backdrop-blur-md transition-all active:scale-90 ${
                        isBgmPlaying ? "bg-[#019e6e]/20 border-[#019e6e] text-[#019e6e]" : "bg-black/50 border-white/10 text-white/80"
                      }`}
                    >
                      <FaMusic className={isBgmPlaying ? "animate-spin" : ""} />
                    </button>
                    <button
                      onClick={() => setShowCinematic360(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/80 shadow-lg backdrop-blur-md"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Mobile Navigation Chevrons */}
                <div className="flex items-center justify-between w-full pointer-events-none px-2">
                  <button
                    onClick={() => movePoint(-1)}
                    disabled={!hasPrevious}
                    className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/80 disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => movePoint(1)}
                    disabled={!hasNext}
                    className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#019e6e]/85 border border-[#019e6e]/40 text-white disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <FaChevronRight />
                  </button>
                </div>

                {/* Mobile Bottom Card */}
                <div className="w-full pointer-events-auto flex flex-col gap-2">
                  {isPlaying && (
                    <div className="flex items-center justify-center gap-1 bg-black/45 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 w-fit mx-auto">
                      <span className="text-[8px] font-black uppercase tracking-wider text-[#019e6e]">Narrating</span>
                    </div>
                  )}

                  <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md p-4 text-white shadow-xl flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[9px] font-black uppercase text-[#019e6e] tracking-widest">Exploring</h4>
                        <h3 className="text-sm font-black uppercase text-white mt-0.5 leading-tight">{activeTitle}</h3>
                      </div>
                      <button
                        onClick={toggleAudio}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0d315c] shadow-lg"
                      >
                        {isPlaying ? <FaPause className="text-[9px]" /> : <FaPlay className="ml-0.5 text-[9px]" />}
                      </button>
                    </div>

                    <div className="max-h-[80px] overflow-y-auto text-[10px] leading-relaxed text-slate-300 pr-1 select-text scrollbar-thin scrollbar-thumb-white/10">
                      {activeTranscript || "Explore this beautiful learning space."}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-1">
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[7px] font-black uppercase tracking-wider text-slate-400">
                        360° WEBGL
                      </span>
                      <div className="flex items-center gap-1 text-[7px] font-black uppercase text-slate-400">
                        <span>Swipe to look around</span>
                        <FaHandPointer />
                      </div>
                    </div>

                    {/* Quick Contact & Action Widgets Mobile */}
                    <div className="flex gap-2 pt-1">
                      <a
                        href="https://wa.me/919493321969"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 bg-[#d1f9d6] text-[#1b5e20] rounded-xl font-black text-[8px] uppercase tracking-widest text-center flex items-center justify-center gap-1"
                      >
                        <FaWhatsapp className="text-[10px]" /> WhatsApp
                      </a>
                      <a
                        href="https://apply.smru.edu.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 bg-[#25b895] text-white rounded-xl font-black text-[8px] uppercase tracking-widest text-center flex items-center justify-center gap-1"
                      >
                        <FaPaperPlane className="text-[9px]" /> Apply
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop-Only Overlay Info Box */}
              <div className="hidden md:flex absolute top-6 right-6 z-20 items-center gap-2 pointer-events-auto">
                <span className="rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-slate-300">
                  Widescreen Mode
                </span>
                <span className="rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1">
                  Drag to Look around <FaHandPointer className="text-xs" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

// --- Tutorial Component ---
const TutorialOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { 
      title: "Welcome to the Tour", 
      text: "Experience our 120-acre campus in full detail. Let's take a quick look at the controls.",
      icon: <FaMapMarkedAlt className="text-4xl text-[#0d315c]" />
    },
    { 
      title: "Interactive Map", 
      text: "Click on any point to hear its story. You can drag the map to explore different zones.",
      icon: <FaHandPointer className="text-4xl text-[#019e6e]" />
    },
    { 
      title: "Follow the Script", 
      text: "The button on the left edge opens the full narration script if you'd like to read along.",
      icon: <FaFileAlt className="text-4xl text-[#0d315c]" />
    },
    { 
      title: "Connect with Us", 
      text: "Need help? The right sidebar has quick links for Admissions, WhatsApp, and Call support.",
      icon: <FaHeadset className="text-4xl text-[#019e6e]" />
    }
  ];

  const current = steps[step];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0d315c]/40 backdrop-blur-xl p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-100">
          <motion.div 
            className="h-full bg-[#019e6e]"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="mb-8 flex justify-center">{current.icon}</div>
        
        <h3 className="text-2xl font-black text-[#0d315c] mb-4 uppercase tracking-tight">
          {current.title}
        </h3>
        
        <p className="text-slate-600 font-semibold leading-relaxed mb-10">
          {current.text}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-[#0d315c]" : "w-1.5 bg-slate-200"}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (step < steps.length - 1) setStep(step + 1);
              else onComplete();
            }}
            className="bg-[#019e6e] text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#0d315c] transition-colors shadow-lg shadow-[#019e6e]/20"
          >
            {step < steps.length - 1 ? "Next" : "Got it!"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
