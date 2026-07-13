const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/campus-360');

async function optimizePreviews() {
  const dirs = fs.readdirSync(dir);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const sub of dirs) {
    const previewPath = path.join(dir, sub, 'preview.jpg');
    if (!fs.existsSync(previewPath)) continue;

    const statsBefore = fs.statSync(previewPath);
    totalBefore += statsBefore.size;

    const tempPath = previewPath + '.tmp.jpg';

    try {
      await sharp(previewPath)
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 65, progressive: true })
        .toFile(tempPath);

      fs.renameSync(tempPath, previewPath);
      const statsAfter = fs.statSync(previewPath);
      totalAfter += statsAfter.size;
      console.log(`Optimized ${sub}: ${(statsBefore.size / 1024).toFixed(1)}KB -> ${(statsAfter.size / 1024).toFixed(1)}KB`);
    } catch (e) {
      console.error(`Error optimizing ${sub}:`, e);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }

  console.log(`\nTotal Reduction: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
}

optimizePreviews();
