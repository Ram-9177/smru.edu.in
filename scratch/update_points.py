import json

def calculate_map_coords(lat, lon):
    # Calibrated linear model
    A = 15016.2
    B = -1182101.82
    C = -41303.0
    D = 715889.35
    
    mapX = A * lon + B
    mapY = C * lat + D
    return round(mapX, 2), round(mapY, 2)

points_data = [
    {"name": "Entry Gate", "lat": 17.33202, "lon": 78.72782, "id": "point-1", "audio": "entry-gate-combined.mp3"},
    {"name": "Canteen", "lat": 17.33218, "lon": 78.7269, "id": "point-2", "audio": "student-cafeteria.mp3"},
    {"name": "Hostel Block", "lat": 17.33109, "lon": 78.72788, "id": "point-3", "audio": "hostel-block-ground.mp3"},
    {"name": "A One Block", "lat": 17.33082, "lon": 78.72861, "id": "point-4", "audio": "a-one-block.mp3"},
    {"name": "Rent a Bike Facility", "lat": 17.33189, "lon": 78.72677, "id": "point-5", "audio": "electric-bikes.mp3"},
    {"name": "Multi-Disciplinary Play and Fitness Complex", "lat": 17.3319, "lon": 78.72644, "id": "point-6", "audio": "play-fitness-complex.mp3"},
    {"name": "Central Library", "lat": 17.33197, "lon": 78.72589, "id": "point-7", "audio": "central-library.mp3"},
    {"name": "M B A and Law Block", "lat": 17.3324, "lon": 78.72548, "id": "point-8", "audio": "mba-law-block.mp3"},
    {"name": "A T M Facility", "lat": 17.33214, "lon": 78.72608, "id": "point-9", "audio": "atm-facility.mp3"},
    {"name": "Cricket Ground, Gymnasium, and Indoor Games", "lat": 17.3306, "lon": 78.72584, "id": "point-10", "audio": "cricket-ground.mp3"},
    {"name": "Girl's Hostel", "lat": 17.33113, "lon": 78.72537, "id": "point-gh", "audio": ""},
    {"name": "Boy's Hostel", "lat": 17.33036, "lon": 78.72522, "id": "point-bh", "audio": ""},
    {"name": "Mini - Parking Area", "lat": 17.33139, "lon": 78.72452, "id": "point-mp", "audio": ""},
    {"name": "Admission Room", "lat": 17.3316, "lon": 78.72432, "id": "point-ar", "audio": ""},
    {"name": "University Block", "lat": 17.33196, "lon": 78.72433, "id": "point-17", "audio": "university-block.mp3"},
    {"name": "Rehab Block and Hospital", "lat": 17.33235, "lon": 78.72439, "id": "point-18", "audio": "rehab-block.mp3"},
    {"name": "Sensory Park", "lat": 17.33133, "lon": 78.7232, "id": "point-19", "audio": "sensory-park.mp3"},
    {"name": "Swimming Pool", "lat": 17.33115, "lon": 78.72306, "id": "point-20", "audio": "swimming-pool.mp3"},
    {"name": "Amphitheatre", "lat": 17.33141, "lon": 78.72362, "id": "point-21", "audio": "amphitheatre-signoff-combined.mp3"},
    {"name": "Main Block", "lat": 17.33145, "lon": 78.72698, "id": "point-22", "audio": "main-block.mp3"}
]

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

new_points = []
for p in points_data:
    mx, my = calculate_map_coords(p['lat'], p['lon'])
    
    # Try to find existing point to keep translations
    existing = next((ep for ep in guide['points'] if ep['id'] == p['id']), None)
    
    point_obj = {
        "id": p['id'],
        "latitude": p['lat'],
        "longitude": p['lon'],
        "audioFileName": p['audio'] or (existing['audioFileName'] if existing else ""),
        "mapX": mx,
        "mapY": my,
        "title": existing['title'] if existing else {"en": p['name'], "te": p['name'], "hi": p['name']},
        "transcript": existing['transcript'] if existing else {"en": p['name'], "te": p['name'], "hi": p['name']}
    }
    new_points.append(point_obj)

guide['points'] = new_points
# Update order to include new points logically
guide['pointOrder'] = [p['id'] for p in new_points]

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Updated guide.json with perfect pointing.")
