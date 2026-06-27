export type UniversityEventImage = {
  src: string;
  alt: string;
};

export type UniversityEvent = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  category: string;
  location: string;
  summary: string;
  body: string[];
  participants: string[];
  images: UniversityEventImage[];
  tags: string[];
};

export const UNIVERSITY_EVENTS: UniversityEvent[] = [
  {
    slug: "tree-plantation-drive-2026",
    title: "Tree Plantation Drive",
    date: "2026-06-05",
    displayDate: "June 5, 2026",
    category: "World Environment Day",
    location: "Stmarys University, Hyderabad",
    summary:
      "Stmarys University organized a large-scale Tree Plantation Drive under the Plant4Mother initiative, promoting environmental conservation and campus sustainability.",
    body: [
      "On World Environment Day, Stmarys University organized a large-scale Tree Plantation Drive under the Plant4Mother initiative launched by the Hon'ble Prime Minister. The campaign was dedicated as a tribute to mothers and aimed at promoting environmental conservation across the nation.",
      "The event saw enthusiastic participation from university leadership, faculty members, and students. Together, they planted trees across the campus, symbolizing gratitude towards mothers while reinforcing the University's commitment to sustainability and ecological responsibility.",
      "Through this initiative, the University aspires to inspire communities nationwide to embrace environmental stewardship and contribute to a greener, healthier future.",
    ],
    participants: [
      "Mr. K. Sriharsha, Secretary & CEO",
      "Lt. Gen. Dr. Pradeep C. Nair, Vice-Chancellor",
      "Dr. M. Satyanarayana, Registrar",
      "Faculty members and students",
    ],
    images: [
      {
        src: "/assets/events/tree-plantation-drive-2026/tree-plantation-drive-01.webp",
        alt: "Stmarys University Tree Plantation Drive participants watering a newly planted tree",
      },
      {
        src: "/assets/events/tree-plantation-drive-2026/tree-plantation-drive-02.webp",
        alt: "Stmarys University faculty and students participating in the Tree Plantation Drive",
      },
      {
        src: "/assets/events/tree-plantation-drive-2026/tree-plantation-drive-03.webp",
        alt: "Stmarys University campus Tree Plantation Drive near the university entrance",
      },
    ],
    tags: ["Plant4Mother", "Sustainability", "Campus Life", "Environment"],
  },
];
