# -*- coding: utf-8 -*-
import json

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

# Update Point 1 Title
for p in guide['points']:
    if p['id'] == 'point-1':
        p['title']['en'] = "Main Entrance and Campus Overview & Entry Gate"
        p['title']['te'] = "ప్రధాన ద్వారం మరియు క్యాంపస్ అవలోకనం"
        p['title']['hi'] = "मुख्य प्रवेश द्वार और कैंपस अवलोकन"

# Create Sign Off point if not exists
signoff_point = next((p for p in guide['points'] if p['id'] == 'point-signoff'), None)
if not signoff_point:
    # Use coordinates of the last point (Amphitheatre) for signoff or center of campus
    signoff_point = {
        "id": "point-signoff",
        "latitude": 17.3314142,
        "longitude": 78.7236271,
        "audioFileName": "signing-off.mp3",
        "mapX": 80.8,
        "mapY": 38.2,
        "title": {
            "en": "Sign Off",
            "te": "సందర్శన ముగింపు",
            "hi": "साइन ऑफ"
        },
        "transcript": {
            "en": "Thank you for taking the time to visit our campus today.\n\nWe hope this tour has given you a clear understanding of our academic environment, infrastructure, student facilities, and learning culture.\n\nAt Saint Mary’s Rehabilitation University, we focus not only on academic excellence, but also on the overall growth and future success of every student.\n\nFrom classrooms and laboratories to libraries, clinical exposure, student activities, and open learning spaces, every facility is designed to help students achieve their goals with confidence.\n\nWe look forward to welcoming you to Saint Mary’s Rehabilitation University.",
            "te": "ఈ రోజు మా క్యాంపస్‌ను సందర్శించడానికి మీ సమయాన్ని కేటాయించినందుకు ధన్యవాదాలు.\n\nఈ టూర్ ద్వారా, మా అకడమిక్ ఎన్విరాన్‌మెంట్, ఇన్‌ఫ్రాస్ట్రక్చర్, విద్యార్థుల సదుపాయాలు, మరియు లెర్నింగ్ కల్చర్ గురించి మీకు స్పష్టమైన అవగాహన వచ్చిందని మేము ఆశిస్తున్నాము.\n\nసెయింట్ మేరీస్ రిహాబిలిటేషన్ యూనివర్సిటీలో, మేము కేవలం అకడమిక్ ఎక్సలెన్స్‌పై మాత్రమే కాకుండా, ప్రతి విద్యార్థి సమగ్ర అభివృద్ధి మరియు భవిష్యత్ విజయంపై కూడా ప్రత్యేకంగా దృష్టి పెడతాము.\n\nసెయింట్ మేరీస్ రిహాబిలిటేషన్ యూనివర్సిటీలో మిమ్మల్ని స్వాగతించడానికి మేము ఎదురుచూస్తున్నాము.",
            "hi": "आज हमारे कैंपस को देखने के लिए अपना समय देने के लिए धन्यवाद।\n\nहमें उम्मीद है कि इस टूर के माध्यम से आपको हमारे अकादमिक एनवायरनमेंट, इन्फ्रास्ट्रक्चर, विद्यार्थी सुविधाओं, और लर्निंग कल्चर के बारे में स्पष्ट समझ मिली होगी।\n\nसेंट मैरीज़ रिहैबिलिटेशन यूनिवर्सिटी में आपका स्वागत करने के लिए हम उत्सुक हैं।"
        }
    }
    guide['points'].append(signoff_point)

# New order
new_point_order = [
    "point-1",   # Main Entrance & Entry Gate
    "point-4",   # A One Block
    "point-11",  # Hostel Block
    "point-22",  # Main Block
    "point-5",   # Rent a Bike
    "point-2",   # Canteen
    "point-6",   # Play & Fitness
    "point-7",   # Library
    "point-9",   # ATM
    "point-12",  # Cricket Ground
    "point-17",  # University Block
    "point-8",   # MBA & Law
    "point-18",  # Rehab Block
    "point-19",  # Sensory Park
    "point-20",  # Swimming Pool
    "point-21",  # Amphitheatre
    "point-signoff" # Sign Off
]

guide['pointOrder'] = new_point_order

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Updated guide.json with new order and Sign Off point.")
