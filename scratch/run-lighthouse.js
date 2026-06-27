const { execSync } = require('child_process');
const fs = require('fs');

const routes = [
  '/',
  '/about/',
  '/admissions/',
  '/schools/',
  '/partner/qtst/',
  '/campus-360/',
  '/contact/'
];

const results = {};

console.log("Starting static server...");
// Note: Assuming `npx http-server out -p 8080 &` is run before this script.

for (const route of routes) {
  console.log(`Running lighthouse for ${route}...`);
  const url = `http://127.0.0.1:8080${route}`;
  try {
    execSync(`npx --yes lighthouse "${url}" --output=json --output-path=lh-report.json --chrome-flags="--headless --no-sandbox"`, { stdio: 'inherit' });
    const report = JSON.parse(fs.readFileSync('lh-report.json', 'utf8'));
    
    results[route] = {
      performance: report.categories.performance.score * 100,
      accessibility: report.categories.accessibility.score * 100,
      bestPractices: report.categories['best-practices'].score * 100,
      seo: report.categories.seo.score * 100
    };
    console.log(`Results for ${route}:`, results[route]);
  } catch (err) {
    console.error(`Failed for ${route}:`, err.message);
  }
}

fs.writeFileSync('final-lh-results.json', JSON.stringify(results, null, 2));
console.log("Finished lighthouse tests.");
