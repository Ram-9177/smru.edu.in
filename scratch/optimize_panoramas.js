const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/campus-360');

async function optimizePanoramas() {
  const dirs = fs.readdirSync(dir);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const sub of dirs) {
    const p = path.join(dir, sub, 'panorama.jpg');
    if (!fs.existsSync(p)) continue;

    try {
      const statsBefore = fs.statSync(p);
      const metadata = await sharp(p).metadata();
      
      totalBefore += statsBefore.size;

      // Only resize if width > 4096 (which causes massive lag in WebGL on mobile)
      if (metadata.width > 4096) {
        console.log(`Optimizing ${sub}: ${metadata.width}x${metadata.height} (${(statsBefore.size / 1024 / 1024).toFixed(2)}MB)...`);
        const tempPath = p + '.tmp.jpg';

        await sharp(p)
          .resize({ width: 4096, withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true })
          .toFile(tempPath);

        fs.renameSync(tempPath, p);
        const statsAfter = fs.statSync(p);
        totalAfter += statsAfter.size;
        console.log(`  -> Reduced to ${(statsAfter.size / 1024 / 1024).toFixed(2)}MB`);
      } else {
        totalAfter += statsBefore.size;
      }
    } catch (e) {
      console.error(`Error optimizing ${sub}:`, e);
    }
  }

  console.log(`\nTotal Reduction: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
}

optimizePanoramas();
