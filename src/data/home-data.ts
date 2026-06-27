import {
  FaAward,
  FaHeartbeat,
  FaHandsHelping,
  FaChartLine,
  FaBrain,
  FaStethoscope,
  FaBullseye,
  FaBicycle,
  FaUniversity,
} from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import React from "react";

export const DEFAULT_SCHOLARSHIP_NAMES = [
  "Freshman Merit Scholarship",
  "Dr. Bharathi Rao Founder Scholarship",
  "Minority Scholarship",
  "Girl Student Scholarship",
  "Defence Ward Scholarship",
  "Single Parent Scholarship",
  "Chancellor's Excellence Award",
  "SC/ST Empowerment Scholarship",
  "Early Bird Scholarship",
];

export const DEFAULT_WHY_CHOOSE_ITEMS = [
  { title: "Multi-Disciplinary Excellence", desc: "Career-focused schools across rehabilitation, health, nursing, psychology, engineering, law, and allied professional fields." },
  { title: "Clinical & Industry Integration", desc: "Practice-led learning through clinical exposure, simulation labs, internships, and partner-supported skilling." },
  { title: "Stmarys Educational Legacy", desc: "Built on Stmarys educational foundation and now advanced as a UGC 2(f) recognized rehabilitation university." },
  { title: "Career Outcomes", desc: "Structured guidance for internships, skill-building, placements, and professional pathways." },
];

export const DEFAULT_CAMPUS_ITEMS = [
  { key: 'hostel', title: "Modern Hostels", desc: "Comfortable and secure accommodation with 24/7 surveillance." },
  { key: 'sports', title: "Sports Complex", desc: "Advanced sports facilities that promote holistic fitness." },
  { key: 'labs', title: "Advanced Labs", desc: "State-of-the-art laboratories equipped for research and clinical training." },
  { key: 'wellness', title: "Wellness Centre", desc: "Comprehensive health and wellness support." },
  { key: 'green', title: "Green Spaces", desc: "Eco-friendly campus featuring meditation gardens." },
  { key: 'bike', title: "Campus Bike Rental", desc: "Low-cost bike rental for quick, comfortable movement between campus locations." },
];

export const DEFAULT_CANTEEN_HIGHLIGHTS = [
  "Hygienic and fresh meal preparation",
  "Spacious and comfortable seating",
  "Balanced and nutritious menu options",
  "Convenient location near academic blocks",
];

export const TESTIMONIAL_DATA = [
  {
    quote: "At Stmarys University, I help learners find their voice—combining therapy and technology to improve speech and hearing outcomes.",
    name: "Raveeti Shiva Deekshith",
    course: "Dept. of Audiology & Speech-Language Pathology",
  },
  {
    quote: "We integrate clinical psychology training with compassionate care so students learn to support mental health with evidence-based practice.",
    name: "Dhanavath Anil Kumar",
    course: "Dept. of Clinical Psychology",
  },
  {
    quote: "Guiding students to understand behavior and build resilience is the most rewarding part of my work at Stmarys University.",
    name: "Rida Subhan",
    course: "Dept. of Psychology",
  },
  {
    quote: "Occupational therapy here is purpose-driven—every session focuses on independence in real-life activities.",
    name: "Rosalin Singh",
    course: "Dept. of Occupational Therapy",
  },
  {
    quote: "Stmarys University's collaborative clinics let us tailor interventions that restore dignity and daily function.",
    name: "Gunichetty Joshna Priya",
    course: "Dept. of Occupational Therapy",
  },
  {
    quote: "Rehabilitation is about confidence as much as mobility; our physiotherapy labs turn progress into possibility.",
    name: "Kumpati Venkateswara Rao",
    course: "Dept. of Physiotherapy",
  },
  {
    quote: "At the Special School, we create structured, loving environments where neurodivergent children learn, play, and thrive.",
    name: "Netinti Hemalatha",
    role: "Principal",
    course: "Special School for Neurodevelopmental Disorders",
  },
];
