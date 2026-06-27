const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/compliance-pages.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Update ComplianceStatus type
content = content.replace(
  `  | "Pending official document/data from university office.";`,
  `  | "Pending official document/data from university office."
  | "Being updated"
  | "To be updated after statutory approval"
  | "Available through admissions office"
  | "Under review";`
);

// We need to keep 'pending' variable as it's used heavily, but change its value to avoid bluntness if we want?
// The prompt says "Do not show too many "Pending" items bluntly. Replace with professional status language..."

// Let's replace status assignments directly based on slug.
const replaceStatus = (slug, newStatus) => {
  const regex = new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?status:\\s*)pending(,)`);
  content = content.replace(regex, `$1"${newStatus}"$2`);
};

replaceStatus('programmes-offered', 'Available through admissions office');
replaceStatus('fees', 'Available through admissions office');
replaceStatus('faculty', 'Being updated');
replaceStatus('statutory-bodies', 'To be updated after statutory approval');
replaceStatus('governance', 'To be updated after statutory approval');
replaceStatus('infrastructure', 'Being updated');
replaceStatus('student-support', 'Being updated');
replaceStatus('anti-ragging', 'Being updated');
replaceStatus('grievance-redressal', 'Being updated');
replaceStatus('policies', 'Under review');

// Let's also replace other 'pending' usages in the file if they are blunt, but wait, the instructions are to replace the status of priority items.
// I'll rewrite the intro in app/mandatory-disclosure/page.tsx too.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed compliance-pages.ts');
