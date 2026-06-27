import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import ExamNotification from "@/views/ExamNotification";

const title = "Entrance Exam Updates | Stmarys University";
const description =
  "No university entrance exam is currently announced. Future exam dates, eligibility, applications and official instructions will be published here.";

const faqs = [
  {
    question: "Is a Stmarys University entrance exam currently announced?",
    answer:
      "No. There is no active university entrance-exam announcement at this time.",
  },
  {
    question: "Where will future entrance exam updates be published?",
    answer:
      "Any future examination date, eligibility, application, admit-card or result information will be published on this page through an official university notice.",
  },
];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  pathname: "/exam-notification",
  keywords: [
    "Stmarys University entrance exam updates",
    "university entrance exam announcement",
    "admissions updates Hyderabad",
  ],
});

export default function Page() {
  return (
    <>
      <StructuredData
        id="exam-notification-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Entrance Exam Updates", path: "/exam-notification" },
        ])}
      />
      <StructuredData
        id="exam-notification-page-schema"
        data={buildWebPageSchema({ title, description, pathname: "/exam-notification" })}
      />
      <StructuredData id="exam-notification-faq-schema" data={buildFaqSchema(faqs)} />
      <ExamNotification />
    </>
  );
}
