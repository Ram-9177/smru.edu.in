import json
import numpy as np

# Load GeoJSON
with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.json', 'r') as f:
    points_geojson = json.load(f)

# Hardcoded anchors (lon, lat) -> (x, y percentages)
# A: Rehab Block (leftmost top)
lonA = 78.723607
latA = 17.3309915
xA = 25.5 # Wait, there are two pins near rehab. Let's use Entry Gate, Cricket Ground, Ganga Hostel.

# B: Entry Gate (top right road)
lonB = 78.7278257
latB = 17.3320276
xB = 83.2
yB = 24.5

# C: Cricket Ground (bottom mid)
lonC = 78.7259442
latC = 17.330607
xC = 52.5
yC = 78.0

# D: Boy's Hostel / Ganga Hostel (bottom left)
lonD = 78.7251521
latD = 17.3303493
xD = 39.5
yD = 86.5

# E: Football Ground? 
# Wait, let's just use an affine transformation (requires 3 points minimum). 
# Using B, C, D:
A_mat = np.array([
    [lonB, latB, 1],
    [lonC, latC, 1],
    [lonD, latD, 1]
])
X_mat = np.array([xB, xC, xD])
Y_mat = np.array([yB, yC, yD])

coeffs_x = np.linalg.solve(A_mat, X_mat)
coeffs_y = np.linalg.solve(A_mat, Y_mat)

# Let's check how Rehab Block maps using these coeffs
lon_rehab = 78.723607
lat_rehab = 17.3309915
pred_x = coeffs_x[0]*lon_rehab + coeffs_x[1]*lat_rehab + coeffs_x[2]
pred_y = coeffs_y[0]*lon_rehab + coeffs_y[1]*lat_rehab + coeffs_y[2]
print(f"Predicted Rehab: x={pred_x}, y={pred_y}")
