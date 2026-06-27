/**
 * deploy_hq_360.js
 * Re-exports ALL campus 360 panoramas at maximum quality from original source files.
 * - JPG originals (15520×7760): exported at 8192×4096, quality 92
 * - PNG originals (2880–2912×1440): exported at native resolution, quality 92
 * - campus-overview-360.jpg: converted from original 360 Image.png at native size
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = '/Users/ram/Desktop/Campus Tour - SMRU/src/360/Enhance';
const publicDir = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360';

// Target resolution for high-res JPG originals (15520×7760 source)
const HQ_WIDTH = 8192;
const HQ_QUALITY = 92;

// Mappings: all original files → destination panorama paths
const mappings = [
  // === HIGH-RES JPG ORIGINALS (15520×7760) ===
  { src: 'Main Gate.JPG',               dest: 'main-entry-gate/panorama.jpg',    label: 'Main Entrance Gate'               },
  { src: 'Main Gate - Open.JPG',        dest: 'signoff/panorama.jpg',            label: 'Exit Gate Sign Off'               },
  { src: 'Main Block.JPG',              dest: 'main-block/panorama.jpg',          label: 'Main Block'                       },
  { src: 'Center View.JPG',             dest: 'clock-tower/panorama.jpg',         label: "St. Mary's Clock Tower"           },
  { src: 'Central library.JPG',         dest: 'central-library/panorama.jpg',     label: 'Central Library'                  },
  { src: 'SMRU _ Library.JPG',          dest: 'canteen/panorama.jpg',             label: 'Canteen Area Center View'         },
  { src: 'ATm.JPG',                     dest: 'atm/panorama.jpg',                 label: 'ATM Facility'                     },
  { src: 'Sports Compex.JPG',           dest: 'sports-complex/panorama.jpg',      label: 'Multi-Disciplinary Sports Complex' },
  { src: 'Sports Complex & Atm.JPG',    dest: 'atm-sports/panorama.jpg',          label: 'ATM & Sports Complex Area'        },
  { src: 'Hostel.JPG',                  dest: 'hostel/panorama.jpg',              label: "Boys' Hostel Block"               },
  { src: 'Hostel.JPG',                  dest: 'girls-hostel/panorama.jpg',        label: "Girls' Hostel Block"              },
  { src: 'Cricket Ground.JPG',          dest: 'cricket-ground/panorama.jpg',      label: 'Cricket Ground'                   },
  { src: 'Class Room.JPG',              dest: 'class-room/panorama.jpg',          label: 'Smart Classroom'                  },
  { src: 'Class Room.JPG',              dest: 'university-block/panorama.jpg',    label: 'University Block Class Room'       },
  { src: 'Class Room.JPG',              dest: 'academic-block/panorama.jpg',      label: 'Academic Block'                   },
  { src: 'Disuccsion Hall.JPG',         dest: 'mba-law-block/panorama.jpg',       label: 'MBA & Law Block Discussion Hall'  },
  { src: 'Admission office 1.JPG',      dest: 'admission-office-1/panorama.jpg',  label: 'Admission Counseling Area'        },
  { src: 'Admission Office 2.JPG',      dest: 'admission-office-2/panorama.jpg',  label: 'Admission Registration Wing'      },
  { src: 'Admission Enroll Room.JPG',   dest: 'admission-enroll-room/panorama.jpg', label: 'Admission Enroll Room'          },
  { src: 'Garden.JPG',                  dest: 'rent-bike/panorama.jpg',           label: 'Rent a Bike Facility Area'        },
  { src: 'Garden.JPG',                  dest: 'sensory-park/panorama.jpg',        label: 'Sensory Park Garden'              },

  // === ORIGINAL PNG FILES (2880–2912×1440 — use at native resolution) ===
  { src: 'Admission Reception.png',          dest: 'admission-reception/panorama.jpg',  label: 'Admission Office & Reception', nativeRes: true },
  { src: 'Amphi Theater.png',               dest: 'amphitheatre/panorama.jpg',          label: 'Amphitheatre',                 nativeRes: true },
  { src: 'DBR AND Swing Pool.png',          dest: 'swimming-pool/panorama.jpg',         label: 'Swimming Pool & DBR View',     nativeRes: true },
  { src: 'Cricket Ground & Helath Block.png', dest: 'a-one-block/panorama.jpg',         label: 'A-One Block Area',             nativeRes: true },
  { src: 'Swiming pool DBR View.png',       dest: 'rehab-block/panorama.jpg',           label: 'Rehab Block and Hospital',     nativeRes: true },
];

// The full campus overview — convert from the PNG at its native 1774×887
// then upscale it to be a proper panorama for the viewer
const OVERVIEW_SRC = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360/360 Image.png';
const OVERVIEW_DEST = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360/campus-overview-360.jpg';

async function processImage(srcPath, destPath, nativeRes = false) {
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const pipeline = sharp(srcPath, { limitInputPixels: false });

  if (nativeRes) {
    // Keep native resolution, just convert to high-quality JPEG
    await pipeline
      .jpeg({ quality: HQ_QUALITY, progressive: true, mozjpeg: true })
      .toFile(destPath);
  } else {
    // Resize to HQ_WIDTH maintaining aspect ratio
    await pipeline
      .resize({ width: HQ_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: HQ_QUALITY, progressive: true, mozjpeg: true })
      .toFile(destPath);
  }
}

async function run() {
  console.log('🚀 Starting High-Quality 360° Panorama Deployment');
  console.log(`   Target: ${HQ_WIDTH}×${HQ_WIDTH/2}px @ quality ${HQ_QUALITY}\n`);

  let success = 0;
  let fail = 0;

  // Process the campus overview first
  console.log('📸 [Overview] Processing full campus aerial panorama...');
  if (fs.existsSync(OVERVIEW_SRC)) {
    try {
      const meta = await sharp(OVERVIEW_SRC, { limitInputPixels: false }).metadata();
      console.log(`   Source: ${meta.width}×${meta.height}px`);
      await sharp(OVERVIEW_SRC, { limitInputPixels: false })
        .jpeg({ quality: HQ_QUALITY, progressive: true, mozjpeg: true })
        .toFile(OVERVIEW_DEST);
      const destStat = fs.statSync(OVERVIEW_DEST);
      console.log(`   ✅ Saved: ${(destStat.size / 1024 / 1024).toFixed(1)}MB → ${OVERVIEW_DEST}`);
      success++;
    } catch (err) {
      console.error(`   ❌ Failed:`, err.message);
      fail++;
    }
  } else {
    console.warn(`   ⚠️  Source not found: ${OVERVIEW_SRC}`);
  }

  // Process all panoramas
  for (const item of mappings) {
    const srcPath = path.join(srcDir, item.src);
    const destPath = path.join(publicDir, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️  [SKIP] Source not found: ${item.src}`);
      fail++;
      continue;
    }

    try {
      const meta = await sharp(srcPath, { limitInputPixels: false }).metadata();
      const targetW = item.nativeRes ? meta.width : Math.min(HQ_WIDTH, meta.width);
      const targetH = item.nativeRes ? meta.height : Math.round(targetW / 2);
      
      console.log(`📸 [${item.label}]`);
      console.log(`   Source: ${meta.width}×${meta.height}px (${item.src})`);
      console.log(`   Output: ${targetW}×${targetH}px → ${item.dest}`);

      await processImage(srcPath, destPath, item.nativeRes);

      const destStat = fs.statSync(destPath);
      console.log(`   ✅ Saved: ${(destStat.size / 1024 / 1024).toFixed(1)}MB\n`);
      success++;
    } catch (err) {
      console.error(`   ❌ Failed (${item.src}):`, err.message, '\n');
      fail++;
    }
  }

  console.log('═'.repeat(50));
  console.log(`✅ Success: ${success} panoramas`);
  if (fail > 0) console.log(`❌ Failed:  ${fail} panoramas`);
  console.log('🎉 High-quality deployment complete!');
}

run().catch(console.error);
