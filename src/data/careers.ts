export type CareerJob = {
  id: number;
  title: string;
  location: string;
  category_name: string;
  summary: string;
  details: string[];
};

export const CAREER_BENEFITS = [
  "Supportive Team Culture",
  "Growth & Research Opportunities",
  "Employee Wellness Benefits",
  "Career Development",
  "Global Collaboration",
  "Inclusive & Diverse Environment",
  "Modern Infrastructure",
  "Mentorship Programs",
] as const;

export const CAREER_OPENINGS: CareerJob[] = [
  {
    id: 1,
    title: "Principal - School of Law",
    location: "Hyderabad/Guntur",
    category_name: "Leadership",
    summary:
      "PhD in Law with deep research expertise. Strong academic profile including research work, published papers, and experience in academic administration.",
    details: [
      "Ph.D. in Law",
      "Strong academic profile (research papers, refereed journals, forums)",
      "Minimum 15 years of teaching experience at a renowned University/Institute",
      "At least 5 years of experience in academic administration or heading a department",
    ],
  },
  {
    id: 2,
    title: "Professors / Associate Professors / Assistant Professors",
    location: "Hyderabad/Guntur",
    category_name: "Faculty",
    summary:
      "Looking for dynamic educators with relevant academic experience to join the School of Law faculty team.",
    details: [
      "Relevant Master's/Ph.D. in Law or allied specializations",
      "Proven academic experience in teaching and research",
      "Strong communication and mentoring skills",
      "Commitment to academic excellence and student success",
    ],
  },
];
