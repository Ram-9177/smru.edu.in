// Canonical school hub is always /schools/{slug}. The former short-form landings
// (/law, /nursing-sciences, ...) 301 to these in public/.htaccess and keep a client
// redirect shell so nothing 404s without Apache.
export const SCHOOL_LANDING_PATHS: Record<string, string> = {
  law: "/schools/law",
  "rehabilitation-sciences": "/schools/rehabilitation-sciences",
  "health-allied-health-sciences": "/schools/health-allied-health-sciences",
  psychology: "/schools/psychology",
  "nursing-sciences": "/schools/nursing-sciences",
  "engineering-emerging-technologies": "/schools/engineering-emerging-technologies",
};

export const LEGACY_SCHOOL_SHORT_PATHS: Record<string, string> = {
  law: "/law",
  "rehabilitation-sciences": "/rehabilitation-sciences",
  "health-allied-health-sciences": "/health-allied-health-sciences",
  psychology: "/psychology",
  "nursing-sciences": "/nursing-sciences",
  "engineering-emerging-technologies": "/engineering-emerging-technologies",
};

export const COMING_SOON_SCHOOL_SLUGS = [
  "rehabilitation-sciences",
  "health-allied-health-sciences",
  "psychology",
  "nursing-sciences",
  "engineering-emerging-technologies",
] as const;

export const getKnownSchoolLandingPath = (schoolSlug: string) => SCHOOL_LANDING_PATHS[schoolSlug] || null;

export const getSchoolLandingPath = (schoolSlug: string) =>
  getKnownSchoolLandingPath(schoolSlug) || `/schools/${schoolSlug}`;
