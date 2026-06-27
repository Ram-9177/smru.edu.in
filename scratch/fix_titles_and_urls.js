const fs = require('fs');
const path = require('path');

// 1. Fix Mandatory Disclosure title
let mdPath = path.join(__dirname, '../app/mandatory-disclosure/page.tsx');
if (fs.existsSync(mdPath)) {
  let mdContent = fs.readFileSync(mdPath, 'utf8');
  mdContent = mdContent.replace(/title: "Mandatory Disclosure for Stmarys University"/, 'title: "Mandatory Disclosure | Stmarys University"');
  fs.writeFileSync(mdPath, mdContent);
}

// 2. Fix route-registry.tsx titles
let routePath = path.join(__dirname, '../src/lib/shared/route-registry.tsx');
if (fs.existsSync(routePath)) {
  let routeContent = fs.readFileSync(routePath, 'utf8');
  routeContent = routeContent.replace(/title: "Admissions 2026 \| UG, PG & Doctoral Pathways \| Stmarys University"/, 'title: "Admissions Open 2026 | Stmarys University"');
  routeContent = routeContent.replace(/title: "Academic Schools \| Professional Degree Programs in Hyderabad \| Stmarys University"/, 'title: "Courses Offered at Stmarys University | UG, PG & Professional Programmes"');
  fs.writeFileSync(routePath, routeContent);
}

console.log('Titles fixed.');
