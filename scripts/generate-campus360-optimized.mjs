import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const cwd = process.cwd();
const baseDir = path.join(cwd, "public", "campus-360");

async function run() {
  if (!fs.existsSync(baseDir)) {
    console.error(`Directory not found: ${baseDir}`);
    process.exit(1);
  }

  const entries = await fsp.readdir(baseDir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  console.log(`Found ${dirs.length} campus-360 directories. Processing...\n`);

  for (const dirName of dirs) {
    const dirPath = path.join(baseDir, dirName);
    const jpgPano = path.join(dirPath, "panorama.jpg");
    const webpPano = path.join(dirPath, "panorama.webp");
    const jpgPreview = path.join(dirPath, "preview.jpg");
    const webpPreview = path.join(dirPath, "preview.webp");
    const lowResPano = path.join(dirPath, "panorama-low.webp");
    const thumbWebp = path.join(dirPath, "thumb.webp");

    // Identify source for panorama (prefer panorama.jpg if exists, else existing panorama.webp)
    const panoSource = fs.existsSync(jpgPano) ? jpgPano : fs.existsSync(webpPano) ? webpPano : null;
    // Identify source for preview (prefer preview.jpg, else panorama source)
    const previewSource = fs.existsSync(jpgPreview) ? jpgPreview : panoSource;

    if (!panoSource) {
      console.warn(`[SKIP] No panorama source for ${dirName}`);
      continue;
    }

    const panoMeta = await sharp(panoSource).metadata();
    const isFlat = panoMeta.width && panoMeta.height && panoMeta.width / panoMeta.height < 1.6;

    console.log(`Processing [${dirName}] (source: ${path.basename(panoSource)} ${panoMeta.width}x${panoMeta.height}, isFlat=${Boolean(isFlat)})...`);

    // 1. Generate / Optimize panorama.webp (2560x1280 for equirectangular, or max 1920 for flat)
    const targetPanoWidth = isFlat ? Math.min(panoMeta.width || 1920, 1920) : 2560;
    const targetPanoHeight = isFlat ? Math.min(panoMeta.height || 1080, 1080) : 1280;

    const panoPipeline = sharp(panoSource).rotate();
    if (isFlat) {
      panoPipeline.resize({ width: targetPanoWidth, height: targetPanoHeight, fit: "inside", withoutEnlargement: true });
    } else {
      panoPipeline.resize({ width: targetPanoWidth, height: targetPanoHeight, fit: "fill" });
    }

    const tmpWebpPano = `${webpPano}.tmp.webp`;
    await panoPipeline
      .webp({ quality: isFlat ? 78 : 72, effort: 6, smartSubsample: true })
      .toFile(tmpWebpPano);
    await fsp.rename(tmpWebpPano, webpPano);

    // 2. Generate panorama-low.webp (768x384 for instant 360 preview, ~15-25 KB)
    const tmpLowRes = `${lowResPano}.tmp.webp`;
    const lowWidth = isFlat ? 640 : 768;
    const lowHeight = isFlat ? 360 : 384;
    await sharp(panoSource)
      .rotate()
      .resize({ width: lowWidth, height: lowHeight, fit: isFlat ? "inside" : "fill", withoutEnlargement: true })
      .webp({ quality: 48, effort: 6, smartSubsample: true })
      .toFile(tmpLowRes);
    await fsp.rename(tmpLowRes, lowResPano);

    // 3. Generate preview.webp (1280x640 for high quality card preview, ~40-70 KB)
    if (previewSource) {
      const tmpPreview = `${webpPreview}.tmp.webp`;
      await sharp(previewSource)
        .rotate()
        .resize({ width: 1280, height: 640, fit: isFlat ? "inside" : "fill", withoutEnlargement: true })
        .webp({ quality: 72, effort: 6, smartSubsample: true })
        .toFile(tmpPreview);
      await fsp.rename(tmpPreview, webpPreview);
    }

    // 4. Generate thumb.webp (360x180 cover for bottom strip carousel, ~6-10 KB)
    if (previewSource) {
      const tmpThumb = `${thumbWebp}.tmp.webp`;
      await sharp(previewSource)
        .rotate()
        .resize({ width: 360, height: 180, fit: "cover", position: "center" })
        .webp({ quality: 75, effort: 6, smartSubsample: true })
        .toFile(tmpThumb);
      await fsp.rename(tmpThumb, thumbWebp);
    }

    const sPano = (fs.statSync(webpPano).size / 1024).toFixed(0);
    const sLow = (fs.statSync(lowResPano).size / 1024).toFixed(0);
    const sPrev = fs.existsSync(webpPreview) ? (fs.statSync(webpPreview).size / 1024).toFixed(0) : "N/A";
    const sThumb = fs.existsSync(thumbWebp) ? (fs.statSync(thumbWebp).size / 1024).toFixed(0) : "N/A";

    console.log(`  -> panorama.webp: ${sPano} KB | panorama-low.webp: ${sLow} KB | preview.webp: ${sPrev} KB | thumb.webp: ${sThumb} KB`);
  }

  console.log("\nImage optimization complete for all campus-360 locations!");
}

run().catch((err) => {
  console.error("Optimization failed:", err);
  process.exit(1);
});
