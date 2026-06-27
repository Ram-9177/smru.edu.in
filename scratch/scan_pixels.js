const sharp = require('sharp');

sharp('/Users/ram/Desktop/Campus Tour - SMRU/public/assets/school_law_hq.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    console.log(`Image info: ${info.width}x${info.height}, channels: ${info.channels}`);
    const x = Math.floor(info.width / 2);
    for (let y = 0; y < info.height; y += 25) {
      const idx = (y * info.width + x) * info.channels;
      console.log(`y=${y}: RGB(${data[idx]}, ${data[idx+1]}, ${data[idx+2]})`);
    }
  })
  .catch(err => {
    console.error(err);
  });
