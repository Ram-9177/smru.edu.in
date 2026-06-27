/**
 * connect_languages.js
 * Copies EN / HI / TE audio to public/campus-guide/audio/{lang}/common/
 * and patches every guide.json point with { audio: { en, hi, te } }
 */
const fs   = require("fs");
const path = require("path");

const ROOT   = path.resolve(__dirname, "..");
const AUDIO  = path.join(ROOT, "src/360/Audio");
const PUBLIC = path.join(ROOT, "public/campus-guide/audio");
const GUIDE  = path.join(ROOT, "public/campus-guide/data/guide.json");

// ─── 1. Build filename → deployed-slug mapping ──────────────────────────────

// English source  →  slug in /en/common/
const EN_MAP = {
  "Entry Gate.mp3":                                "entry-gate.mp3",
  "Main Entrance and Campus Overview.mp3":         "main-entrance-combined.mp3",
  "Multi-Disciplinary Play and Fitness Complex.mp3":"play-fitness-complex.mp3",
  "Central Library.mp3":                           "central-library.mp3",
  "M B A and Law Block.mp3":                       "mba-law-block.mp3",
  "A T M Facility.mp3":                            "atm-facility.mp3",
  "Hostel Block.mp3":                              "hostel-block-ground.mp3",
  "Main Block..mp3":                               "main-block.mp3",
  "University Block.mp3":                          "university-block.mp3",
  "Rehab Block and Hospital.mp3":                  "rehab-block.mp3",
  "Sensory Park.mp3":                              "sensory-park.mp3",
  "Swimming Pool.mp3":                             "swimming-pool.mp3",
  "Amphitheatre.mp3":                              "amphitheatre.mp3",
  "Sign Off.mp3":                                  "signing-off.mp3",
  "Canteen area.mp3":                              "student-cafeteria.mp3",
  "Rent a Bike Facility.mp3":                      "electric-bikes.mp3",
  "Cricket Ground, Gymnasium, and Indoor Games.mp3":"cricket-ground.mp3",
  "A One Block.mp3":                               "a-one-block.mp3",
};

// Hindi source (has " Hindi" suffix)  →  slug in /hi/common/
const HI_MAP = {
  "Entry Gate Hindi.mp3":                                          "entry-gate.mp3",
  "Main Entrance and Campus Overview Hindi.mp3":                   "main-entrance-combined.mp3",
  "Multi-Disciplinary Play and Fitness Complex Hindi.mp3":         "play-fitness-complex.mp3",
  "Central Library Hindi.mp3":                                     "central-library.mp3",
  "M B A and Law Block Hindi.mp3":                                 "mba-law-block.mp3",
  "A T M Facility Hindi.mp3":                                      "atm-facility.mp3",
  "Hostel Block Hindi.mp3":                                        "hostel-block-ground.mp3",
  "Main Block Hindi.mp3":                                          "main-block.mp3",
  "University Block Hindi.mp3":                                    "university-block.mp3",
  "Rehab Block and Hospital Hindi.mp3":                            "rehab-block.mp3",
  "Sensory Park Hindi.mp3":                                        "sensory-park.mp3",
  "Swimming Pool Hindi.mp3":                                       "swimming-pool.mp3",
  "Amphitheatre Hindi.mp3":                                        "amphitheatre.mp3",
  "Sign Off Hindi.mp3":                                            "signing-off.mp3",
  "Canteen Hindi.mp3":                                             "student-cafeteria.mp3",
  "Rent a Bike Facility Hindi.mp3":                                "electric-bikes.mp3",
  "Cricket Ground, Gymnasium, and Indoor Games Hindi.mp3":         "cricket-ground.mp3",
  "A One Block Hindi.mp3":                                         "a-one-block.mp3",
};

// Telugu – already has good slugs in /te/common/  (already deployed, just verify)
// We only need to ensure the point-audio mapping uses the right slug.

// ─── 2. Copy files ───────────────────────────────────────────────────────────

function copyAudio(srcDir, fileMap, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  let copied = 0, missing = 0;
  for (const [srcName, destSlug] of Object.entries(fileMap)) {
    const src  = path.join(srcDir, srcName);
    const dest = path.join(destDir, destSlug);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`  ✓ ${srcName} → ${destSlug}`);
      copied++;
    } else {
      console.warn(`  ✗ MISSING: ${srcName}`);
      missing++;
    }
  }
  console.log(`  → ${copied} copied, ${missing} missing\n`);
}

console.log("── Copying ENGLISH audio ──");
copyAudio(path.join(AUDIO, "English"), EN_MAP, path.join(PUBLIC, "en/common"));

console.log("── Copying HINDI audio ──");
copyAudio(path.join(AUDIO, "Hindhi"), HI_MAP, path.join(PUBLIC, "hi/common"));

// Telugu already in public/ – confirm:
console.log("── Telugu audio (already deployed) ──");
const teFiles = fs.readdirSync(path.join(PUBLIC, "te/common"));
console.log(`  ${teFiles.length} files found in te/common\n`);

// ─── 3. Patch guide.json ─────────────────────────────────────────────────────
// Map each point-id → { en, hi, te } audio filenames (slugs)

const POINT_AUDIO = {
  "point-1":   { en: "entry-gate.mp3",              hi: "entry-gate.mp3",              te: "main-entrance-combined.mp3" },
  "point-2":   { en: "student-cafeteria.mp3",       hi: "student-cafeteria.mp3",       te: "student-cafeteria.mp3" },
  "point-5":   { en: "electric-bikes.mp3",          hi: "electric-bikes.mp3",          te: "electric-bikes.mp3" },
  "point-6":   { en: "play-fitness-complex.mp3",    hi: "play-fitness-complex.mp3",    te: "play-fitness-complex.mp3" },
  "point-7":   { en: "central-library.mp3",         hi: "central-library.mp3",         te: "central-library.mp3" },
  "point-8":   { en: "mba-law-block.mp3",           hi: "mba-law-block.mp3",           te: "mba-law-block.mp3" },
  "point-9":   { en: "atm-facility.mp3",            hi: "atm-facility.mp3",            te: "atm-facility.mp3" },
  "point-10":  { en: "cricket-ground.mp3",          hi: "cricket-ground.mp3",          te: "cricket-ground.mp3" },
  "point-11":  { en: "hostel-block-ground.mp3",     hi: "hostel-block-ground.mp3",     te: "hostel-block-ground.mp3" },
  "point-16":  { en: "main-entrance-combined.mp3",  hi: "main-entrance-combined.mp3",  te: "main-entrance-combined.mp3" },
  "point-17":  { en: "university-block.mp3",        hi: "university-block.mp3",        te: "university-block.mp3" },
  "point-18":  { en: "rehab-block.mp3",             hi: "rehab-block.mp3",             te: "rehab-block.mp3" },
  "point-19":  { en: "sensory-park.mp3",            hi: "sensory-park.mp3",            te: "sensory-park.mp3" },
  "point-20":  { en: "swimming-pool.mp3",           hi: "swimming-pool.mp3",           te: "swimming-pool.mp3" },
  "point-21":  { en: "amphitheatre.mp3",            hi: "amphitheatre.mp3",            te: "amphitheatre.mp3" },
  "point-22":  { en: "main-block.mp3",              hi: "main-block.mp3",              te: "main-block.mp3" },
  "point-signoff": { en: "signing-off.mp3",         hi: "signing-off.mp3",             te: "signing-off.mp3" },
  "point-a-one-block": { en: "a-one-block.mp3",     hi: "a-one-block.mp3",             te: "a-one-block.mp3" },
};

const guide = JSON.parse(fs.readFileSync(GUIDE, "utf8"));
let patched = 0;

guide.points = guide.points.map(point => {
  const audioMap = POINT_AUDIO[point.id];
  if (!audioMap) return point;

  // Build full paths for each language
  const audioField = {
    en: `/campus-guide/audio/en/common/${audioMap.en}`,
    hi: `/campus-guide/audio/hi/common/${audioMap.hi}`,
    te: `/campus-guide/audio/te/common/${audioMap.te}`,
  };

  // Remove old flat 'audio' string field and replace with object
  const updated = { ...point, audio: audioField };
  // Remove legacy audioFileName if we have the new audio object
  delete updated.audioFileName;
  patched++;
  return updated;
});

fs.writeFileSync(GUIDE, JSON.stringify(guide, null, 2), "utf8");
console.log(`── guide.json patched: ${patched} points updated with {en,hi,te} audio ──\n`);
console.log("Done! All languages are now connected.");
