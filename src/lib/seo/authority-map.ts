export type SeoAuthorityPriority = "tier1" | "trust" | "conversion" | "academic" | "local" | "utility";

export type SeoAuthorityPage = {
  key: string;
  path: string;
  label: string;
  priority: SeoAuthorityPriority;
  primaryIntent: string;
  anchors: string[];
  supportsSitelinks?: boolean;
};

/**
 * Central SEO authority map for the public website.
 *
 * This file is intentionally non-visual. It should be used by navigation,
 * footer, homepage link blocks, related-link sections, sitemap checks, and
 * future SEO automation so every important page receives consistent internal
 * links and anchor text without changing UI colours or layout language.
 */
export const SEO_AUTHORITY_PAGES: SeoAuthorityPage[] = [
  {
    key: "admissions",
    path: "/admissions",
    label: "Admissions",
    priority: "conversion",
    primaryIntent: "Admissions, applications, counselling, and programme entry guidance.",
    anchors: ["Admissions", "Apply for Admissions", "Admissions Open 2026", "University Admissions"],
    supportsSitelinks: true,
  },
  {
    key: "schools",
    path: "/schools",
    label: "Courses & Schools",
    priority: "academic",
    primaryIntent: "Academic schools, departments, and official programme discovery.",
    anchors: ["Courses", "Schools", "Programmes", "Academic Schools", "Courses & Schools"],
    supportsSitelinks: true,
  },
  {
    key: "approvalsRecognitions",
    path: "/approvals-recognitions",
    label: "Approvals & Recognitions",
    priority: "trust",
    primaryIntent: "Official recognition, statutory status, and regulatory trust signals.",
    anchors: ["Approvals", "Recognitions", "UGC Recognition", "Official Recognition", "Statutory Status"],
    supportsSitelinks: true,
  },
  {
    key: "campus360",
    path: "/campus-360",
    label: "Campus Tour",
    priority: "trust",
    primaryIntent: "Virtual campus experience, facilities, and visit confidence.",
    anchors: ["Campus Tour", "Virtual Campus Tour", "Explore Campus", "Campus 360"],
    supportsSitelinks: true,
  },
  {
    key: "contact",
    path: "/contact",
    label: "Contact",
    priority: "local",
    primaryIntent: "Admissions helpdesk, location, phone, WhatsApp, and campus visit routes.",
    anchors: ["Contact", "Contact Admissions", "Admissions Helpdesk", "Visit Campus", "Campus Location"],
    supportsSitelinks: true,
  },
  {
    key: "brochure",
    path: "/brochure",
    label: "Download Brochure",
    priority: "conversion",
    primaryIntent: "Prospectus and brochure download intent.",
    anchors: ["Download Brochure", "Brochure", "Prospectus", "Course Brochure"],
    supportsSitelinks: true,
  },
  {
    key: "phdAdmissions",
    path: "/phd-admissions",
    label: "Ph.D. Admissions",
    priority: "conversion",
    primaryIntent: "Doctoral admissions status, notices, and next-cycle guidance.",
    anchors: ["Ph.D. Admissions", "Doctoral Admissions", "PhD Admissions", "Research Admissions"],
    supportsSitelinks: true,
  },
  {
    key: "leadership",
    path: "/leadership/all",
    label: "Leadership",
    priority: "trust",
    primaryIntent: "University leadership, governance, and institutional credibility.",
    anchors: ["Leadership", "Governance", "University Leadership", "Governing Bodies"],
    supportsSitelinks: true,
  },
  {
    key: "academicStructure",
    path: "/academic-structure",
    label: "Academic Structure",
    priority: "academic",
    primaryIntent: "Institutional academic organisation across schools and departments.",
    anchors: ["Academic Structure", "Departments", "Schools and Departments", "Academic Organisation"],
  },
  {
    key: "about",
    path: "/about",
    label: "About",
    priority: "trust",
    primaryIntent: "Institutional background, identity, and official university context.",
    anchors: ["About", "About Stmarys University", "University Profile", "Institutional Background"],
  },
  {
    key: "examNotification",
    path: "/exam-notification",
    label: "Exam Notification",
    priority: "utility",
    primaryIntent: "Entrance and exam-related official updates.",
    anchors: ["Exam Notification", "Entrance Test", "Entrance Updates", "Official Notices"],
  },
];

export const SEO_SITELINK_CANDIDATES = SEO_AUTHORITY_PAGES.filter((page) => page.supportsSitelinks);

export const getSeoAuthorityPage = (key: string) =>
  SEO_AUTHORITY_PAGES.find((page) => page.key === key);

export const getSeoAuthorityPageByPath = (path: string) => {
  const normalized = path.replace(/\/+$/, "") || "/";
  return SEO_AUTHORITY_PAGES.find((page) => (page.path.replace(/\/+$/, "") || "/") === normalized);
};
