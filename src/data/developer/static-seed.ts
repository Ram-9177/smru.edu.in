import type { CmsPageContent, PageRoute } from "@/types/developer";

export const STATIC_ROUTES: Array<Omit<PageRoute, "id"> & { id: string }> = [
  { id: "route-home", title: "Home", url: "/", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: true, inFooter: true, indexable: true, pageExists: true },
  { id: "route-about", title: "About", url: "/about", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: true, inFooter: true, indexable: true, pageExists: true },
  { id: "route-schools", title: "Schools", url: "/schools", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: true, inFooter: true, indexable: true, pageExists: true },
  { id: "route-admissions", title: "Admissions", url: "/admissions", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: true, inFooter: true, indexable: true, pageExists: true },
  { id: "route-careers", title: "Careers", url: "/careers", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: true, inFooter: true, indexable: true, pageExists: true },
  { id: "route-contact", title: "Contact", url: "/contact", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: true, inFooter: true, indexable: true, pageExists: true },
  { id: "route-campus-360", title: "Campus 360", url: "/campus-360", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: true, inFooter: false, indexable: true, pageExists: true },
  { id: "route-brochure", title: "Brochure", url: "/brochure", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: false, inFooter: false, indexable: true, pageExists: true },
  { id: "route-phd", title: "PhD Admissions", url: "/phd-admissions", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: false, inFooter: true, indexable: true, pageExists: true },
  { id: "route-academic-structure", title: "Academic Structure", url: "/academic-structure", pageType: "page", routeGroup: "public", visibility: "public", status: "live", inNavbar: false, inFooter: false, indexable: true, pageExists: true },
  { id: "route-partner", title: "Partner", url: "/partner", pageType: "partner", routeGroup: "partner", visibility: "public", status: "live", inNavbar: false, inFooter: false, indexable: true, pageExists: true },
  { id: "route-thank-you", title: "Thank You", url: "/thank-you", pageType: "system", routeGroup: "hidden", visibility: "hidden", status: "live", inNavbar: false, inFooter: false, indexable: false, pageExists: true },
  { id: "route-ctpl", title: "CTPL Redirect", url: "/ctpl", pageType: "redirect", routeGroup: "redirects", visibility: "internal", status: "live", inNavbar: false, inFooter: false, indexable: false, redirectTarget: "https://apply.smru.edu.in/", redirectType: "external", pageExists: true },
  { id: "route-developer", title: "Developer CMS", url: "/developer", pageType: "system", routeGroup: "internal", visibility: "internal", status: "in-progress", inNavbar: false, inFooter: false, indexable: false, pageExists: true }
];

export const STATIC_PAGE_CONTENT: CmsPageContent[] = [
  {
    id: "page-hero-phrases",
    title: "Hero / Value Props",
    sectionType: "hero",
    visibility: "public",
    status: "live",
    content: "rehab-focused curriculum | clinical training & outreach | educational legacy | career support",
    tags: ["home", "careers", "value-props"]
  },
  {
    id: "page-scholarships",
    title: "Scholarship Highlights",
    sectionType: "scholarship",
    visibility: "public",
    status: "live",
    content:
      "Freshman Merit Scholarship; Dr. Bharathi Rao Founder Scholarship; Minority Scholarship; Girl Student Scholarship; Defence Ward Scholarship; Single Parent Scholarship; Chancellor's Excellence Award; SC/ST Empowerment Scholarship; Early Bird Scholarship",
    tags: ["home", "scholarships"]
  },
  {
    id: "page-faq-categories",
    title: "FAQ Categories",
    sectionType: "faq",
    visibility: "public",
    status: "live",
    content: "Admissions | Programs | Financial Aid | Campus Life",
    tags: ["home", "faq"]
  },
  {
    id: "page-contact-primary",
    title: "Primary Contact",
    sectionType: "contact",
    visibility: "public",
    status: "live",
    content: "08065459645 | 9493321969 | reach@smru.edu.in | Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana - 508284, India.",
    tags: ["contact", "footer"]
  },
  {
    id: "page-cta-apply",
    title: "Apply CTA",
    sectionType: "cta",
    visibility: "public",
    status: "live",
    ctaLabel: "Apply",
    ctaLink: "https://apply.smru.edu.in",
    content: "Primary admissions CTA",
    tags: ["global", "navbar", "sticky"]
  },
  {
    id: "page-cta-whatsapp",
    title: "WhatsApp CTA",
    sectionType: "cta",
    visibility: "public",
    status: "live",
    ctaLabel: "WhatsApp",
    ctaLink: "https://wa.me/919493321969",
    content: "Global WhatsApp CTA",
    tags: ["global", "contact", "sticky"]
  },
  {
    id: "page-cta-brochure",
    title: "Brochure CTA",
    sectionType: "cta",
    visibility: "public",
    status: "live",
    ctaLabel: "Brochure",
    ctaLink: "/brochure",
    content: "Global brochure link",
    tags: ["global", "sticky"]
  },
  {
    id: "page-campus-hostel",
    title: "Campus and Hostel",
    sectionType: "feature",
    visibility: "public",
    status: "live",
    content: "Modern Hostels, Advanced Labs, Sports Complex, Wellness Centre, Green Spaces, Campus Bike Rental",
    tags: ["home", "campus-360", "hostel"]
  },
  {
    id: "page-canteen-highlights",
    title: "Canteen Highlights",
    sectionType: "feature",
    visibility: "public",
    status: "live",
    content: "Hygienic and fresh meal preparation; Spacious and comfortable seating; Balanced and nutritious menu options; Convenient location near academic blocks",
    tags: ["home", "canteen"]
  },
  {
    id: "page-footer-links",
    title: "Footer Quick Links",
    sectionType: "footer",
    visibility: "public",
    status: "live",
    content: "Home, About Us, Academic Schools, Ph.D. Admissions, Admissions, Career Portal, Contact Support",
    tags: ["footer"]
  },
  {
    id: "page-careers-benefits",
    title: "Careers Benefits",
    sectionType: "feature",
    visibility: "public",
    status: "live",
    content: "Supportive Team Culture; Growth & Research Opportunities; Employee Wellness Benefits; Career Development; Global Collaboration; Inclusive & Diverse Environment; Modern Infrastructure; Mentorship Programs",
    tags: ["careers", "benefits"]
  },
  {
    id: "page-careers-openings",
    title: "Careers Job Openings (JSON)",
    sectionType: "misc",
    visibility: "public",
    status: "live",
    content: JSON.stringify([
      {
        id: 1,
        title: "Principal - School of Law",
        location: "Hyderabad/Guntur",
        category_name: "Leadership",
        summary: "PhD in Law with deep research expertise. Strong academic profile including research work, published papers, and experience in academic administration.",
        details: [
          "Ph.D. in Law",
          "Strong academic profile (research papers, refereed journals, forums)",
          "Minimum 15 years of teaching experience at a renowned University/Institute",
          "At least 5 years of experience in academic administration or heading a department"
        ]
      },
      {
        id: 2,
        title: "Professors / Associate Professors / Assistant Professors",
        location: "Hyderabad/Guntur",
        category_name: "Faculty",
        summary: "Looking for dynamic educators with relevant academic experience to join the School of Law faculty team.",
        details: [
          "Relevant Master's/Ph.D. in Law or allied specializations",
          "Proven academic experience in teaching and research",
          "Strong communication and mentoring skills",
          "Commitment to academic excellence and student success"
        ]
      }
    ], null, 2),
    tags: ["careers", "openings"]
  }
];
