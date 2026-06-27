import json
import numpy as np
import math

def latLonToMeters(lat, lon):
    # Standard Web Mercator projection (EPSG:3857)
    # The image is a direct screenshot of Google Maps, 
    # so Mercator is exactly the projection used.
    r = 6378137.0 # WGS84 equitorial radius
    x = r * math.radians(lon)
    y = r * math.log(math.tan(math.pi/4 + math.radians(lat)/2))
    return x, y

with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

mercator_points = []
names = []
for feature in points_geojson['features']:
    coords = feature['geometry']['coordinates']
    name = feature['properties']['name']
    x, y = latLonToMeters(coords[1], coords[0])
    mercator_points.append([x, y])
    names.append(name)

mercator_points = np.array(mercator_points)

# Find top-left (min X, max Y) and bottom-right (max X, min Y) of the Mercator points
minX = np.min(mercator_points[:, 0])
maxX = np.max(mercator_points[:, 0])
minY = np.min(mercator_points[:, 1])
maxY = np.max(mercator_points[:, 1])

# We need to map this Mercator bounding box to the Image.
# The user's image is a rectangle. Assuming the image closely wraps the points:
# The image aspect ratio is 1200x760 (width/height = 1.578)

# Let's see the Mercator aspect ratio:
merc_w = maxX - minX
merc_h = maxY - minY
print(f"Mercator W/H aspect: {merc_w / merc_h}")

