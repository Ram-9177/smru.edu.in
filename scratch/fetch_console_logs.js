const puppeteer = require('puppeteer');

async function run() {
  console.log('Launching browser to fetch console logs...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warning' || type === 'log') {
      console.log(`[CONSOLE ${type.toUpperCase()}]: ${msg.text()}`);
    }
  });

  // Listen for request failures
  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED]: ${request.url()} - ${request.failure()?.errorText || 'unknown error'}`);
  });

  // Listen for HTTP errors
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`[HTTP ERROR ${response.status()}]: ${response.url()}`);
    }
  });

  // Listen for unhandled promise rejections
  page.on('unhandledrejection', rejectedPromise => {
    console.error(`[UNHANDLED REJECTION]:`, rejectedPromise);
  });

  // Listen for page errors
  page.on('pageerror', err => {
    console.error(`[PAGE ERROR]: ${err.message}\nStack: ${err.stack}`);
  });

  try {
    console.log('Navigating to page...');
    await page.goto('http://localhost:4000/campus-guide?skipIntro=true', {
      waitUntil: 'load',
      timeout: 15000
    });
    console.log('Page loaded. Waiting 6 seconds for hydration...');
    await new Promise(r => setTimeout(r, 6000));

    // Inspect the viewer container DOM
    const html = await page.evaluate(() => {
      const el = document.querySelector('.aspect-\\[1200\\/760\\]');
      return el ? el.innerHTML : 'Viewer container not found';
    });
    console.log('\n--- VIEW DOM ---');
    console.log(html);
    console.log('----------------\n');
  } catch (error) {
    console.error('Navigation error or timeout:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

run();
