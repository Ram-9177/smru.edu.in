const sharp = require('sharp');

sharp('/Users/ram/Desktop/Campus Tour - SMRU/public/assets/school_law_hq.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    // Info has width and height
    const x = Math.floor(info.width / 2);
    const y = Math.floor(info.height / 2);
    const pixelIndex = (y * info.width + x) * info.channels;
    
    const r = data[pixelIndex];
    const g = data[pixelIndex + 1];
    const b = data[pixelIndex + 2];
    
    console.log(`Center pixel at (${x}, ${y}): RGB(${r}, ${g}, ${b})`);
    
    // Let's also check a few other spots in the middle
    const spots = [
      { x: 300, y: 200 },
      { x: 500, y: 300 },
      { x: 700, y: 250 }
    ];
    
    spots.forEach(spot => {
      const idx = (spot.y * info.width + spot.x) * info.channels;
      console.log(`Spot at (${spot.x}, ${spot.y}): RGB(${data[idx]}, ${data[idx+1]}, ${data[idx+2]})`);
    });
  })
  .catch(err => {
    console.error(err);
  });
