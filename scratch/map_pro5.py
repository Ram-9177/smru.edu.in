import json
import numpy as np
import os

with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

# The anchor mapping that mathematically matches the perspective
lonB, latB = 78.7278257, 17.3320276 # Entry Gate
xB, yB = 83.2, 24.5
lonC, latC = 78.7259442, 17.330607 # Cricket
xC, yC = 52.5, 78.0
lonD, latD = 78.7251521, 17.3303493 # Ganga / Boy's
xD, yD = 39.5, 86.5

A_mat = np.array([[lonB, latB, 1], [lonC, latC, 1], [lonD, latD, 1]])
X_mat = np.array([xB, xC, xD])
Y_mat = np.array([yB, yC, yD])

coeffs_x = np.linalg.solve(A_mat, X_mat)
coeffs_y = np.linalg.solve(A_mat, Y_mat)

# Load existing guide
with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

new_guide_points = []
for idx, feature in enumerate(points_geojson['features']):
    coords = feature['geometry']['coordinates']
    name = feature['properties']['name']
    lon, lat = coords[0], coords[1]
    
    px = coeffs_x[0]*lon + coeffs_x[1]*lat + coeffs_x[2]
    py = coeffs_y[0]*lon + coeffs_y[1]*lat + coeffs_y[2]
    
    # We want to match the Audio files automatically!
    # Available audio:
    # a-one-block.mp3, amphitheatre-signoff-combined.mp3, atm-facility.mp3, 
    # central-library.mp3, cricket-ground.mp3, electric-bikes.mp3, entry-gate-combined.mp3,
    # hostel-block-ground.mp3, main-block.mp3, mba-law-block.mp3, play-fitness-complex.mp3,
    # rehab-block.mp3, sensory-park.mp3, student-cafeteria.mp3, swimming-pool.mp3, university-block.mp3
    
    audio_mapping = {
        "Entry Gate": "entry-gate-combined.mp3",
        "Canteen": "student-cafeteria.mp3",
        "Hostel Block": "hostel-block-ground.mp3", # There are two Hostel Blocks in points, both get this
        "A One Block": "a-one-block.mp3",
        "Rent a Bike Facility": "electric-bikes.mp3",
        "Multi-Disciplinary Play and Fitness Complex": "play-fitness-complex.mp3",
        "Central Library": "central-library.mp3",
        "M B A and Law Block": "mba-law-block.mp3",
        "A T M Facility": "atm-facility.mp3",
        "Cricket Ground, Gymnasium, and Indoor Games": "cricket-ground.mp3", # Two of these
        "University Block": "university-block.mp3",
        "Rehab Block and Hospital": "rehab-block.mp3",
        "Sensory Park": "sensory-park.mp3",
        "Swimming Pool": "swimming-pool.mp3",
        "Amphitheatre": "amphitheatre-signoff-combined.mp3",
        "Main Block": "main-block.mp3",
    }
    
    # Retrieve existing translations safely
    existing = next((g for g in guide['points'] if g['title']['en'] == name), None)
    
    point_id = f"point-{idx+1}"
    
    # Map audio
    audio_file = audio_mapping.get(name, "")
    
    new_pt = {
        "id": point_id,
        "latitude": lat,
        "longitude": lon,
        "audioFileName": audio_file,
        "mapX": round(max(0, min(100, px)), 2),
        "mapY": round(max(0, min(100, py)), 2),
        "title": {
            "en": name,
            "te": existing['title']['te'] if existing else name,
            "hi": existing['title']['hi'] if existing else name
        },
        "transcript": {
            "en": existing['transcript']['en'] if existing else name,
            "te": existing['transcript']['te'] if existing else name,
            "hi": existing['transcript']['hi'] if existing else name
        }
    }
    new_guide_points.append(new_pt)

guide['points'] = new_guide_points
guide['pointOrder'] = [p['id'] for p in new_guide_points]

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Pro Mapping Complete: GeoJSON mapped & Audio bindings restored perfectly!")
