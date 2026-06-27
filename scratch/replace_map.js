const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = '/Users/ram/Desktop/Campus Tour - SMRU/src/360/Full Campus.PNG';
const outputWebpPath = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/images/campus-satellite.webp';
const outputJpgPath = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/images/campus-satellite.jpg';

async function replaceImages() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error(`Input file not found at: ${inputPath}`);
      process.exit(1);
    }

    console.log('Found Full Campus.PNG, converting and replacing map images...');
    
    // Save to webp (used by guide.json, Campus360.tsx, CampusGuide.tsx)
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputWebpPath);
    console.log(`Successfully replaced webp map at: ${outputWebpPath}`);

    // Save to jpg (used by calibrate and python scripts)
    await sharp(inputPath)
      .jpeg({ quality: 90 })
      .toFile(outputJpgPath);
    console.log(`Successfully replaced jpg map at: ${outputJpgPath}`);
    
    console.log('Image replacement complete!');
  } catch (error) {
    console.error('Failed to replace map images:', error);
    process.exit(1);
  }
}

replaceImages();
