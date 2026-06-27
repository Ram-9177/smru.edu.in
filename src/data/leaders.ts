// src/data/leaders.js

export const leadershipGroups = {
  "Governing Council": [
    {
      name: "Dr. Rev. K.V.K. Rao",
      role: "Chancellor",
      about: "Founder & Chairman, Joseph Sriharsha & Mary Indraja Educational Society"
    },
    {
      name: "Lt. Gen. (Dr.) Pradeep C. Nair",
      role: "Vice-Chancellor",
      about: "PVSM, AVSM, YSM (Retd.)"
    },
    {
      name: "Dr. Yogita Rana",
      role: "Member",
      about: "Secretary to Government, Telangana. Government Nominee"
    },
    {
      name: "Dr. Kuderu Rajagopal",
      role: "Member",
      about: "Former Vice - chancellor, JNT University, Hyderabad"
    },
    {
      name: "Sri. B. Lakshmikantam",
      role: "Member",
      about: "(Former Member of IAS)"
    },
    {
      name: "Sri. C. Koteswara Rao",
      role: "Member",
      about: "Ex-Managing Director, Technology Services, Accenture India."
    },
    {
      name: "Smt. C.V.N.V. Bharathi Devi",
      role: "Member",
      about: "Co-Founder Joseph Sriharsha & Mary Indraja Educational Society."
    },
    {
      name: "Sri. Rusheek Reddy K.V.",
      role: "Member",
      about: "Advocate High Court of Telangana"
    }
  ],

  "Board of Management": [
    {
      name: "Lt. Gen. (Dr.) Pradeep C. Nair",
      role: "Vice-Chancellor",
      about: "PVSM, AVSM, YSM (Retd.)"
    },
    {
      name: "Mr. Venkateswarlu Yaganti",
      role: "Member",
      about: "Director and CEO of YVR Group."
    },
    {
      name: "Sri. B. Nagabhushanam",
      role: "Member",
      about: "Chartered Accountant."
    },
    {
      name: "Mr. Rajesh Yerramasu",
      role: "Member",
      about: "Co-Founder,CEO - M/s. Zestwings (India UAE), Solutions Architect (Digital, IT & Cyber Governance) For Stmarys University"
    },
    {
      name: "Mr. Sravanth Gajula",
      role: "Member",
      about: "2x Founder, TEDx Speaker, ISB Young Leader Awardee"
    },
    {
      name: "Smt. K. Indu Aparna",
      role: "Member",
      about: "Chief Operating Officer, Stmarys University"
    },
    {
      name: "Dr. B. Valli",
      role: "Member",
      about: "Head, Department of Nursing"
    },
    {
      name: "Dr. Joseph P. Mosiganti",
      role: "Member",
      about: "Head, Department of Theology"
    }
  ],

  "Sponsor Body": [
    {
      name: "Joseph Sriharsha & Mary Indraja Educational Society",
      role: "Regd. Society",
      about: ""
    },
    {
      name: "Dr. Rev. K.V.K. Rao",
      role: "Chairman",
      about: "Founder"
    },
    {
      name: "Smt. C.V.N.V. Bharathi Devi",
      role: "Co-Chairperson",
      about: "Co-Founder"
    },
    {
      name: "K. Sri Harsha",
      role: "Secretary",
      about: "Chief Executive Officer, Stmarys University"
    },
    {
      name: "K. Indraja",
      role: "Treasurer",
      about: "Chief Financial Officer"
    },
    {
      name: "K. Indu Aparna",
      role: "Vice-President",
      about: "Chief Operating Officer, Stmarys University"
    }
  ]
};

export const leaders = [
  {
    slug: "founder",
    name: "Dr. K.V.K. Rao",
    role: "Founder, Chairman & Chancellor",
    about: "Founder & Chairman of JSMI Educational Society. Visionary behind Stmarys University and umbrella rehabilitation focus.",
  },
  {
    slug: "co-founder",
    name: "Smt. C.V.N.V Bharathi",
    role: "Co-Founder & Pro-Chancellor",
    about: "Co-Founder of Stmarys University and Pro-Chancellor supporting the university's academic and institutional vision.",
  },
  {
    slug: "ceo",
    name: "Mr. K. Sri Harsha",
    role: "Secretary & CEO",
    about: "Secretary and CEO overseeing operational leadership, growth, and execution across the university ecosystem.",
  },
  {
    slug: "treasurer",
    name: "Smt. K. Indraja",
    role: "Treasurer & CFO",
    about: "Treasurer and Chief Financial Officer responsible for financial stewardship and governance.",
  },
  {
    slug: "joint-secretary",
    name: "Smt. K. Indu Aparna",
    role: "Joint Secretary & COO",
    about: "Joint Secretary and Chief Operating Officer guiding campus operations and university administration.",
  },
  {
    slug: "vice-chancellor",
    name: "Lt Gen Pradeep Chandran Nair (PVSM, AVSM, YSM)",
    role: "Vice-Chancellor",
    about: "Provides academic leadership, governance and strategic expansion for rehabilitation education.",
  }
];

export const leaderBySlug = Object.fromEntries(
  (leaders || []).map((p) => [p.slug, p])
);
