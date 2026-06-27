const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    errors.push(`Page Error: ${err.message}`);
  });

  const routes = [
    '/',
    '/about/',
    '/admissions/',
    '/schools/',
    '/contact/',
    '/campus-360/',
    '/landing/law/'
  ];

  for (const route of routes) {
    console.log(`Checking ${route}...`);
    const response = await page.goto(`http://127.0.0.1:8080${route}`, { waitUntil: 'networkidle2' });
    
    if (response.status() >= 400) {
      errors.push(`HTTP Error ${response.status()} on ${route}`);
    }
  }

  await browser.close();

  if (errors.length > 0) {
    console.error("Smoke test failed with the following errors:");
    errors.forEach(e => console.error(e));
    process.exit(1);
  } else {
    console.log("Smoke test passed successfully! No 404s or console errors found.");
  }
})();
