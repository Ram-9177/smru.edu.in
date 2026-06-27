import cv2
import numpy as np
import glob
import os
import json

# Find the screenshot
screenshots = glob.glob(os.path.expanduser('~/Desktop/Screenshot*.png'))
if not screenshots:
    print("No screenshot found")
    exit()

screenshot_path = sorted(screenshots, key=os.path.getmtime, reverse=True)[0]
print(f"Using screenshot: {screenshot_path}")

img = cv2.imread(screenshot_path)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Blue color range for Google My Maps markers
# The markers are a specific shade of blue
lower_blue = np.array([100, 150, 150])
upper_blue = np.array([130, 255, 255])

mask = cv2.inRange(hsv, lower_blue, upper_blue)

# Find contours
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

centers = []
for cnt in contours:
    area = cv2.contourArea(cnt)
    if area > 50 and area < 1000: # Filter by size to get only the markers
        M = cv2.moments(cnt)
        if M["m00"] != 0:
            cX = int(M["m10"] / M["m00"])
            cY = int(M["m01"] / M["m00"])
            # The actual point is at the bottom tip of the marker. 
            # We'll approximate tip by adding some pixel offset relative to height
            x,y,w,h = cv2.boundingRect(cnt)
            tipX = cX
            tipY = y + h
            centers.append((tipX, tipY))

# Remove duplicates (sometimes inner and outer shape)
filtered_centers = []
for pt in centers:
    is_dup = False
    for fpt in filtered_centers:
        if np.linalg.norm(np.array(pt) - np.array(fpt)) < 15:
            is_dup = True
            break
    if not is_dup:
        filtered_centers.append(pt)

print(f"Found {len(filtered_centers)} markers.")

# Convert to percentages for the 1200x760 aspect
# We need to map the bounding box of the points in the screenshot 
# to the bounding box of the lat/lons in Points.json.

with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

geo_points = []
for feature in points_geojson['features']:
    coords = feature['geometry']['coordinates']
    geo_points.append({
        "name": feature['properties']['name'],
        "lon": coords[0],
        "lat": coords[1]
    })
    
print(f"Loaded {len(geo_points)} geo points.")

