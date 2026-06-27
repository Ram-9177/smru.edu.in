import json
import numpy as np

# Load the original points (not the shifted ones!)
with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

name_to_coords = {}
for feature in points_geojson['features']:
    coords = feature['geometry']['coordinates']
    name = feature['properties']['name']
    name_to_coords[name] = {"lon": coords[0], "lat": coords[1]}

# Known pairs: (Lon, Lat) -> (X%, Y%)
known_points = [
    ("M B A and Law Block", 43.3, 28.5),
    ("Entry Gate", 79.0, 37.0),
    ("Boy's Hostel", 50.8, 74.5),
    ("Rehab Block and Hospital", 4.5, 59.5)
]

A_matrix = []
b_x = []
b_y = []

for name, x, y in known_points:
    lon = name_to_coords[name]['lon']
    lat = name_to_coords[name]['lat']
    A_matrix.append([lon, lat, 1])
    b_x.append(x)
    b_y.append(y)

A = np.array(A_matrix)
b_x = np.array(b_x)
b_y = np.array(b_y)

# Least squares solution
coeffs_x, _, _, _ = np.linalg.lstsq(A, b_x, rcond=None)
coeffs_y, _, _, _ = np.linalg.lstsq(A, b_y, rcond=None)

# Load guide.json to update it
with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

for gp in guide['points']:
    name = gp['title']['en']
    if name in name_to_coords:
        lon = name_to_coords[name]['lon']
        lat = name_to_coords[name]['lat']
        
        mapX = coeffs_x[0]*lon + coeffs_x[1]*lat + coeffs_x[2]
        mapY = coeffs_y[0]*lon + coeffs_y[1]*lat + coeffs_y[2]
        
        gp['mapX'] = round(max(0, min(100, mapX)), 2)
        gp['mapY'] = round(max(0, min(100, mapY)), 2)

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Updated guide.json with least squares calibration!")
# Print some test points to verify
print(f"M B A and Law Block -> X={guide['points'][8]['mapX']}, Y={guide['points'][8]['mapY']}")

