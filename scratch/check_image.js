const sharp = require('sharp');

sharp('/Users/ram/Desktop/Campus Tour - SMRU/public/assets/school_law_hq.png')
  .metadata()
  .then(metadata => {
    console.log('Image Metadata:', metadata);
  })
  .catch(err => {
    console.error('Error reading metadata:', err);
  });
