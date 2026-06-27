const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseDir = '/Users/ram/Desktop/Campus Tour - SMRU';
const srcDir = path.join(baseDir, 'src/360');
const public360Dir = path.join(baseDir, 'public/campus-360');
const guideJsonPath = path.join(baseDir, 'public/campus-guide/data/guide.json');

// Mappings for 360-degree panorama images
const mappings = [
  { src: 'Enhance/Main Gate.JPG', dest: 'main-entry-gate/panorama.jpg', pointId: 'point-1', caption: 'Main Entry Gate' },
  { src: 'Enhance/Admission Reception.png', dest: 'admission-reception/panorama.jpg', pointId: 'point-16', caption: 'Admission Office & Reception' },
  { src: 'Enhance/Admission office 1.JPG', dest: 'admission-office-1/panorama.jpg', pointId: 'point-admission-office-1', caption: 'Admission Office Counseling Area' },
  { src: 'Enhance/Admission Office 2.JPG', dest: 'admission-office-2/panorama.jpg', pointId: 'point-admission-office-2', caption: 'Admission Registration Wing' },
  { src: 'Enhance/Admission Enroll Room.JPG', dest: 'admission-enroll-room/panorama.jpg', pointId: 'point-admission-enroll', caption: 'Admission Enroll Room' },
  { src: 'Enhance/Amphi Theater.png', dest: 'amphitheatre/panorama.jpg', pointId: 'point-21', caption: 'Amphitheatre' },
  { src: 'Enhance/ATm.JPG', dest: 'atm/panorama.jpg', pointId: 'point-9', caption: 'ATM Facility' },
  { src: 'Enhance/Center View.JPG', dest: 'clock-tower/panorama.jpg', pointId: 'point-clock-tower', caption: 'St. Mary\'s Clock Tower' },
  { src: 'Enhance/SMRU _ Library.JPG', dest: 'central-library/panorama.jpg', pointId: 'point-7', caption: 'Central Library' },
  { src: 'Enhance/Class Room.JPG', dest: 'class-room/panorama.jpg', pointId: 'point-class-room', caption: 'Class Room' },
  { src: 'Enhance/Class Room.JPG', dest: 'academic-block/panorama.jpg', pointId: 'point-academic-block', caption: 'Academic Block' },
  { src: 'Enhance/Class Room.JPG', dest: 'a-one-block/panorama.jpg', pointId: 'point-4', caption: 'A One Block Class Room' }, // Keep file updated
  { src: 'Enhance/Cricket Ground & Helath Block.png', dest: 'cricket-ground/panorama.jpg', pointId: 'point-12', caption: 'Cricket Ground' },
  { src: 'Enhance/DBR AND Swing Pool.png', dest: 'swimming-pool/panorama.jpg', pointId: 'point-20', caption: 'Swimming Pool & DBR View' },
  { src: 'Enhance/Disuccsion Hall.JPG', dest: 'mba-law-block/panorama.jpg', pointId: 'point-8', caption: 'MBA and Law Block Discussion Hall' },
  { src: 'Enhance/Garden.JPG', dest: 'sensory-park/panorama.jpg', pointId: 'point-19', caption: 'Sensory Park Garden' },
  { src: 'Enhance/Hostel.JPG', dest: 'hostel/panorama.jpg', pointId: 'point-11', caption: 'Hostel Block' },
  { src: 'Enhance/Hostel.JPG', dest: 'girls-hostel/panorama.jpg', pointId: 'point-13', caption: 'Girls\' Hostel Block' },
  { src: 'Enhance/Main Block.JPG', dest: 'main-block/panorama.jpg', pointId: 'point-22', caption: 'Main Block' },
  { src: 'Enhance/Main Gate - Open.JPG', dest: 'signoff/panorama.jpg', pointId: 'point-signoff', caption: 'Exit Gate Sign Off' },
  { src: 'Enhance/Sports Compex.JPG', dest: 'sports-complex/panorama.jpg', pointId: 'point-6', caption: 'Play and Fitness Complex' },
  { src: 'Sports and ATM.png', dest: 'atm-sports/panorama.jpg', pointId: 'point-atm-sports', caption: 'ATM & Sports Complex Area' },
  { src: 'Enhance/Admission Reception.png', dest: 'university-block/panorama.jpg', pointId: 'point-17', caption: 'University Block Class Room' },
  { src: 'Enhance/Amphi Theater.png', dest: 'rehab-block/panorama.jpg', pointId: 'point-18', caption: 'Rehab Block and Hospital' }
];

async function run() {
  try {
    // 1. Process 360 images
    console.log('Optimizing and copying 360 images...');
    for (const item of mappings) {
      const srcPath = path.join(srcDir, item.src);
      const destPath = path.join(public360Dir, item.dest);
      
      if (!fs.existsSync(srcPath)) {
        console.warn(`Source file not found: ${srcPath}`);
        continue;
      }
      
      const targetDir = path.dirname(destPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      console.log(`Processing: ${item.src} -> ${item.dest}...`);
      await sharp(srcPath)
        .resize({ width: 4096, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(destPath);
      
      console.log(`Saved: ${destPath}`);
    }

    // 2. Copy standard University.png image
    const srcUniImg = path.join(baseDir, 'src/assets/Campusimages/University.png');
    const destUniImg = path.join(baseDir, 'public/assets/Campusimages/University.png');
    if (fs.existsSync(srcUniImg)) {
      const destDir = path.dirname(destUniImg);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(srcUniImg, destUniImg);
      console.log('\nSuccessfully copied University.png static image to public assets!');
    } else {
      console.warn(`\nUniversity static image not found at: ${srcUniImg}`);
    }

    // 3. Update guide.json
    console.log('\nUpdating guide.json points...');
    if (!fs.existsSync(guideJsonPath)) {
      console.error(`guide.json not found at: ${guideJsonPath}`);
      return;
    }

    const guideData = JSON.parse(fs.readFileSync(guideJsonPath, 'utf8'));

    // Set updated pointOrder (excluding point-4, adding new points)
    const newPointOrder = [
      "point-1",
      "point-5",
      "point-2",
      "point-clock-tower",
      "point-6",
      "point-atm-sports",
      "point-9",
      "point-7",
      "point-8",
      "point-12",
      "point-11",
      "point-13",
      "point-class-room",
      "point-22",
      "point-16",
      "point-admission-office-1",
      "point-admission-office-2",
      "point-admission-enroll",
      "point-17",
      "point-18",
      "point-19",
      "point-20",
      "point-21",
      "point-signoff"
    ];
    guideData.pointOrder = newPointOrder;

    // Define details for new points to be added
    const newPoints = [
      {
        id: "point-clock-tower",
        latitude: 17.3315,
        longitude: 78.7265,
        audioFileName: "",
        mapX: 65.0,
        mapY: 45.0,
        title: {
          en: "St. Mary's Clock Tower",
          te: "స్టాఫ్ మేరీస్ క్లాక్ టవర్",
          hi: "सेंट मैरीज़ क्लॉक टॉवर"
        },
        transcript: {
          en: "Welcome to the St. Mary's Clock Tower, the central landmark connecting all major sectors of the university campus.",
          te: "యూనివర్సిటీ క్యాంపస్‌లోని అన్ని ప్రధాన విభాగాలను అనుసంధానించే కేంద్ర ల్యాండ్‌మార్క్ అయిన స్టాఫ్ మేరీస్ క్లాక్ టవర్‌కు స్వాగతం.",
          hi: "सेंट मैरीज़ क्लॉक टॉवर में आपका स्वागत है, जो विश्वविद्यालय परिसर के सभी प्रमुख क्षेत्रों को जोड़ने वाला केंद्रीय मील का पत्थर है।"
        }
      },
      {
        id: "point-class-room",
        latitude: 17.3311,
        longitude: 78.7272,
        audioFileName: "",
        mapX: 85.0,
        mapY: 55.0,
        title: {
          en: "Class Room",
          te: "క్లాస్ రూమ్",
          hi: "क्लास रूम"
        },
        transcript: {
          en: "Explore one of our modern, smart class spaces designed for interactive and comfortable student learning.",
          te: "విద్యార్థులు ఇంటరాక్టివ్‌గా మరియు సౌకర్యవంతంగా నేర్చుకోవడానికి అనువైన మా ఆధునిక, స్మార్ట్ క్లాస్ స్పేస్‌లను అన్వేషించండి.",
          hi: "इंटरैक्टिव और आरामदायक छात्र सीखने के लिए डिज़ाइन किए गए हमारे आधुनिक, स्मार्ट क्लास स्पेस में से एक का अन्वेषण करें।"
        }
      },
      {
        id: "point-atm-sports",
        latitude: 17.3319,
        longitude: 78.7261,
        audioFileName: "",
        mapX: 57.5,
        mapY: 33.5,
        title: {
          en: "ATM & Sports Complex Link",
          te: "ఏటీఎం మరియు స్పోర్ట్స్ కాంప్లెక్స్ లింక్",
          hi: "एटीएम और स्पोर्ट्स कॉम्प्लेक्स लिंक"
        },
        transcript: {
          en: "This area connects our ATM and banking facilities with the multidisciplinary sports and fitness complex.",
          te: "ఈ ప్రాంతం మా ఏటీఎం మరియు బ్యాంకింగ్ సదుపాయాలను మల్టీ-డిసిప్లినరీ స్పోర్ట్స్ అండ్ ఫిట్‌నెస్ కాంప్లెక్స్‌తో కలుపుతుంది.",
          hi: "यह क्षेत्र हमारे एटीएम और बैंकिंग सुविधाओं को बहु-विषयक खेल और फिटनेस परिसर से जोड़ता है।"
        }
      },
      {
        id: "point-admission-office-1",
        latitude: 17.3315,
        longitude: 78.7242,
        audioFileName: "",
        mapX: 27.3,
        mapY: 42.0,
        title: {
          en: "Admission Office Counseling Area",
          te: "అడ్మిషన్ల కార్యాలయ కౌన్సెలింగ్ విభాగం",
          hi: "प्रवेश कार्यालय परामर्श क्षेत्र"
        },
        transcript: {
          en: "Explore the main counseling desks inside the Admission Office where enrollment guidance is provided.",
          te: "అడ్మిషన్ల కార్యాలయంలోని ప్రధాన కౌన్సెలింగ్ డెస్క్‌లను అన్వేషించండి, ఇక్కడ విద్యార్థులకు ప్రవేశ మార్గదర్శకత్వం అందించబడుతుంది.",
          hi: "प्रवेश कार्यालय के भीतर मुख्य परामर्श डेस्क का अन्वेषण करें जहां नामांकन मार्गदर्शन प्रदान किया जाता है।"
        }
      },
      {
        id: "point-admission-office-2",
        latitude: 17.3316,
        longitude: 78.7244,
        audioFileName: "",
        mapX: 28.5,
        mapY: 43.2,
        title: {
          en: "Admission Registration Wing",
          te: "అడ్మిషన్ రిజిస్ట్రేషన్ విభాగం",
          hi: "प्रवेश पंजीकरण विंग"
        },
        transcript: {
          en: "This wing of the Admission Office handles document verification, academic registration, and student inquiries.",
          te: "అడ్మిషన్ల కార్యాలయం యొక్క ఈ విభాగం పత్రాల ధృవీకరణ, విద్యా నమోదు మరియు విద్యార్థుల విచారణలను నిర్వహిస్తుంది.",
          hi: "प्रवेश कार्यालय का यह विंग दस्तावेज़ सत्यापन, शैक्षणिक पंजीकरण और छात्र पूछताछ को संभालता है।"
        }
      },
      {
        id: "point-admission-enroll",
        latitude: 17.3317,
        longitude: 78.7241,
        audioFileName: "",
        mapX: 26.1,
        mapY: 43.2,
        title: {
          en: "Admission Enroll Room",
          te: "అడ్మిషన్ ఎన్‌రోల్ రూమ్",
          hi: "प्रवेश नामांकन कक्ष"
        },
        transcript: {
          en: "Step inside the Admission Enroll Room, where prospective students complete their onboarding and registry.",
          te: "అడ్మిషన్ ఎన్‌రోల్ రూమ్‌లోకి అడుగు పెట్టండి, ఇక్కడ విద్యార్థులు తమ ఆన్‌బోర్డింగ్ మరియు రిజిస్ట్రేషన్‌ను పూర్తి చేస్తారు.",
          hi: "प्रवेश नामांकन कक्ष के अंदर कदम रखें, जहां संभावित छात्र अपना ऑनबोर्डिंग और रजिस्ट्री पूरा करते हैं।"
        }
      }
    ];

    // Merge new points and update existing points
    let pointsList = guideData.points;
    
    // 1. Remove point-4 from points list
    pointsList = pointsList.filter(p => p.id !== 'point-4');

    // 2. Add or update points list
    for (const newPt of newPoints) {
      const idx = pointsList.findIndex(p => p.id === newPt.id);
      if (idx !== -1) {
        pointsList[idx] = { ...pointsList[idx], ...newPt };
      } else {
        pointsList.push(newPt);
      }
    }
    
    guideData.points = pointsList;

    // 3. Apply mappings and metadata
    for (const point of guideData.points) {
      const mapping = mappings.find(m => m.pointId === point.id);
      if (mapping) {
        point.panorama360 = {
          src: `/campus-360/${mapping.dest}`,
          alt: `Interactive 360-degree view of ${mapping.caption} at St. Mary's University`,
          caption: mapping.caption,
          initialYaw: 0,
          initialPitch: 0,
          initialZoom: 0
        };
        console.log(`Wired 360 config for: ${point.id} (${point.title.en})`);
      }

      // Special case: University Block static photo fallback update
      if (point.id === 'point-17') {
        point.image = '/assets/Campusimages/University.png';
        console.log(`Updated University Block image to /assets/Campusimages/University.png`);
      }
    }

    fs.writeFileSync(guideJsonPath, JSON.stringify(guideData, null, 2), 'utf8');
    console.log('\nSuccessfully saved all guide.json configurations!');

  } catch (error) {
    console.error('Error executing deployment:', error);
  }
}

run();
