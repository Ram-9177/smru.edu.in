import json
import numpy as np

with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

lonB, latB = 78.7278257, 17.3320276 # Entry Gate
xB, yB = 83.2, 24.5

lonC, latC = 78.7259442, 17.330607 # Cricket
xC, yC = 52.5, 78.0

lonD, latD = 78.7251521, 17.3303493 # Ganga / Boy's
xD, yD = 39.5, 86.5

A_mat = np.array([
    [lonB, latB, 1],
    [lonC, latC, 1],
    [lonD, latD, 1]
])
X_mat = np.array([xB, xC, xD])
Y_mat = np.array([yB, yC, yD])

coeffs_x = np.linalg.solve(A_mat, X_mat)
coeffs_y = np.linalg.solve(A_mat, Y_mat)

for feature in points_geojson['features']:
    coords = feature['geometry']['coordinates']
    name = feature['properties']['name']
    lon, lat = coords[0], coords[1]
    
    px = coeffs_x[0]*lon + coeffs_x[1]*lat + coeffs_x[2]
    py = coeffs_y[0]*lon + coeffs_y[1]*lat + coeffs_y[2]
    print(f"{name:<45} | X: {px:.1f}%, Y: {py:.1f}%")
