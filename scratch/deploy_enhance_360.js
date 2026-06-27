const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = '/Users/ram/Desktop/DJI/Enhance';
const publicDir = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360';
const guideJsonPath = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json';

const mappings = [
  { src: 'Main Gate.JPG', dest: 'main-entry-gate/panorama.jpg', pointId: 'point-1', caption: 'Main Entry Gate' },
  { src: 'Class Room.JPG', dest: 'a-one-block/panorama.jpg', pointId: 'point-4', caption: 'A One Block Class Room' },
  { src: 'Garden.JPG', dest: 'rent-bike/panorama.jpg', pointId: 'point-5', caption: 'Rent a Bike Facility Area' },
  { src: 'Center View.JPG', dest: 'canteen/panorama.jpg', pointId: 'point-2', caption: 'Canteen Area Center View' },
  { src: 'Sports Compex.JPG', dest: 'sports-complex/panorama.jpg', pointId: 'point-6', caption: 'Play and Fitness Complex' },
  { src: 'Central library.JPG', dest: 'central-library/panorama.jpg', pointId: 'point-7', caption: 'Central Library' },
  { src: 'ATm.JPG', dest: 'atm/panorama.jpg', pointId: 'point-9', caption: 'ATM Facility' },
  { src: 'Cricket Ground.JPG', dest: 'cricket-ground/panorama.jpg', pointId: 'point-12', caption: 'Cricket Ground' },
  { src: 'Class Room.JPG', dest: 'university-block/panorama.jpg', pointId: 'point-17', caption: 'University Block Class Room' },
  { src: 'Disuccsion Hall.JPG', dest: 'mba-law-block/panorama.jpg', pointId: 'point-8', caption: 'MBA and Law Block Discussion Hall' },
  { src: 'Center View.JPG', dest: 'rehab-block/panorama.jpg', pointId: 'point-18', caption: 'Rehab Block and Hospital' },
  { src: 'Garden.JPG', dest: 'sensory-park/panorama.jpg', pointId: 'point-19', caption: 'Sensory Park Garden' },
  { src: 'DBR AND Swing Pool.png', dest: 'swimming-pool/panorama.jpg', pointId: 'point-20', caption: 'Swimming Pool & DBR View' },
  { src: 'amphitheatre.png', dest: 'amphitheatre/panorama.jpg', pointId: 'point-21', caption: 'Amphitheatre' },
  { src: 'Hostel.JPG', dest: 'hostel/panorama.jpg', pointId: 'point-11', caption: 'Hostel Block' },
  { src: 'Main Block.JPG', dest: 'main-block/panorama.jpg', pointId: 'point-22', caption: 'Main Block' },
  { src: 'Admission Reception.png', dest: 'admission-reception/panorama.jpg', pointId: 'point-16', caption: 'Admission Office & Reception' },
  { src: 'Main Gate - Open.JPG', dest: 'signoff/panorama.jpg', pointId: 'point-signoff', caption: 'Exit Gate Sign Off' }
];

async function run() {
  console.log('Optimizing and copying 360 images...');
  for (const item of mappings) {
    const srcPath = path.join(srcDir, item.src);
    const destPath = path.join(publicDir, item.dest);
    
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source file not found: ${srcPath}`);
      continue;
    }
    
    const targetDir = path.dirname(destPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    try {
      console.log(`Processing ${item.src} -> ${item.dest}...`);
      await sharp(srcPath)
        .resize({ width: 4096, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(destPath);
      
      console.log(`Success! Saved ${destPath}`);
    } catch (err) {
      console.error(`Error processing ${item.src}:`, err);
    }
  }
  
  // Now update guide.json
  console.log('\nReading guide.json...');
  const guideData = JSON.parse(fs.readFileSync(guideJsonPath, 'utf8'));
  
  for (const point of guideData.points) {
    const mapping = mappings.find(m => m.pointId === point.id);
    if (mapping) {
      point.panorama360 = {
        src: `/campus-360/${mapping.dest}`,
        alt: `Interactive 360-degree view of ${mapping.caption} at St. Mary's University`,
        caption: mapping.caption,
        initialYaw: 0,
        initialPitch: 0,
        initialZoom: 25
      };
      console.log(`Wired panorama360 for ${point.id} (${point.title.en})`);
    }
  }
  
  fs.writeFileSync(guideJsonPath, JSON.stringify(guideData, null, 2), 'utf8');
  console.log('\nSaved guide.json updates successfully!');
}

run();
