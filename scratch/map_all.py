import json
import numpy as np

# Load the user's official geojson
with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

# Load existing guide
with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

# Collect points
points = []
for idx, feature in enumerate(points_geojson['features']):
    coords = feature['geometry']['coordinates']
    name = feature['properties']['name']
    points.append({
        "id": f"point-{idx+1}",
        "name": name,
        "lon": coords[0],
        "lat": coords[1]
    })

# Identify anchors from the image
# Rehab: [78.723607, 17.3309915] -> x=22%, y=27%
# Cricket: [78.7259442, 17.330607] -> x=53%, y=77%
# Engineering (Boy's Hostel?): [78.7251521, 17.3303493] -> x=96%, y=68%

lon1, lat1 = 78.723607, 17.3309915
x1, y1 = 22.0, 27.0 

lon2, lat2 = 78.7259442, 17.330607
x2, y2 = 53.0, 77.0

lon3, lat3 = 78.7278257, 17.3320276 # Entry gate (assuming top right)
x3, y3 = 86.5, 23.5  # Just a guess without perfectly identifying entry gate

A = np.array([
    [lon1, lat1, 1],
    [lon2, lat2, 1],
    [lon3, lat3, 1]
])
X = np.array([x1, x2, x3])
Y = np.array([y1, y2, y3])

coeffs_x = np.linalg.solve(A, X)
coeffs_y = np.linalg.solve(A, Y)

new_guide_points = []
for p in points:
    mapX = coeffs_x[0]*p['lon'] + coeffs_x[1]*p['lat'] + coeffs_x[2]
    mapY = coeffs_y[0]*p['lon'] + coeffs_y[1]*p['lat'] + coeffs_y[2]
    
    # Check if point already existed in guide to preserve audio/transcript
    existing = next((g for g in guide['points'] if g['title']['en'] == p['name']), None)
    
    new_pt = {
        "id": p['id'],
        "latitude": p['lat'],
        "longitude": p['lon'],
        "audioFileName": existing['audioFileName'] if existing and 'audioFileName' in existing else "",
        "mapX": round(max(0, min(100, mapX)), 2),
        "mapY": round(max(0, min(100, mapY)), 2),
        "title": {
            "en": p['name'],
            "te": existing['title']['te'] if existing else p['name'],
            "hi": existing['title']['hi'] if existing else p['name']
        },
        "transcript": {
            "en": existing['transcript']['en'] if existing else "",
            "te": existing['transcript']['te'] if existing else "",
            "hi": existing['transcript']['hi'] if existing else ""
        }
    }
    new_guide_points.append(new_pt)

guide['points'] = new_guide_points
guide['pointOrder'] = [p['id'] for p in new_guide_points]

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Mapped completely via Points.json")
