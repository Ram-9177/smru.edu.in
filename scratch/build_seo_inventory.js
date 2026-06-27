const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Helper to escape CSV values
function escapeCSV(val) {
  if (val === undefined || val === null) return '';
  let str = String(val).trim();
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    str = str.replace(/"/g, '""');
    return `"${str}"`;
  }
  return str;
}

// 1. Core static routes manually registered from route-registry.tsx
const staticRoutes = [
  {
    url: '/',
    type: 'Home',
    keyword: 'SMRU Hyderabad',
    intent: 'Branded',
    title: "SMRU Hyderabad | St. Mary's Rehabilitation University",
    description: "Official website of St. Mary's Rehabilitation University, Hyderabad. Explore 2026 admissions, specialized rehabilitation programs, and 30 years of legacy.",
    h1: "St. Mary's Rehabilitation University",
    canonical: 'https://smru.edu.in/',
    schema: 'University',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/schools',
    type: 'Directory',
    keyword: 'Colleges in Hyderabad',
    intent: 'Informational',
    title: 'Academic Schools & Colleges in Hyderabad | SMRU',
    description: 'Explore our 7 specialized schools offering over 150 academic pathways in rehabilitation, allied health, and professional sciences in Hyderabad.',
    h1: 'Academic Schools & Colleges',
    canonical: 'https://smru.edu.in/schools/',
    schema: 'CollectionPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/admissions',
    type: 'Landing',
    keyword: 'Admissions 2026',
    intent: 'Transactional',
    title: "Admissions 2026-27 | Apply to SMRU Hyderabad",
    description: "Official admissions portal for St. Mary's Rehabilitation University. Start your application for UG, PG, and PhD programs in rehabilitation sciences.",
    h1: 'Admissions 2026-27',
    canonical: 'https://smru.edu.in/admissions/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/academic-structure',
    type: 'Directory',
    keyword: 'University Academic Structure',
    intent: 'Informational',
    title: "Academic Schools & Departments | Institutional Structure | St. Mary's University",
    description: "Explore the academic structure of St. Mary's University Hyderabad across rehabilitation, allied health, nursing, psychology, engineering, law, and professional education.",
    h1: 'Academic Structure',
    canonical: 'https://smru.edu.in/academic-structure/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/brochure',
    type: 'Landing',
    keyword: 'University Prospectus',
    intent: 'Transactional',
    title: "Download Prospectus & Brochure | Admissions 2026 | St. Mary's University",
    description: "Get the official St. Mary's Rehabilitation University brochure. Detailed information on courses, campus facilities, and 2026 admission guidelines.",
    h1: 'Prospectus & Brochure',
    canonical: 'https://smru.edu.in/brochure/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/campus-360',
    type: 'Local',
    keyword: 'Virtual Campus Tour',
    intent: 'Informational',
    title: "Virtual Campus Tour | Cinematic Campus Experience | St. Mary's University",
    description: "Take a 360-degree virtual tour of the Hyderabad campus. Explore labs, hostel facilities, academic spaces, and campus visit guidance at St. Mary's University.",
    h1: 'Campus 360 Virtual Tour',
    canonical: 'https://smru.edu.in/campus-360/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/careers',
    type: 'Trust',
    keyword: 'Jobs at SMRU',
    intent: 'Transactional',
    title: "Faculty & Staff Careers | Join the St. Mary's University Academic Team",
    description: "Build your academic career at St. Mary's Rehabilitation University. Explore faculty and administrative job openings in Hyderabad.",
    h1: 'Careers & Openings',
    canonical: 'https://smru.edu.in/careers/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/contact',
    type: 'Contact',
    keyword: 'SMRU Contact Hyderabad',
    intent: 'Informational',
    title: 'Contact SMRU Hyderabad | Location & Admissions Desk',
    description: "Get in touch with St. Mary's Rehabilitation University. Campus location, admissions helpdesk, and regional headquarters details.",
    h1: 'Contact SMRU',
    canonical: 'https://smru.edu.in/contact/',
    schema: 'ContactPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/phd-admissions',
    type: 'Landing',
    keyword: 'PhD Admissions 2026',
    intent: 'Transactional',
    title: 'PhD Admissions 2026-27 | Doctoral Research | SMRU',
    description: 'Apply for PhD admissions at St. Mary\'s Rehabilitation University. Research pathways in clinical psychology, physiotherapy, and rehab sciences.',
    h1: 'PhD Admissions 2026-27',
    canonical: 'https://smru.edu.in/phd-admissions/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/partner',
    type: 'Trust',
    keyword: 'SMRU Partners',
    intent: 'Informational',
    title: 'Institutional Partners | Industry & Academic Alliances | SMRU',
    description: 'Explore industry and academic partner routes connected with St. Mary\'s Rehabilitation University and career-ready learning pathways.',
    h1: 'Our Partners',
    canonical: 'https://smru.edu.in/partner/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/bb',
    type: 'Trust',
    keyword: 'BlackBucks SMRU',
    intent: 'Transactional',
    title: 'BlackBucks Portal | St. Mary\'s Rehabilitation University',
    description: 'Access the BlackBucks partner route published on the SMRU website.',
    h1: 'BlackBucks Portal',
    canonical: 'https://smru.edu.in/bb/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/iiat',
    type: 'Trust',
    keyword: 'IIAT SMRU',
    intent: 'Transactional',
    title: 'IIAT Portal | St. Mary\'s Rehabilitation University',
    description: 'Access the Indian Institute of Advanced Technology partner route published on the SMRU website.',
    h1: 'IIAT Portal',
    canonical: 'https://smru.edu.in/iiat/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/niat',
    type: 'Trust',
    keyword: 'NIAT SMRU',
    intent: 'Transactional',
    title: 'NIAT | St. Mary\'s Rehabilitation University',
    description: 'Explore the NIAT partner route published on the SMRU website.',
    h1: 'NIAT',
    canonical: 'https://smru.edu.in/niat/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/qtst',
    type: 'Trust',
    keyword: 'QTST SMRU',
    intent: 'Transactional',
    title: 'QTST | St. Mary\'s Rehabilitation University',
    description: 'Explore the QTST partner route published on the SMRU website.',
    h1: 'QTST',
    canonical: 'https://smru.edu.in/qtst/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/niat-upskilling',
    type: 'Trust',
    keyword: 'NIAT Upskilling SMRU',
    intent: 'Transactional',
    title: 'NIAT Upskilling | St. Mary\'s Rehabilitation University',
    description: 'Explore the NIAT Upskilling route published on the SMRU website.',
    h1: 'NIAT Upskilling',
    canonical: 'https://smru.edu.in/niat-upskilling/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/partner/edinbox',
    type: 'Landing',
    keyword: 'B.Sc Forensic Science SMRU',
    intent: 'Transactional',
    title: 'B.Sc Forensic Science | Admissions 2026 | SMRU × AIFSET',
    description: 'Explore B.Sc Forensic Science at St. Mary\'s Rehabilitation University through the AIFSET national entrance route, with online exam access and scholarship guidance.',
    h1: 'B.Sc Forensic Science Admissions 2026',
    canonical: 'https://smru.edu.in/partner/edinbox/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/partner/ist',
    type: 'Landing',
    keyword: 'B.Tech Admissions SMRU',
    intent: 'Transactional',
    title: 'B.Tech Admissions 2026 | SMRU × Intellipaat School of Technology',
    description: 'Apply for industry-integrated B.Tech programs in AI, Data Science, and Cyber Security. Earn a UGC-recognized degree from SMRU with Intellipaat\'s career transformation.',
    h1: 'B.Tech Admissions 2026',
    canonical: 'https://smru.edu.in/partner/ist/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/approvals-recognitions',
    type: 'Trust',
    keyword: 'SMRU UGC Status',
    intent: 'Informational',
    title: 'Approvals & Recognitions | Statutory Disclosure | SMRU',
    description: 'Official approvals, recognitions, and regulatory disclosure for St. Mary\'s Rehabilitation University. Verified compliance records.',
    h1: 'Approvals & Recognitions',
    canonical: 'https://smru.edu.in/approvals-recognitions/',
    schema: 'WebPage',
    status: 'Complete',
    needsInput: 'Yes'
  },
  {
    url: '/schools/rehabilitation-sciences',
    type: 'School',
    keyword: 'School of Rehabilitation Sciences',
    intent: 'Informational',
    title: 'School of Rehabilitation Sciences | SMRU Hyderabad',
    description: 'Leading school for BASLP, BOT, and Special Education programs. Advanced clinical labs and research-driven pedagogy.',
    h1: 'School of Rehabilitation Sciences',
    canonical: 'https://smru.edu.in/schools/rehabilitation-sciences/',
    schema: 'EducationalOrganization',
    status: 'Complete',
    needsInput: 'No'
  },
  {
    url: '/schools/law',
    type: 'School',
    keyword: 'Law College in Hyderabad',
    intent: 'Informational',
    title: 'School of Law | SMRU Hyderabad | Integrated LLB Programs',
    description: 'Explore the School of Law at SMRU Hyderabad. Offering B.A. LL.B., B.B.A. LL.B., and B.Sc. LL.B. (Hons) with specialized training in AI Regulation & Forensic Jurisprudence.',
    h1: 'School of Law',
    canonical: 'https://smru.edu.in/schools/law/',
    schema: 'EducationalOrganization',
    status: 'Complete',
    needsInput: 'No'
  }
];

// 2. Parse dynamic INFO_PAGES from src/lib/seo/info-pages.ts
const infoPagesPath = path.join(rootDir, 'src', 'lib', 'seo', 'info-pages.ts');
const infoPagesContent = fs.readFileSync(infoPagesPath, 'utf8');

const pagesBlockMatch = infoPagesContent.match(/export const INFO_PAGES:\s*InfoPageConfig\[\]\s*=\s*\[([\s\S]+?)\];/);
if (!pagesBlockMatch) {
  console.error("Could not find INFO_PAGES in info-pages.ts");
  process.exit(1);
}

const pagesBlock = pagesBlockMatch[1];
const objectRegex = /\{([\s\S]+?)\s*\},/g;
let match;
const parsedInfoPages = [];

while ((match = objectRegex.exec(pagesBlock)) !== null) {
  const objText = match[1];

  const getField = (fieldName) => {
    // Capture content inside double quotes or single quotes robustly
    const doubleRegex = new RegExp(`${fieldName}:\\s*"([^"]+)"`);
    const singleRegex = new RegExp(`${fieldName}:\\s*'([^']+)'`);
    
    let m = objText.match(doubleRegex);
    if (m && m[1]) return m[1].trim();
    
    m = objText.match(singleRegex);
    if (m && m[1]) return m[1].trim();
    
    return '';
  };

  const getKeywords = () => {
    const m = objText.match(/keywords:\s*\[([\s\S]*?)\]/);
    if (m && m[1]) {
      return m[1]
        .split(',')
        .map(k => {
          const dm = k.match(/"([^"]+)"/);
          if (dm) return dm[1];
          const sm = k.match(/'([^']+)'/);
          if (sm) return sm[1];
          return k.trim();
        })
        .filter(k => k.length > 0);
    }
    return [];
  };

  const getStatus = () => {
    if (objText.includes('firstYearStatus')) return 'Not Applicable - First Academic Year';
    if (objText.includes('processStatus')) return 'Under Process';
    if (objText.includes('requestStatus')) return 'Available on Official Request';
    if (objText.includes('publicReleaseStatus')) return 'Awaiting Public Release';
    return 'Published';
  };

  const slug = getField('slug');
  const title = getField('title');
  const description = getField('description');
  const eyebrow = getField('eyebrow');
  const pageType = getField('pageType') || 'trust';
  const keywords = getKeywords();
  const status = getStatus();

  if (slug) {
    parsedInfoPages.push({
      url: `/${slug}`,
      type: pageType.charAt(0).toUpperCase() + pageType.slice(1),
      keyword: keywords[0] || slug.replace(/-/g, ' '),
      intent: 'Informational',
      title: title || `${eyebrow} | SMRU`,
      description: description || title,
      h1: eyebrow || title,
      canonical: `https://smru.edu.in/${slug}/`,
      schema: pageType === 'local' ? 'Place' : (slug === 'mandatory-disclosure' || slug === 'statutory-disclosures' ? 'AboutPage' : 'WebPage'),
      status: status,
      needsInput: status !== 'Published' ? 'Yes' : 'No'
    });
  }
}

// 3. Combine both and unique them by URL path
const allInventory = [...staticRoutes];
const seenUrls = new Set(staticRoutes.map(r => r.url));

for (const p of parsedInfoPages) {
  if (!seenUrls.has(p.url)) {
    allInventory.push(p);
    seenUrls.add(p.url);
  }
}

// Write the CSV contents
const headers = [
  'Page URL',
  'Page Type',
  'Primary Keyword',
  'Search Intent',
  'SEO Title',
  'Meta Description',
  'H1',
  'Canonical',
  'Schema Type',
  'Status',
  'Needs University Input'
];

let csvContent = headers.join(',') + '\n';
for (const item of allInventory) {
  const row = [
    item.url,
    item.type,
    item.keyword,
    item.intent,
    item.title,
    item.description,
    item.h1,
    item.canonical,
    item.schema,
    item.status,
    item.needsInput
  ];
  csvContent += row.map(escapeCSV).join(',') + '\n';
}

fs.writeFileSync(path.join(rootDir, 'seo-inventory.csv'), csvContent);
console.log(`Successfully completed SEO Inventory CSV with robust quote handling! Total rows written: ${allInventory.length}`);
