import json

json_path = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json'
with open(json_path, 'r') as f:
    guide = json.load(f)

# The user screenshot shows dots floating above and to the left of the buildings.
# We will apply a global shift.
dx = 8.0
dy = 10.0

for point in guide['points']:
    point['mapX'] = round(min(100, max(0, point['mapX'] + dx)), 2)
    point['mapY'] = round(min(100, max(0, point['mapY'] + dy)), 2)

with open(json_path, 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print(f"Shifted all points by dx={dx}, dy={dy} in guide.json")
