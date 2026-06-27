import json

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

# Hardcode visual pixels based exactly on the image and the red dots
visual_map = {
  "point-18": {"mapX": 9.5, "mapY": 37.0}, # Rehab University
  "point-17": {"mapX": 22.0, "mapY": 28.5}, # University block / advanced research
  "point-19": {"mapX": 25.0, "mapY": 41.5},
  "point-20": {"mapX": 5.0, "mapY": 57.0},
  "point-21": {"mapX": 7.0, "mapY": 51.0},
  "point-15": {"mapX": 43.0, "mapY": 57.0}, # Buses
  "point-14": {"mapX": 34.0, "mapY": 68.0}, # Admission / MP?
  "point-13": {"mapX": 39.0, "mapY": 86.0}, # Ganga Hostel
  "point-bh": {"mapX": 39.0, "mapY": 86.0}, 
  "point-10": {"mapX": 52.5, "mapY": 77.0}, # Cricket ground
  "point-22": {"mapX": 60.5, "mapY": 46.0}, # Main block?
  "point-gh": {"mapX": 83.5, "mapY": 25.0}, # Girls Hostel?
  "point-1":  {"mapX": 86.5, "mapY": 38.0}, # Entry gate?
  "point-3":  {"mapX": 96.0, "mapY": 68.5}, # Engineering college
}

for gp in guide['points']:
    if gp['id'] in visual_map:
        gp['mapX'] = visual_map[gp['id']]['mapX']
        gp['mapY'] = visual_map[gp['id']]['mapY']
    else:
        # Interpolate or leave rough mapping
        pass
        
with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

