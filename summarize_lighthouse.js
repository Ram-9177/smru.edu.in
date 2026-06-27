const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));
  const categories = data.categories;
  
  console.log('--- Lighthouse Scores ---');
  for (const [key, value] of Object.entries(categories)) {
    console.log(`${value.title}: ${Math.round(value.score * 100)}`);
  }
  
  console.log('\n--- Core Web Vitals ---');
  const audits = data.audits;
  const metrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'total-blocking-time',
    'cumulative-layout-shift',
    'speed-index'
  ];
  
  for (const metric of metrics) {
    if (audits[metric]) {
      console.log(`${audits[metric].title}: ${audits[metric].displayValue}`);
    }
  }
  
  console.log('\n--- Top Opportunities (Performance) ---');
  const opportunities = Object.values(audits).filter(a => a.details && a.details.type === 'opportunity' && a.score !== 1);
  opportunities.sort((a, b) => (b.details.overallSavingsMs || 0) - (a.details.overallSavingsMs || 0));
  
  opportunities.slice(0, 3).forEach(opp => {
    console.log(`- ${opp.title}: save ~${Math.round(opp.details.overallSavingsMs)}ms`);
  });

  console.log('\n--- Accessibility Issues ---');
  const a11yIssues = Object.values(audits).filter(a => a.score === 0 && categories.accessibility.auditRefs.some(ref => ref.id === a.id));
  a11yIssues.forEach(issue => {
    console.log(`- ${issue.title}`);
  });

} catch (e) {
  console.error('Error reading report:', e.message);
}
