import json

with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

name_to_coords = {}
for feature in points_geojson['features']:
    coords = feature['geometry']['coordinates']
    name = feature['properties']['name']
    name_to_coords[name] = {"lon": coords[0], "lat": coords[1]}

# M B A Block
x1, y1 = 43.3, 28.5
lon1, lat1 = name_to_coords["M B A and Law Block"]['lon'], name_to_coords["M B A and Law Block"]['lat']

# Entry Gate
x2, y2 = 79.0, 37.0
lon2, lat2 = name_to_coords["Entry Gate"]['lon'], name_to_coords["Entry Gate"]['lat']

# Rehab Block
x3, y3 = 4.5, 59.5
lon3, lat3 = name_to_coords["Rehab Block and Hospital"]['lon'], name_to_coords["Rehab Block and Hospital"]['lat']

def solve_affine(u1, v1, u2, v2, u3, v3, x1, x2, x3):
    det = u1*(v2 - v3) - v1*(u2 - u3) + (u2*v3 - u3*v2)
    a = (x1*(v2 - v3) - v1*(x2 - x3) + (x2*v3 - x3*v2)) / det
    b = (u1*(x2 - x3) - x1*(u2 - u3) + (u2*x3 - u3*x2)) / det
    c = x1 - a*u1 - b*v1
    return a, b, c

ax, bx, cx = solve_affine(lon1, lat1, lon2, lat2, lon3, lat3, x1, x2, x3)
ay, by, cy = solve_affine(lon1, lat1, lon2, lat2, lon3, lat3, y1, y2, y3)

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

for gp in guide['points']:
    name = gp['title']['en']
    if name in name_to_coords:
        lon = name_to_coords[name]['lon']
        lat = name_to_coords[name]['lat']
        
        mapX = ax*lon + bx*lat + cx
        mapY = ay*lon + by*lat + cy
        
        gp['mapX'] = round(max(0, min(100, mapX)), 2)
        gp['mapY'] = round(max(0, min(100, mapY)), 2)

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Updated guide.json with exact calibration based on Image 2 visual anchors!")
