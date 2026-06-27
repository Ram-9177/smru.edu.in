const fs = require('fs');
const path = require('path');

const baseDir = '/Users/ram/Desktop/Campus Tour - SMRU';
const guideJsonPath = path.join(baseDir, 'public/campus-guide/data/guide.json');

try {
  if (!fs.existsSync(guideJsonPath)) {
    console.error(`guide.json not found at: ${guideJsonPath}`);
    process.exit(1);
  }

  const guideData = JSON.parse(fs.readFileSync(guideJsonPath, 'utf8'));
  let updatedCount = 0;

  for (const point of guideData.points) {
    if (point.audio) {
      console.log(`Found audio override for point: ${point.id}`);
      // If it contains /campus-audio, delete it to fall back to audioFileName
      const hasInvalidPath = Object.values(point.audio).some(val => val && val.includes('/campus-audio'));
      if (hasInvalidPath) {
        delete point.audio;
        console.log(`-> Removed invalid audio override for: ${point.id}`);
        updatedCount++;
      }
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(guideJsonPath, JSON.stringify(guideData, null, 2), 'utf8');
    console.log(`\nSuccessfully updated ${updatedCount} points in guide.json!`);
  } else {
    console.log('\nNo points needed audio override cleanup.');
  }
} catch (error) {
  console.error('Error fixing audio paths:', error);
}
