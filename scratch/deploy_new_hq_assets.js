/**
 * deploy_new_hq_assets.js
 * Processes new high-quality 360 images and audio into public directories,
 * and completely rebuilds the guide.json mapping logic.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcPhotos = '/Users/ram/Desktop/Campus Tour - SMRU/src/360/Photos';
const srcAudio = '/Users/ram/Desktop/Campus Tour - SMRU/src/360/Audio/English';
const destPhotos = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360';
const destAudio = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/audio/en/common';
const guidePath = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json';

const HQ_WIDTH = 8192;
const HQ_QUALITY = 92;

// The mapping configuration
const mappings = [
  { point: 'point-overview',   photo: 'Full campus 360 Image.png',           dest: 'campus-overview', audio: null },
  { point: 'point-1',          photo: 'Entry Gate.jpeg',                     dest: 'main-entry-gate', audio: 'Entry Gate.mp3' },
  { point: 'point-overview-1', photo: 'Main Entrance and Campus Overview.jpg',dest: 'main-entrance-overview', audio: 'Main Entrance and Campus Overview.mp3', newPoint: true, title: 'Main Entrance & Campus Overview' },
  { point: 'point-2',          photo: 'Canteen area.jpg',                    dest: 'canteen', audio: 'Canteen area.mp3' },
  { point: 'point-11',         photo: 'Hostel Block.JPG',                    dest: 'hostel', audio: 'Hostel Block.mp3' },
  { point: 'point-5',          photo: 'Student Life.JPG',                    dest: 'rent-bike', audio: 'Rent a Bike Facility.mp3' },
  { point: 'point-6',          photo: 'Multi-Disciplinary Play and Fitness Complex.JPG', dest: 'sports-complex', audio: 'Multi-Disciplinary Play and Fitness Complex.mp3' },
  { point: 'point-7',          photo: 'central-library.JPG',                 dest: 'central-library', audio: 'Central Library.mp3' },
  { point: 'point-8',          photo: 'M B A and Law Block.JPG',             dest: 'mba-law-block', audio: 'M B A and Law Block.mp3' },
  { point: 'point-9',          photo: 'A T M Facility.JPG',                  dest: 'atm', audio: 'A T M Facility.mp3' },
  { point: 'point-10',         photo: 'Cricket Ground, Gymnasium, and Indoor Games.JPG', dest: 'cricket-ground', audio: 'Cricket Ground, Gymnasium, and Indoor Games.mp3' },
  { point: 'point-16',         photo: 'Admission Room.JPG',                  dest: 'admission-reception', audio: null },
  { point: 'point-17',         photo: 'University Block.JPG',                dest: 'university-block', audio: 'University Block.mp3' },
  { point: 'point-18',         photo: 'Rehab Block and Hospital.JPG',        dest: 'rehab-block', audio: 'Rehab Block and Hospital.mp3' },
  { point: 'point-19',         photo: 'Sensory Park.JPG',                    dest: 'sensory-park', audio: 'Sensory Park.mp3' },
  { point: 'point-20',         photo: 'Swimming Pool.jpeg',                  dest: 'swimming-pool', audio: 'Swimming Pool.mp3' },
  { point: 'point-21',         photo: 'Amphitheatre.JPG',                    dest: 'amphitheatre', audio: 'Amphitheatre.mp3' },
  { point: 'point-22',         photo: 'Main Block.JPG',                      dest: 'main-block', audio: 'Main Block..mp3' },
  { point: 'point-signoff',    photo: 'Signing Off.JPG',                     dest: 'signoff', audio: 'Sign Off.mp3' },
  { point: 'point-clock-tower',photo: 'Clock Tower.JPG',                     dest: 'clock-tower', audio: null },
  { point: 'point-class-room', photo: 'Class Room.JPG',                      dest: 'class-room', audio: null },
  { point: 'point-a-one-block',photo: 'A One Block.png',                     dest: 'a-one-block', audio: 'A One Block.mp3', newPoint: true, title: 'A One Block' },
  { point: 'point-atm-sports', photo: 'High View SPROTS & ATM.JPG',          dest: 'atm-sports', audio: null },
  { point: 'point-admission-office-1', photo: 'Admission Room _ Outside.JPG',dest: 'admission-office-1', audio: null },
  { point: 'point-admission-office-2', photo: 'Admission Room 2.JPG',        dest: 'admission-office-2', audio: null },
  { point: 'point-admission-enroll', photo: 'Admission Enroll Room.JPG',     dest: 'admission-enroll-room', audio: null },
  { point: 'point-board-room', photo: 'Board Room:Conference Hall.JPG',      dest: 'board-room', audio: null, newPoint: true, title: 'Board Room / Conference Hall' },
  { point: 'point-conference', photo: "Conference Hall's.JPG",               dest: 'conference-hall', audio: null, newPoint: true, title: 'Conference Halls' }
];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function run() {
  console.log('🚀 Starting Deployment...');
  await ensureDir(destPhotos);
  await ensureDir(destAudio);

  let guide = JSON.parse(fs.readFileSync(guidePath, 'utf8'));

  for (const map of mappings) {
    const photoSrc = path.join(srcPhotos, map.photo);
    if (!fs.existsSync(photoSrc)) {
      console.error(`❌ Missing photo: ${map.photo}`);
      continue;
    }

    const destPhotoDir = path.join(destPhotos, map.dest);
    await ensureDir(destPhotoDir);
    const destPhotoPath = path.join(destPhotoDir, 'panorama.jpg');

    console.log(`📸 Processing ${map.photo}...`);
    try {
      const meta = await sharp(photoSrc, { limitInputPixels: false }).metadata();
      const targetW = Math.min(HQ_WIDTH, meta.width);
      
      await sharp(photoSrc, { limitInputPixels: false })
        .resize({ width: targetW, withoutEnlargement: true })
        .jpeg({ quality: HQ_QUALITY, progressive: true, mozjpeg: true })
        .toFile(destPhotoPath);
      
      console.log(`   ✅ Saved: ${destPhotoPath}`);
    } catch (e) {
      console.error(`   ❌ Failed processing photo:`, e.message);
    }

    let finalAudioName = null;
    if (map.audio) {
      const audioSrc = path.join(srcAudio, map.audio);
      if (fs.existsSync(audioSrc)) {
        finalAudioName = map.audio;
        fs.copyFileSync(audioSrc, path.join(destAudio, finalAudioName));
        console.log(`   🔊 Copied audio: ${finalAudioName}`);
      } else {
        console.error(`   ❌ Missing audio: ${map.audio}`);
      }
    }

    // Update guide.json
    let pt = guide.points.find(p => p.id === map.point);
    if (!pt && map.newPoint) {
      pt = {
        id: map.point,
        title: { en: map.title },
        description: { en: map.title },
        category: 'info',
        coordinates: { x: 50, y: 50 } // Fallback coordinates
      };
      guide.points.push(pt);
      guide.pointOrder.push(map.point);
    }

    if (pt) {
      pt.panorama360 = {
        src: `/campus-360/${map.dest}/panorama.jpg`,
        alt: `Interactive 360-degree view of ${pt.title.en}`,
        caption: pt.title.en,
        initialYaw: 0,
        initialPitch: 0,
        initialZoom: 25
      };
      if (finalAudioName) {
        pt.audio = finalAudioName;
      } else {
        delete pt.audio;
      }
    }
  }

  // --- Add markers to point-overview ---
  const overviewPt = guide.points.find(p => p.id === 'point-overview');
  if (overviewPt && overviewPt.panorama360) {
    overviewPt.panorama360.markers = [
      { id: 'marker-main-block', targetPointId: 'point-22', yaw: 0.1, pitch: -0.2, label: 'Main Block' },
      { id: 'marker-library', targetPointId: 'point-7', yaw: -0.5, pitch: -0.15, label: 'Central Library' },
      { id: 'marker-hostel', targetPointId: 'point-11', yaw: 1.5, pitch: -0.1, label: 'Hostels' },
      { id: 'marker-sports', targetPointId: 'point-6', yaw: -1.2, pitch: -0.2, label: 'Sports Complex' },
      { id: 'marker-entry', targetPointId: 'point-1', yaw: 2.8, pitch: -0.25, label: 'Main Gate' }
    ];
  }

  fs.writeFileSync(guidePath, JSON.stringify(guide, null, 2));
  console.log('✅ Updated guide.json');
}

run().catch(console.error);
