import json
with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

for f in points_geojson['features']:
    coords = f['geometry']['coordinates']
    lon, lat = coords[0], coords[1]
    if lon < 78.7245 and lat > 17.3315:
        print(f"Top-Left Match: {f['properties']['name']} ({lon}, {lat})")

