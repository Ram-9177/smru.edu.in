export type CampusTourLanguage = "en" | "hi" | "te";

export type CampusTourCategory =
  | "overview"
  | "academics"
  | "admissions"
  | "facilities"
  | "student-life"
  | "sports";

export type LocalizedCampusText = Record<CampusTourLanguage, string>;

export type CampusTourLocation = {
  id: string;
  slug: string;
  category: CampusTourCategory;
  title: LocalizedCampusText;
  panoramaSrc: string;
  previewSrc: string;
  projection: "equirectangular" | "flat";
};

export const CAMPUS_TOUR_LANGUAGES: Array<{
  code: CampusTourLanguage;
  label: string;
}> = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "te", label: "తెలుగు" },
];

export const CAMPUS_TOUR_CATEGORIES: Array<{
  id: "all" | CampusTourCategory;
  label: LocalizedCampusText;
}> = [
  { id: "all", label: { en: "All", hi: "सभी", te: "అన్నీ" } },
  { id: "overview", label: { en: "Campus", hi: "परिसर", te: "క్యాంపస్" } },
  { id: "academics", label: { en: "Academics", hi: "शैक्षणिक", te: "అకాడెమిక్స్" } },
  { id: "admissions", label: { en: "Admissions", hi: "प्रवेश", te: "అడ్మిషన్స్" } },
  { id: "facilities", label: { en: "Facilities", hi: "सुविधाएँ", te: "సదుపాయాలు" } },
  { id: "student-life", label: { en: "Student Life", hi: "छात्र जीवन", te: "విద్యార్థి జీవితం" } },
  { id: "sports", label: { en: "Sports", hi: "खेल", te: "క్రీడలు" } },
];

const location = (
  slug: string,
  category: CampusTourCategory,
  title: LocalizedCampusText,
  projection: CampusTourLocation["projection"] = "equirectangular",
): CampusTourLocation => ({
  id: `location-${slug}`,
  slug,
  category,
  title,
  panoramaSrc: `/campus-360/${slug}/panorama.jpg`,
  previewSrc: `/campus-360/${slug}/preview.jpg`,
  projection,
});

export const CAMPUS_TOUR_INTRO_LOCATION = location(
  "main-entrance-and-campus-overview",
  "overview",
  {
    en: "Main Entrance & Campus Overview",
    hi: "मुख्य प्रवेश और परिसर अवलोकन",
    te: "ప్రధాన ప్రవేశం మరియు క్యాంపస్ అవలోకనం",
  },
  "flat",
);

export const CAMPUS_TOUR_LOCATIONS: CampusTourLocation[] = [
  location("entry-gate", "overview", {
    en: "Entry Gate",
    hi: "प्रवेश द्वार",
    te: "ప్రవేశ ద్వారం",
  }),
  location("main-block", "academics", {
    en: "Main Block",
    hi: "मुख्य ब्लॉक",
    te: "ప్రధాన బ్లాక్",
  }),
  location("class-room", "academics", {
    en: "Classroom",
    hi: "कक्षा",
    te: "తరగతి గది",
  }),
  location("clock-tower", "overview", {
    en: "Clock Tower",
    hi: "घंटाघर",
    te: "గడియార గోపురం",
  }),
  location("a-t-m-facility", "facilities", {
    en: "ATM Facility",
    hi: "एटीएम सुविधा",
    te: "ఏటీఎం సదుపాయం",
  }),
  location("multi-disciplinary-play-and-fitness-complex", "sports", {
    en: "Multi-Disciplinary Play & Fitness Complex",
    hi: "बहुविषयक खेल और फिटनेस परिसर",
    te: "బహుళ విభాగాల క్రీడా మరియు ఫిట్‌నెస్ సముదాయం",
  }),
  location("central-library", "academics", {
    en: "Central Library",
    hi: "केंद्रीय पुस्तकालय",
    te: "కేంద్ర గ్రంథాలయం",
  }),
  location("cricket-ground-gymnasium-and-indoor-games", "sports", {
    en: "Cricket Ground, Gymnasium & Indoor Games",
    hi: "क्रिकेट मैदान, व्यायामशाला और इनडोर खेल",
    te: "క్రికెట్ మైదానం, వ్యాయామశాల మరియు ఇండోర్ గేమ్స్",
  }),
  location("hostel-block", "student-life", {
    en: "Hostel Block",
    hi: "छात्रावास ब्लॉक",
    te: "హాస్టల్ బ్లాక్",
  }),
  location("university-block", "academics", {
    en: "University Block",
    hi: "विश्वविद्यालय ब्लॉक",
    te: "యూనివర్సిటీ బ్లాక్",
  }),
  location("rehab-block-and-hospital", "facilities", {
    en: "Rehab Block & Hospital",
    hi: "पुनर्वास ब्लॉक और अस्पताल",
    te: "రిహాబిలిటేషన్ బ్లాక్ మరియు ఆసుపత్రి",
  }),
  location("amphitheatre", "student-life", {
    en: "Amphitheatre",
    hi: "मुक्ताकाश रंगमंच",
    te: "ఓపెన్ ఎయిర్ అంఫీథియేటర్",
  }),
  location("swimming-pool", "sports", {
    en: "Swimming Pool",
    hi: "तरणताल",
    te: "ఈత కొలను",
  }),
  location("admission-room-outside", "admissions", {
    en: "Outside Admission Office",
    hi: "प्रवेश कार्यालय के बाहर",
    te: "అడ్మిషన్ కార్యాలయం వెలుపల",
  }),
  location("admission-room-2", "admissions", {
    en: "Admission Counselling Room 2",
    hi: "प्रवेश परामर्श कक्ष 2",
    te: "అడ్మిషన్ కౌన్సెలింగ్ గది 2",
  }),
  location("board-roomconference-hall", "academics", {
    en: "Board Room / Conference Hall",
    hi: "बोर्ड रूम / सम्मेलन कक्ष",
    te: "బోర్డు రూమ్ / కాన్ఫరెన్స్ హాల్",
  }),
  location("m-b-a-and-law-block", "academics", {
    en: "MBA & Law Block",
    hi: "एमबीए और विधि ब्लॉक",
    te: "ఎంబీఏ మరియు లా బ్లాక్",
  }),
  location("conference-halls", "academics", {
    en: "Conference Hall",
    hi: "सम्मेलन कक्ष",
    te: "కాన్ఫరెన్స్ హాల్",
  }),
  location("sensory-park", "facilities", {
    en: "Sensory Park",
    hi: "संवेदी उद्यान",
    te: "సెన్సరీ పార్క్",
  }),
  location("student-life", "student-life", {
    en: "Student Life",
    hi: "छात्र जीवन",
    te: "విద్యార్థి జీవితం",
  }, "flat"),
  location("a-one-block", "academics", {
    en: "A One Block",
    hi: "ए वन ब्लॉक",
    te: "ఏ వన్ బ్లాక్",
  }, "flat"),
  location("signing-off", "overview", {
    en: "Tour Conclusion",
    hi: "यात्रा समापन",
    te: "పర్యటన ముగింపు",
  }),
];

const UNLISTED_CAMPUS_LOCATIONS = [
  location("admission-room", "admissions", {
    en: "Admission Office",
    hi: "प्रवेश कार्यालय",
    te: "అడ్మిషన్ కార్యాలయం",
  }),
  location("admission-enroll-room", "admissions", {
    en: "Admission Enrolment Room",
    hi: "प्रवेश नामांकन कक्ष",
    te: "అడ్మిషన్ నమోదు గది",
  }),
  location("canteen-area", "student-life", {
    en: "Canteen Area",
    hi: "कैंटीन क्षेत्र",
    te: "క్యాంటీన్ ప్రాంగణం",
  }, "flat"),
];

export const CAMPUS_TOUR_LOCATION_MAP = new Map(
  [CAMPUS_TOUR_INTRO_LOCATION, ...CAMPUS_TOUR_LOCATIONS, ...UNLISTED_CAMPUS_LOCATIONS]
    .map((item) => [item.slug, item]),
);

const CAMPUS_TOUR_AUDIO_FILES: Partial<
  Record<string, string | Partial<Record<CampusTourLanguage, string>>>
> = {
  "main-entrance-and-campus-overview": "main-entrance-combined.mp3",
  "entry-gate": {
    en: "entry-gate.mp3",
    hi: "entry-gate.mp3",
    te: "entry-gate-combined.mp3",
  },
  "main-block": "main-block.mp3",
  "a-t-m-facility": "atm-facility.mp3",
  "multi-disciplinary-play-and-fitness-complex": "play-fitness-complex.mp3",
  "central-library": "central-library.mp3",
  "cricket-ground-gymnasium-and-indoor-games": "cricket-ground.mp3",
  "hostel-block": "hostel-block-ground.mp3",
  "university-block": "university-block.mp3",
  "rehab-block-and-hospital": "rehab-block.mp3",
  amphitheatre: "amphitheatre.mp3",
  "swimming-pool": "swimming-pool.mp3",
  "m-b-a-and-law-block": "mba-law-block.mp3",
  "sensory-park": "sensory-park.mp3",
  "student-life": "student-cafeteria.mp3",
  "a-one-block": "a-one-block.mp3",
  "signing-off": "signing-off.mp3",
};

export function campusTourAudioSrc(
  locationSlug: string,
  language: CampusTourLanguage,
) {
  const audioFile = CAMPUS_TOUR_AUDIO_FILES[locationSlug];
  const fileName = typeof audioFile === "string" ? audioFile : audioFile?.[language];
  return fileName ? `/campus-guide/audio/${language}/common/${fileName}` : "";
}

export function campusTourText(
  text: LocalizedCampusText,
  language: CampusTourLanguage,
) {
  return text[language] || text.en;
}
