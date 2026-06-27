const fs = require('fs');

const guideJsonPath = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json';

try {
  console.log('Reading guide.json...');
  const guideData = JSON.parse(fs.readFileSync(guideJsonPath, 'utf8'));
  
  let clearedCount = 0;
  for (const point of guideData.points) {
    if (point.panorama360 && point.panorama360.markers) {
      delete point.panorama360.markers;
      clearedCount++;
      console.log(`Removed markers from point: ${point.id} (${point.title.en})`);
    }
  }
  
  fs.writeFileSync(guideJsonPath, JSON.stringify(guideData, null, 2), 'utf8');
  console.log(`\nSuccessfully removed markers from ${clearedCount} points in guide.json.`);
} catch (error) {
  console.error('Failed to remove markers:', error);
}
