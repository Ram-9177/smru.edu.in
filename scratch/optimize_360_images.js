const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targets = [
  '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360/central-library/panorama.jpg',
  '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360/cricket-ground/panorama.jpg',
  '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360/hostel/panorama.jpg',
  '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360/girls-hostel/panorama.jpg',
  '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360/main-block/panorama.jpg',
  '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360/main-entry-gate/panorama.jpg'
];

async function optimize() {
  console.log('Starting 360 image optimization...');
  for (const filePath of targets) {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const stats = fs.statSync(filePath);
    const originalSizeMB = stats.size / 1024 / 1024;
    console.log(`\nOptimizing: ${path.basename(path.dirname(filePath))} (${originalSizeMB.toFixed(2)} MB)`);

    try {
      const metadata = await sharp(filePath).metadata();
      console.log(`Original Dimensions: ${metadata.width}x${metadata.height}`);

      const tempPath = filePath + '.tmp';
      
      // Equirectangular standard: 4096 width is ideal for WebGL on mobile and desktop
      await sharp(filePath)
        .resize({ width: 4096, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(tempPath);

      fs.renameSync(tempPath, filePath);
      
      const newStats = fs.statSync(filePath);
      const newSizeMB = newStats.size / 1024 / 1024;
      console.log(`Optimized Size: ${newSizeMB.toFixed(2)} MB (Reduced by ${((1 - newSizeMB/originalSizeMB) * 100).toFixed(1)}%)`);
    } catch (err) {
      console.error(`Failed to optimize ${filePath}:`, err);
    }
  }
  console.log('\nOptimization finished!');
}

optimize();
