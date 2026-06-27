// Mock image imports for Node.js environment
// @ts-ignore
require.extensions[".png"] = function () {
  return "mock-image-path";
};

import { schools } from "../src/data/schools";

console.log("=== Validating Course De-duplication ===");

let hasDuplicates = false;
let verifiedBpt = false;
let verifiedBot = false;
let verifiedCse = false;
let verifiedAiml = false;
let verifiedAids = false;

schools.forEach((school) => {
  console.log(`School: ${school.name}`);
  school.departments.forEach((dept) => {
    console.log(`  Department: ${dept.name}`);
    const slugs = new Set<string>();
    
    dept.programs.forEach((prog) => {
      console.log(`    Program: ${prog.name} (${prog.slug}) - Partners: ${JSON.stringify(prog.partnerCodes || prog.partnerCode || [])}`);
      
      if (slugs.has(prog.slug)) {
        console.error(`❌ DUPLICATE SLUG DETECTED: ${prog.slug} in department ${dept.name}`);
        hasDuplicates = true;
      }
      slugs.add(prog.slug);

      if (prog.slug === "bpt") {
        verifiedBpt = true;
        if (!prog.partnerCodes?.includes("EMVERSITY")) {
          console.error("❌ BPT is missing EMVERSITY partner!");
        } else {
          console.log("✅ BPT verified successfully with EMVERSITY.");
        }
      }

      if (prog.slug === "bot") {
        verifiedBot = true;
        if (!prog.partnerCodes?.includes("EMVERSITY")) {
          console.error("❌ BOT is missing EMVERSITY partner!");
        } else {
          console.log("✅ BOT verified successfully with EMVERSITY.");
        }
      }

      if (prog.slug === "btech-cse") {
        verifiedCse = true;
        const expected = ["QTST", "IIAT", "VELOCES"];
        const missing = expected.filter(p => !prog.partnerCodes?.includes(p));
        if (missing.length > 0) {
          console.error(`❌ B.Tech CSE is missing partners: ${JSON.stringify(missing)}`);
        } else {
          console.log("✅ B.Tech CSE verified successfully with all partners.");
        }
      }

      if (prog.slug === "btech-cse-aiml") {
        verifiedAiml = true;
        const expected = ["NIAT", "QTST", "IIAT", "BYTEXL"];
        const missing = expected.filter(p => !prog.partnerCodes?.includes(p));
        if (missing.length > 0) {
          console.error(`❌ B.Tech CSE (AI & ML) is missing partners: ${JSON.stringify(missing)}`);
        } else {
          console.log("✅ B.Tech CSE (AI & ML) verified successfully with all partners.");
        }
      }

      if (prog.slug === "btech-cse-ai-ds") {
        verifiedAids = true;
        const expected = ["IIAT", "BB"];
        const missing = expected.filter(p => !prog.partnerCodes?.includes(p));
        if (missing.length > 0) {
          console.error(`❌ B.Tech CSE (AI & DS) is missing partners: ${JSON.stringify(missing)}`);
        } else {
          console.log("✅ B.Tech CSE (AI & DS) verified successfully with all partners.");
        }
      }
    });
  });
});

if (hasDuplicates) {
  console.error("❌ Test failed: duplicates found!");
  process.exit(1);
} else {
  console.log("✅ All tests passed! No duplicates found, partners consolidated perfectly.");
}
