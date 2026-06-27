export type ProgramCategoryKey = "ug" | "pg" | "diploma" | "phd" | "integrated_phd";

type DetectProgramCategoryOptions = {
  includeIntegratedPhd?: boolean;
  uppercase?: boolean;
};

type CanonicalKeyOptions = {
  extended?: boolean;
};

type CleanProgramNameOptions = {
  trailingOnly?: boolean;
};

export const slugify = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const safeSlug = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim() && !/^\[object\s.+\]$/i.test(value.trim()) ? value : slugify(fallback);

export const decodeSlugParam = (value = "") => decodeURIComponent(value || "").toLowerCase();

export const findBySlugOrName = <T extends { slug?: string; name?: string }>(list: T[] | undefined, param: string) => {
  const decoded = decodeSlugParam(param);
  return (
    (list || []).find((item) => item && (item.slug || "").toLowerCase() === decoded) ||
    (list || []).find((item) => item && slugify(item.name || "") === decoded) ||
    null
  );
};

export const cleanProgramName = (name = "", options: CleanProgramNameOptions = {}) => {
  if (options.trailingOnly) {
    return name.replace(/\s*\([^)]+\)\s*$/, "").trim();
  }
  return name.replace(/\s*\([^)]*\)/g, "").trim();
};

const CANONICAL_REPLACEMENTS_BASIC: Array<[RegExp, string]> = [[/\bbtech\b/g, "bachelor technology"]];

const CANONICAL_REPLACEMENTS_EXTENDED: Array<[RegExp, string]> = [
  [/\bbtech\b/g, "bachelor technology"],
  [/\bmtech\b/g, "master technology"],
  [/\bbsc\b/g, "bachelor science"],
  [/\bmsc\b/g, "master science"],
  [/\bba\b/g, "bachelor arts"],
  [/\bma\b/g, "master arts"],
  [/\bcse\b/g, "computer science engineering"],
  [/\baids\b/g, "artificial intelligence data science"],
  [/\baiml\b/g, "artificial intelligence machine learning"],
  [/\bin\b|\bwith\b|\bof\b/g, " "],
  [/\bspecialization\b/g, "specialisation"],
];

export const getCanonicalProgramKey = (name = "", options: CanonicalKeyOptions = {}) => {
  let value = name
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/&/g, " and ")
    .replace(/\./g, "")
    .replace(/-/g, " ");

  const replacements = options.extended ? CANONICAL_REPLACEMENTS_EXTENDED : CANONICAL_REPLACEMENTS_BASIC;
  replacements.forEach(([pattern, replacement]) => {
    value = value.replace(pattern, replacement);
  });

  return value.trim().split(/\s+/).join(" ");
};

export const detectProgramCategory = (
  prog: { name?: string; level?: string } = {},
  options: DetectProgramCategoryOptions = {}
): ProgramCategoryKey | "UG" | "PG" | "Diploma" | "PhD" | "Integrated PhD" => {
  const level = (prog.level || "").toLowerCase();
  const nameRaw = (prog.name || "").toLowerCase();
  const condensedName = nameRaw.replace(/\s+/g, "");

  if (
    options.includeIntegratedPhd &&
    (condensedName.includes("mtech") || condensedName.includes("m.tech")) &&
    (condensedName.includes("phd") || condensedName.includes("ph.d"))
  ) {
    return options.uppercase ? "Integrated PhD" : "integrated_phd";
  }

  if (condensedName.includes("phd") || condensedName.includes("ph.d") || condensedName.includes("m.phil") || condensedName.includes("mphil")) {
    return options.uppercase ? "PhD" : "phd";
  }

  if (
    nameRaw.includes("diploma") ||
    nameRaw.startsWith("dip ") ||
    nameRaw.startsWith("dmrit") ||
    nameRaw.includes("certificate") ||
    level.includes("diploma") ||
    level.includes("dip")
  ) {
    return options.uppercase ? "Diploma" : "diploma";
  }

  const pgMatch =
    /\bpg\b/.test(level) ||
    level.includes("postgraduate") ||
    nameRaw.includes("master") ||
    nameRaw.startsWith("m.") ||
    nameRaw.startsWith("m ") ||
    nameRaw.startsWith("m.sc") ||
    nameRaw.startsWith("msc") ||
    nameRaw.startsWith("m.a") ||
    nameRaw.startsWith("ma ") ||
    nameRaw.startsWith("md ") ||
    nameRaw.startsWith("ms ");

  if (pgMatch) {
    return options.uppercase ? "PG" : "pg";
  }

  return options.uppercase ? "UG" : "ug";
};

export const parseProgramNameParts = (name = "") => {
  const match = name.match(/^([^(]+)(?:\(([^)]+)\))?(.*)$/);
  if (!match) {
    return { main: name, sub: "" };
  }

  const main = match[1].trim();
  const sub = (match[2] || "").trim();
  const suffix = (match[3] || "").trim();
  return {
    main: suffix ? `${main} ${suffix}` : main,
    sub,
  };
};
