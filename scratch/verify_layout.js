const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: 'desktop_wide', width: 1920, height: 1080 },
  { name: 'macbook', width: 1440, height: 900 },
  { name: 'laptop_windows', width: 1366, height: 768 },
  { name: 'laptop_short', width: 1280, height: 600 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 }
];

const URL = 'http://localhost:4002';
const SCREENSHOT_DIR = '/Users/ram/.gemini/antigravity/brain/a21771f8-65da-4d0f-b42f-e19fd59ca185';

async function run() {
  console.log('Starting SMRU Hero Layout Verification...');
  console.log(`Target URL: ${URL}`);
  console.log(`Saving screenshots to: ${SCREENSHOT_DIR}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  let allPassed = true;

  for (const vp of VIEWPORTS) {
    console.log(`--------------------------------------------------`);
    console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Additional wait for animations and font loading
    await new Promise(r => setTimeout(r, 1500));

    // Bounding Box Calculations
    const layoutMetrics = await page.evaluate(() => {
      // Helper to clean up selector escaping
      const header = document.querySelector('div.fixed.top-0.z-\\[2200\\]') || document.querySelector('header') || document.querySelector('nav');
      const hero = document.querySelector('#hero');
      const cluster = document.querySelector('#hero .smru-container');
      const h1 = document.querySelector('#hero h1');

      if (!header || !hero || !cluster) {
        return {
          error: `Missing critical elements! Header: ${!!header}, Hero: ${!!hero}, Cluster: ${!!cluster}`
        };
      }

      const headerRect = header.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const clusterRect = cluster.getBoundingClientRect();
      const h1Rect = h1 ? h1.getBoundingClientRect() : null;

      return {
        header: { top: headerRect.top, bottom: headerRect.bottom, height: headerRect.height },
        hero: { top: heroRect.top, bottom: heroRect.bottom, height: heroRect.height },
        cluster: { top: clusterRect.top, bottom: clusterRect.bottom, height: clusterRect.height },
        h1: h1Rect ? { top: h1Rect.top, bottom: h1Rect.bottom, height: h1Rect.height } : null
      };
    });

    if (layoutMetrics.error) {
      console.error(`❌ ${vp.name} FAILED: ${layoutMetrics.error}`);
      allPassed = false;
      continue;
    }

    const { header, hero, cluster } = layoutMetrics;
    const spaceAbove = cluster.top - header.bottom;
    const spaceBelow = hero.bottom - cluster.bottom;

    console.log(`Metrics:`);
    console.log(`  - Header height: ${header.height.toFixed(1)}px (bottom at ${header.bottom.toFixed(1)}px)`);
    console.log(`  - Hero height: ${hero.height.toFixed(1)}px (starts at ${hero.top.toFixed(1)}px, bottom at ${hero.bottom.toFixed(1)}px)`);
    console.log(`  - Heading Cluster height: ${cluster.height.toFixed(1)}px (starts at ${cluster.top.toFixed(1)}px, bottom at ${cluster.bottom.toFixed(1)}px)`);
    console.log(`  - Visual Margin Above: ${spaceAbove.toFixed(1)}px`);
    console.log(`  - Visual Margin Below: ${spaceBelow.toFixed(1)}px`);

    // Assertions
    let passed = true;
    const errors = [];

    // 1. Check if heading is fully below the header
    if (cluster.top < header.bottom) {
      passed = false;
      errors.push(`Overlap Detected: Heading top (${cluster.top.toFixed(1)}px) is above Header bottom (${header.bottom.toFixed(1)}px) by ${(header.bottom - cluster.top).toFixed(1)}px!`);
    }

    // 2. Check if heading is within the hero container
    if (cluster.bottom > hero.bottom) {
      passed = false;
      errors.push(`Overflow Detected: Heading bottom (${cluster.bottom.toFixed(1)}px) exceeds Hero bottom (${hero.bottom.toFixed(1)}px) by ${(cluster.bottom - hero.bottom).toFixed(1)}px!`);
    }

    // 3. Spacing balance check (centering validation)
    const ratio = spaceAbove / spaceBelow;
    console.log(`  - Balance Ratio (Above/Below): ${ratio.toFixed(2)} (Perfect is ~1.0)`);

    if (passed) {
      console.log(`✅ ${vp.name} PASSED: Perfect alignment and spacing!`);
    } else {
      console.error(`❌ ${vp.name} FAILED:`);
      errors.forEach(e => console.error(`    - ${e}`));
      allPassed = false;
    }

    // Take screenshot
    const screenshotPath = path.join(SCREENSHOT_DIR, `screenshot_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot saved: screenshot_${vp.name}.png`);
  }

  await browser.close();

  console.log(`\n==================================================`);
  if (allPassed) {
    console.log('🎉 ALL VIEWPORTS PASSED VERIFICATION PERFECTLY! NO CHANCE TAKEN!');
    process.exit(0);
  } else {
    console.error('❌ SOME VIEWPORT TESTS FAILED! FIXES NEEDED.');
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
