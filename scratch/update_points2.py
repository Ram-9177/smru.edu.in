import json

with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

geojson_points = []
for feature in points_geojson['features']:
    coords = feature['geometry']['coordinates']
    name = feature['properties']['name']
    geojson_points.append({"name": name, "lon": coords[0], "lat": coords[1]})

print("Loaded coords:")
for p in geojson_points:
    print(f"{p['name']}: {p['lat']}, {p['lon']}")

