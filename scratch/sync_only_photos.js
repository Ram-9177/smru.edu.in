const fs = require('fs');
const path = require('path');

const srcPhotos = '/Users/ram/Desktop/Campus Tour - SMRU/src/360/Photos';
const destPhotos = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-360';
const campus360Path = '/Users/ram/Desktop/Campus Tour - SMRU/src/views/Campus360.tsx';

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function run() {
  console.log('🚀 Starting exclusive sync of 360 photos (COPY ONLY)...');
  
  if (!fs.existsSync(srcPhotos)) {
    console.error('❌ Source directory not found:', srcPhotos);
    return;
  }

  // Read all files in the source directory
  const files = fs.readdirSync(srcPhotos).filter(f => !f.startsWith('.') && (f.endsWith('.jpg') || f.endsWith('.JPG') || f.endsWith('.jpeg') || f.endsWith('.png')));
  
  if (files.length === 0) {
    console.error('❌ No photos found in source directory.');
    return;
  }

  // Wipe the destination directory completely
  if (fs.existsSync(destPhotos)) {
    fs.rmSync(destPhotos, { recursive: true, force: true });
  }
  await ensureDir(destPhotos);

  const scenes = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const nameExt = path.parse(file);
    const cleanName = nameExt.name.replace(/_/g, ' ').replace(/-/g, ' ').replace(/  +/g, ' ').trim();
    const slug = slugify(cleanName) || `scene-${i}`;
    const id = `point-${slug}`;
    
    const srcPath = path.join(srcPhotos, file);
    const destDir = path.join(destPhotos, slug);
    await ensureDir(destDir);
    const destPath = path.join(destDir, 'panorama.jpg');

    console.log(`📸 Copying ${file} -> ${slug}/panorama.jpg`);
    try {
      // Just copy the file directly
      fs.copyFileSync(srcPath, destPath);
        
      scenes.push({
        id: id,
        name: cleanName,
        src: `/campus-360/${slug}/panorama.jpg`,
        alt: `Interactive 360-degree view of ${cleanName}`,
        markers: [] // Blank markers for now as we don't have map coordinates
      });
      console.log(`   ✅ Saved: ${destPath}`);
    } catch (e) {
      console.error(`   ❌ Failed processing ${file}:`, e.message);
    }
  }

  console.log('✅ Image processing complete. Found', scenes.length, 'scenes.');

  // Now rewrite the SCENES array in src/views/Campus360.tsx
  const content = fs.readFileSync(campus360Path, 'utf8');
  
  const scenesStartStr = 'const SCENES = [';
  const scenesStartIndex = content.indexOf(scenesStartStr);
  
  if (scenesStartIndex === -1) {
    console.error('❌ Could not find const SCENES array in Campus360.tsx');
    return;
  }
  
  let scenesEndIndex = -1;
  let bracketCount = 0;
  for (let i = scenesStartIndex + scenesStartStr.length; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    if (content[i] === ']') {
      if (bracketCount === 0) {
        scenesEndIndex = i + 1; // include the closing bracket
        break;
      }
      bracketCount--;
    }
  }

  if (scenesEndIndex === -1) {
    console.error('❌ Could not parse SCENES array bounds in Campus360.tsx');
    return;
  }

  const newScenesCode = `const SCENES = ${JSON.stringify(scenes, null, 2)}`;
  
  const newContent = content.substring(0, scenesStartIndex) + newScenesCode + content.substring(scenesEndIndex);
  
  fs.writeFileSync(campus360Path, newContent);
  console.log('✅ Successfully updated Campus360.tsx with the exclusive images.');
}

run().catch(console.error);
