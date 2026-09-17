import type { Metadata } from "next";
import AcademicStructure from "@/views/AcademicStructure";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Academic Schools & Departments | Institutional Structure | St.Mary's University",
  description:
    "Explore the academic structure of St.Mary's University Hyderabad across rehabilitation, allied health, nursing, psychology, engineering, law, and professional education.",
  pathname: "/academic-structure",
  keywords: ["St.Mary's University schools", "academic departments", "Hyderabad university programs"],
});

export default AcademicStructure;
