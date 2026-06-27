import json
import numpy as np

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

# Update lat/lon from the new Points.json as well so we have the absolute latest positions
with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

# Build a lookup by name to sync lat/lon
name_to_coords = {}
for feature in points_geojson['features']:
    coords = feature['geometry']['coordinates']
    name = feature['properties']['name']
    if name not in name_to_coords:
        name_to_coords[name] = {"lon": coords[0], "lat": coords[1]}

# Re-anchor based on exact visual placements in the screenshot
# We can find 3 extreme anchor points that are visible in the image and match their GeoJSON lat/lon
# Anchor 1: Ganga Hostel (Bottom left)
# Anchor 2: St. Mary's Cricket Ground (Bottom Center)
# Anchor 3: Entry Gate (Top Right)
# Let's write a script that does standard bilinear interpolation

# Anchor 1: Rehab Block (Top Left in image context)
p1_name = "Rehab Block and Hospital"
lon1, lat1 = name_to_coords[p1_name]['lon'], name_to_coords[p1_name]['lat']
x1, y1 = 20.0, 27.0 # rough pixel percentage from top-left

# Anchor 2: Entry Gate (Top Right)
p2_name = "Entry Gate"
lon2, lat2 = name_to_coords[p2_name]['lon'], name_to_coords[p2_name]['lat']
x2, y2 = 86.5, 23.5

# Anchor 3: Boy's Hostel / St. Marys Engineering College (Bottom Right)
p3_name = "Boy's Hostel" # Or "Ganga hostel"
# Actually I'll just use Boy's hostel coordinates
lon3, lat3 = name_to_coords[p3_name]['lon'], name_to_coords[p3_name]['lat']
x3, y3 = 96.0, 68.0

print(f"Anchor 1: {lon1},{lat1} -> {x1}%,{y1}%")
print(f"Anchor 2: {lon2},{lat2} -> {x2}%,{y2}%")
print(f"Anchor 3: {lon3},{lat3} -> {x3}%,{y3}%")

A = np.array([
    [lon1, lat1, 1],
    [lon2, lat2, 1],
    [lon3, lat3, 1]
])
X = np.array([x1, x2, x3])
Y = np.array([y1, y2, y3])

coeffs_x = np.linalg.solve(A, X)
coeffs_y = np.linalg.solve(A, Y)

for gp in guide['points']:
    name = gp['title']['en']
    
    # Optional: sync lat/lon with Points.json
    if name in name_to_coords:
        gp['latitude'] = name_to_coords[name]['lat']
        gp['longitude'] = name_to_coords[name]['lon']

    lon = gp['longitude']
    lat = gp['latitude']
    
    mapX = coeffs_x[0]*lon + coeffs_x[1]*lat + coeffs_x[2]
    mapY = coeffs_y[0]*lon + coeffs_y[1]*lat + coeffs_y[2]
    
    gp['mapX'] = round(max(0, min(100, mapX)), 2)
    gp['mapY'] = round(max(0, min(100, mapY)), 2)

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Updated guide.json successfully!")
