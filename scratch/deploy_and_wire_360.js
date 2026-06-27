const fs = require('fs');
const path = require('path');

const srcDir = '/Users/ram/Desktop/Campus Tour - SMRU/src/360';
const publicDir = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360';
const guideJsonPath = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json';

// Mapping files to destination paths
const fileCopies = [
  {
    src: 'Central Library.JPG',
    dest: 'central-library/panorama.jpg'
  },
  {
    src: 'Cricket Ground.JPG',
    dest: 'cricket-ground/panorama.jpg'
  },
  {
    src: 'Hostel.JPG',
    dest: 'hostel/panorama.jpg'
  },
  {
    src: 'Hostel.JPG',
    dest: 'girls-hostel/panorama.jpg'
  },
  {
    src: 'Main Block.JPG',
    dest: 'main-block/panorama.jpg'
  },
  {
    src: 'Main Gate.JPG',
    dest: 'main-entry-gate/panorama.jpg'
  }
];

async function run() {
  try {
    // 1. Copy Files
    console.log('Starting file copying...');
    for (const item of fileCopies) {
      const srcPath = path.join(srcDir, item.src);
      const destPath = path.join(publicDir, item.dest);
      
      if (!fs.existsSync(srcPath)) {
        console.error(`Source file not found: ${srcPath}`);
        continue;
      }
      
      // Ensure target directory exists
      const targetDir = path.dirname(destPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`Created directory: ${targetDir}`);
      }
      
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${item.src} -> ${item.dest} (${(fs.statSync(destPath).size / 1024 / 1024).toFixed(2)} MB)`);
    }

    // 2. Wire guide.json
    console.log('\nReading guide.json...');
    const guideData = JSON.parse(fs.readFileSync(guideJsonPath, 'utf8'));
    
    // Modify points to add panorama360 config
    let updatedCount = 0;
    
    for (const point of guideData.points) {
      // Cricket Ground (point-12)
      if (point.id === 'point-12') {
        point.panorama360 = {
          src: '/campus-360/cricket-ground/panorama.jpg',
          alt: 'Interactive 360-degree view of the Cricket Ground at St. Mary\'s University',
          caption: 'Cricket Ground',
          initialYaw: 0,
          initialPitch: 0,
          initialZoom: 25,
          markers: [
            {
              id: 'm12-1',
              targetPointId: 'point-1',
              yaw: 3.14,
              pitch: 0,
              label: 'Main Entrance'
            }
          ]
        };
        console.log('Configured panorama360 for point-12 (Cricket Ground)');
        updatedCount++;
      }
      
      // Hostel Block (point-11)
      if (point.id === 'point-11') {
        point.panorama360 = {
          src: '/campus-360/hostel/panorama.jpg',
          alt: 'Interactive 360-degree view of the Hostel Block at St. Mary\'s University',
          caption: 'Hostel Block',
          initialYaw: 0,
          initialPitch: 0,
          initialZoom: 25,
          markers: [
            {
              id: 'm11-1',
              targetPointId: 'point-1',
              yaw: 3.14,
              pitch: 0,
              label: 'Main Entrance'
            }
          ]
        };
        console.log('Configured panorama360 for point-11 (Hostel Block)');
        updatedCount++;
      }
      
      // Main Block (point-22)
      if (point.id === 'point-22') {
        point.panorama360 = {
          src: '/campus-360/main-block/panorama.jpg',
          alt: 'Interactive 360-degree view of the Main Block at St. Mary\'s University',
          caption: 'Main Block',
          initialYaw: 0,
          initialPitch: 0,
          initialZoom: 25,
          markers: [
            {
              id: 'm22-1',
              targetPointId: 'point-1',
              yaw: 3.14,
              pitch: 0,
              label: 'Main Entrance'
            }
          ]
        };
        console.log('Configured panorama360 for point-22 (Main Block)');
        updatedCount++;
      }
    }
    
    // Save updated guide.json
    fs.writeFileSync(guideJsonPath, JSON.stringify(guideData, null, 2), 'utf8');
    console.log(`Saved guide.json updates successfully. Updated ${updatedCount} points.`);
    
  } catch (error) {
    console.error('An error occurred during deployment:', error);
  }
}

run();
