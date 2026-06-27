import json

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

for point in guide['points']:
    print(f"{point['id']} - mapX: {point['mapX']}, mapY: {point['mapY']}")
