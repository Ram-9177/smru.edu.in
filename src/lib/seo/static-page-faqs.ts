import type { SeoFaqItem } from "@/lib/seo/schema";
import {
  PHD_ADMISSIONS_STATUS_MESSAGE,
  SITE_CONTACT,
} from "@/lib/shared/site-constants";

export const ADMISSIONS_FAQS: SeoFaqItem[] = [
  {
    question: "How do I apply to Stmarys University?",
    answer:
      "Use the official application route for UG, PG, and diploma programs or the dedicated Ph.D. admissions page for doctoral applications.",
  },
  {
    question: "Can I check duration, eligibility, and fees before applying?",
    answer:
      "Yes. Program pages publish available duration and eligibility details, while the admissions team confirms current fee, intake, and counselling guidance.",
  },
  {
    question: "Are program-wise documents and eligibility rules published for every course?",
    answer:
      "Program pages list available eligibility notes and admissions can confirm current program-specific document requirements.",
  },
  {
    question: "Where can I verify fees, refunds, and disclosures before admission?",
    answer:
      "Review the fee structure, refund policy, mandatory disclosure, and approvals pages together before relying on any unverified detail.",
  },
  {
    question: "What should parents and students check before final admission?",
    answer:
      "Compare program eligibility, duration, fees, scholarships, and disclosure pages, then confirm final admission details with admissions support.",
  },
  {
    question: "Who should I contact for admissions help?",
    answer: `Use the contact page or email ${SITE_CONTACT.email} for official admissions support.`,
  },
];

export const CONTACT_FAQS: SeoFaqItem[] = [
  {
    question: "Where is Stmarys University located?",
    answer:
      "The website lists the campus at Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana.",
  },
  {
    question: "How quickly does the admissions team respond?",
    answer: "The contact page states that the team typically responds within one business day.",
  },
  {
    question: "Can I plan a campus visit from the website?",
    answer:
      "Yes. Use the campus location, visit campus, and how to reach pages together with the contact page for visit planning.",
  },
  {
    question: "Which public contact points are available on the website?",
    answer:
      "The website publishes phone, email, WhatsApp, office hours, and emergency contact details on the contact page.",
  },
];

export const PHD_FAQS: SeoFaqItem[] = [
  {
    question: "How do I register interest for the next Ph.D. admissions cycle at Stmarys University?",
    answer: PHD_ADMISSIONS_STATUS_MESSAGE,
  },
  {
    question: "What is the status of Ph.D. admissions for 2026-27?",
    answer: PHD_ADMISSIONS_STATUS_MESSAGE,
  },
  {
    question: "Are annual Ph.D. fee details shown on the website?",
    answer:
      "No public amount is claimed here. Ph.D. fee components should be confirmed through the official research/admissions office until an approved public fee release is published.",
  },
  {
    question: "Where can I verify research support and contact details?",
    answer:
      "Use the research, admissions, and contact pages together for public references, enquiry support, and follow-up.",
  },
];
