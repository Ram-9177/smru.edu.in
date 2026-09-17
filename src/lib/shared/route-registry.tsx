import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

import Home from "@/views/Home";
import About from "@/views/About";
import Admissions from "@/views/Admissions";
import AcademicStructure from "@/views/AcademicStructure";
import BrochureDownload from "@/views/BrochureDownload";
import Campus360 from "@/views/Campus360";
import Careers from "@/views/Careers";
import Contact from "@/views/Contact";
import PhdAdmission from "@/views/PhdAdmission";
import Schools from "@/views/Schools";
import ThankYou from "@/views/ThankYou";
import Partner from "@/views/Partner";
import Blackbucks from "@/views/Blackbucks";
import UniversityPortal from "@/views/UniversityPortal";
import Niat from "@/views/Niat";
import QtstStmarys from "@/views/QtstStmarys";
import NiatUpskillingView from "@/views/NiatUpskilling";
import EdinboxForensicLandingV2 from "@/views/EdinboxForensicLandingV2";
import PartnerIframePage from "@/views/PartnerIframePage";
import ApprovalsRecognitions from "@/views/ApprovalsRecognitions";

export type StaticRouteKey =
  | "home"
  | "about"
  | "admissions"
  | "academicStructure"
  | "brochure"
  | "campus360"
  | "careers"
  | "contact"
  | "phdAdmissions"
  | "schools"
  | "thankYou"
  | "partner"
  | "bb"
  | "iiat"
  | "niat"
  | "qtst"
  | "niatUpskilling"
  | "edinboxForensic"
  | "istLanding"
  | "approvalsRecognitions";

type StaticRouteConfig = {
  metadata: Metadata;
  View: () => JSX.Element;
};

export const STATIC_ROUTE_REGISTRY: Record<StaticRouteKey, StaticRouteConfig> = {
  home: {
    metadata: buildMetadata({
      title: "St.Mary's University | Private University in Hyderabad",
      description:
        "Explore St.Mary's University in Hyderabad, Telangana: schools, courses, admissions, campus life, and official university updates.",
      pathname: "/",
      keywords: [
        "St.Mary's University",
        "St.Mary's University",
        "St.Mary's University",
        "St.Mary's University Hyderabad",
        "St.Mary's University Hyderabad",
        "private university in Hyderabad",
        "private university in Telangana",
        "UGC recognized university in Hyderabad",
        "university near Ramoji Film City",
        "university admissions 2026 Hyderabad",
        "professional courses in Hyderabad",
        "best university courses after 12th",
        "top private universities in Hyderabad",
      ],
    }),
    View: Home,
  },
  about: {
    metadata: buildMetadata({
      title: "About St.Mary's University | Leadership & Legacy",
      description:
        "Learn about the educational legacy, leadership, and vision of St.Mary's University, Hyderabad, with official governance context.",
      pathname: "/about",
      keywords: ["About St.Mary's University", "About St.Mary's University", "St.Mary's University leadership", "St.Mary's University"],
    }),
    View: About,
  },
  admissions: {
    metadata: buildMetadata({
      title: "Admissions Open 2026 | St.Mary's University",
      description: "Explore 2026 admissions at St.Mary's University. Compare programmes, eligibility, scholarships, counselling support, and doctoral status before applying.",
      pathname: "/admissions",
      keywords: [
        "Direct Admission 2026",
        "University Application Hyderabad",
        "St.Mary's University Admissions",
        "Eligibility",
        "Fees",
        "Scholarships",
        "university admissions open 2026",
        "college admissions Hyderabad 2026",
        "UG admission 2026 Telangana",
        "PG admission 2026 Hyderabad",
        "courses after 12th in Hyderabad",
        "university entrance exam 2026",
      ],
    }),
    View: Admissions,
  },
  academicStructure: {
    metadata: buildMetadata({
      title: "Academic Schools & Departments | Institutional Structure | St.Mary's University",
      description:
        "Explore the academic structure of St.Mary's University Hyderabad across rehabilitation, allied health, nursing, psychology, engineering, law, and professional education.",
      pathname: "/academic-structure",
      keywords: ["St.Mary's University schools", "St.Mary's University schools", "academic departments", "Hyderabad university programs"],
    }),
    View: AcademicStructure,
  },
  brochure: {
    metadata: buildMetadata({
      title: "Download Prospectus & Brochure | Admissions 2026 | St.Mary's University",
      description: "Get the official St.Mary's University brochure. Detailed information on courses, campus facilities, and 2026 admission guidelines.",
      pathname: "/brochure",
      keywords: ["St.Mary's University brochure", "St.Mary's University brochure", "admissions prospectus"],
    }),
    View: BrochureDownload,
  },
  campus360: {
    metadata: buildMetadata({
      title: "Virtual Campus Tour | Cinematic Campus Experience | St.Mary's University",
      description: "Take a 360-degree virtual tour of the Hyderabad campus. Explore labs, hostel facilities, academic spaces, and campus visit guidance at St.Mary's University.",
      pathname: "/campus-360",
      keywords: ["St.Mary's University campus tour", "St.Mary's University campus tour", "virtual campus tour"],
    }),
    View: Campus360,
  },
  careers: {
    metadata: buildMetadata({
      title: "Faculty & Staff Careers | Join the St.Mary's University Academic Team",
      description: "Build your academic career at St.Mary's University. Explore faculty and administrative job openings in Hyderabad.",
      pathname: "/careers",
      keywords: ["St.Mary's University careers", "St.Mary's University careers", "faculty jobs Hyderabad"],
    }),
    View: Careers,
  },
  contact: {
    metadata: buildMetadata({
      title: "Contact Us | Admissions Helpdesk & Location | St.Mary's University Hyderabad",
      description: "Reach out to the St.Mary's University admissions team. Find our Hyderabad campus location, map, and contact directory.",
      pathname: "/contact",
      keywords: ["Contact St.Mary's University", "Contact St.Mary's University", "Hyderabad University Address", "Admissions Helpdesk"],
    }),
    View: Contact,
  },
  phdAdmissions: {
    metadata: buildMetadata({
      title: "Ph.D. Admissions 2026 Status | Doctoral Research Programs | St.Mary's University",
      description: "View Ph.D. admissions status, notices, fees, and doctoral research pathways at St.Mary's University, including current cycle updates.",
      pathname: "/phd-admissions",
      keywords: ["St.Mary's University PhD admissions", "St.Mary's University PhD admissions", "doctoral programs Hyderabad"],
    }),
    View: PhdAdmission,
  },
  schools: {
    metadata: buildMetadata({
      title: "Courses Offered at St.Mary's University | UG, PG & Professional Programmes",
      description: "Explore the schools at St.Mary's University. From nursing to engineering, discover specialized career-focused pathways for 2026.",
      pathname: "/schools",
      keywords: [
        "St.Mary's University schools",
        "professional degree programs Hyderabad",
        "healthcare courses after 12th",
        "engineering courses after 12th",
        "law courses after 12th",
        "psychology courses after 12th",
        "nursing courses after 12th",
        "career focused courses Hyderabad",
      ],
    }),
    View: Schools,
  },
  thankYou: {
    metadata: buildMetadata({
      title: "Submission Received | St.Mary's University Admissions",
      description: "Your enquiry has been successfully submitted. Our admissions team will contact you shortly.",
      pathname: "/thank-you",
      robots: "noindex,follow",
    }),
    View: ThankYou,
  },
  partner: {
    metadata: buildMetadata({
      title: "Institutional Partners | Industry & Academic Alliances | St.Mary's University",
      description: "Explore industry and academic partner routes connected with St.Mary's University and career-ready learning pathways.",
      pathname: "/partner",
    }),
    View: Partner,
  },
  bb: {
    metadata: buildMetadata({
      title: "BlackBucks Portal",
      description: "Access the BlackBucks partner route published on the St.Mary's University website.",
      pathname: "/bb",
    }),
    View: Blackbucks,
  },
  iiat: {
    metadata: buildMetadata({
      title: "IIAT Portal",
      description: "Access the Indian Institute of Advanced Technology partner route published on the St.Mary's University website.",
      pathname: "/iiat",
    }),
    View: UniversityPortal,
  },
  niat: {
    metadata: buildMetadata({
      title: "NIAT",
      description: "Explore the NIAT partner route published on the St.Mary's University website.",
      pathname: "/niat",
    }),
    View: Niat,
  },
  qtst: {
    metadata: buildMetadata({
      title: "QTST",
      description: "Explore the QTST partner route published on the St.Mary's University website.",
      pathname: "/qtst",
    }),
    View: QtstStmarys,
  },
  niatUpskilling: {
    metadata: buildMetadata({
      title: "NIAT Upskilling",
      description: "Explore the NIAT Upskilling route published on the St.Mary's University website.",
      pathname: "/niat-upskilling",
    }),
    View: NiatUpskillingView,
  },
  edinboxForensic: {
    metadata: buildMetadata({
      title: "B.Sc Forensic Science | Admissions 2026 | St.Mary's University × AIFSET",
      description: "Explore B.Sc Forensic Science at St.Mary's University through the AIFSET national entrance route, with online exam access and scholarship guidance.",
      pathname: "/partner/edinbox",
    }),
    View: EdinboxForensicLandingV2,
  },
  istLanding: {
    metadata: buildMetadata({
      title: "B.Tech Admissions 2026 | St.Mary's University",
      description: "Apply for industry-integrated B.Tech programs in AI, Data Science, and Cyber Security. Earn a UGC-recognized degree from St.Mary's University with global career readiness.",
      pathname: "/partners/ist/index.html",
    }),
    View: () => <PartnerIframePage slug="ist" />,
  },
  approvalsRecognitions: {
    metadata: buildMetadata({
      title: "Approvals & Recognitions | Statutory Status | St.Mary's University Hyderabad",
      description: "Official approvals, recognitions, and regulatory disclosure page for St.Mary's University. Download the university establishment Act and UGC recognition letters.",
      pathname: "/approvals-recognitions",
    }),
    View: ApprovalsRecognitions,
  },
};

export const getStaticRouteConfig = (key: StaticRouteKey) => STATIC_ROUTE_REGISTRY[key];
