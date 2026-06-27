import type { SeoFaqItem } from "@/lib/seo/schema";
import { PHD_ADMISSIONS_STATUS_MESSAGE } from "@/lib/shared/site-constants";

export const HOME_FAQ_CATEGORIES: Array<{ label: string; faqs: SeoFaqItem[] }> = [
  {
    label: "Student Aspirants",
    faqs: [
      {
        question: "How do I compare the right course at Stmarys University?",
        answer:
          "Open the program pages and compare duration, eligibility, learning focus, and career pathways. For the latest fee or intake confirmation, contact the official admissions team.",
      },
      {
        question: "Can I see eligibility and duration before applying?",
        answer:
          "Yes. The website publishes duration and eligibility details on many program pages so students can shortlist courses before submitting an application.",
      },
      {
        question: "Where should I check fees and scholarships first?",
        answer:
          "Use the admissions, fee structure, and scholarship information on the website together so you can compare the likely total cost before applying.",
      },
      {
        question: "What if I am not sure which program fits my background?",
        answer:
          "Review the program requirements, career focus, and department details, then contact admissions for guidance on the best-fit route.",
      },
    ],
  },
  {
    label: "Admissions",
    faqs: [
      {
        question: "How do I apply to Stmarys University?",
        answer:
          "You can apply directly at apply.smru.edu.in or fill the Quick Enquiry form on the website. The admissions team will guide you through the next steps.",
      },
      {
        question: "Is Stmarys University a recognized university?",
        answer:
          "Yes. Stmarys University is established by the Government of Telangana through Act No. 10 of 2026 and is recognized by the UGC under Section 2(f) of the UGC Act, 1956.",
      },
      {
        question: "What is the status of Ph.D. admissions for 2026-27?",
        answer: PHD_ADMISSIONS_STATUS_MESSAGE,
      },
      {
        question: "What is the last date to apply for UG and PG programs?",
        answer:
          "The website currently states that admissions are open and recommends applying early to secure a seat and scholarship consideration.",
      },
    ],
  },
  {
    label: "Programs",
    faqs: [
      {
        question: "What makes Stmarys University different from other universities?",
        answer:
          "The website presents Stmarys University as a multi-disciplinary institution with six schools, spanning Health, Law, Engineering, Psychology, Nursing, and Rehabilitation, backed by Stmarys educational legacy.",
      },
      {
        question: "Is Stmarys University a private university in Hyderabad?",
        answer:
          "Stmarys University is a private university in the Hyderabad region of Telangana. Its official website publishes university recognition, schools, programmes, admissions, campus, and contact information.",
      },
      {
        question: "How should students compare the best private universities in Hyderabad?",
        answer:
          "Compare verified UGC recognition, programme depth, curriculum, faculty information, practical exposure, campus facilities, eligibility, fee disclosures, scholarships, and career support. This website provides official Stmarys University information and does not claim an independent ranking.",
      },
      {
        question: "Which schools and programs does Stmarys University offer?",
        answer:
          "The website lists schools covering rehabilitation sciences, health and allied health sciences, psychology, nursing sciences, engineering and emerging technologies, management and computer applications, and applied sciences and designing.",
      },
      {
        question: "What teaching methods are used at Stmarys University?",
        answer:
          "The website refers to activity-based therapy, simulation-based practice, multisensory learning, and peer-led case discussions across relevant programs.",
      },
      {
        question: "Is clinical training part of the curriculum?",
        answer:
          "The website states that real-world clinical training and community outreach are integrated into programs where applicable.",
      },
    ],
  },
  {
    label: "Financial Aid",
    faqs: [
      {
        question: "What scholarships does Stmarys University offer?",
        answer:
          "The website lists multiple scholarships including merit, founder, minority, girl student, defence ward, single parent, chancellor's excellence, SC/ST empowerment, and early bird scholarships.",
      },
      {
        question: "Are merit scholarships available?",
        answer:
          "Merit scholarship support is available for eligible applicants, subject to university norms, admissions verification, and official approval.",
      },
      {
        question: "What is the hostel fee?",
        answer:
          "Hostel and accommodation charges are confirmed through the official admissions and counselling route.",
      },
      {
        question: "How do I check my scholarship eligibility?",
        answer:
          "Use the scholarship action on the website or contact admissions for guidance on eligibility and documentation.",
      },
    ],
  },
  {
    label: "Campus Life",
    faqs: [
      {
        question: "What hostel facilities are available?",
        answer:
          "The website mentions secure on-campus hostels with surveillance, study-friendly spaces, and Wi-Fi. Admissions can confirm current room options and policy details.",
      },
      {
        question: "What recreational facilities does the campus have?",
        answer:
          "The website highlights a sports complex, meditation gardens, green spaces, and on-campus bike rental.",
      },
      {
        question: "Is there a canteen on campus?",
        answer:
          "Yes. The website describes a hygienic campus canteen with balanced meals and convenient access near academic blocks and hostels.",
      },
      {
        question: "What placement support does Stmarys University provide?",
        answer:
          "The website states that a dedicated placement cell offers career guidance, internships, and recruitment support, with university-cycle outcomes published after eligible batches progress.",
      },
    ],
  },
] ;

export const HOME_FAQS: SeoFaqItem[] = HOME_FAQ_CATEGORIES.flatMap((category) => category.faqs);
