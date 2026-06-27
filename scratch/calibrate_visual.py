import json

# ============================================================
# MANUAL VISUAL CALIBRATION
# Image size: 1200x760 px
# Carefully identified pixel positions (x,y) on each building
# by visually inspecting the satellite image.
# mapX = pixel_x / 1200 * 100
# mapY = pixel_y / 760 * 100
# ============================================================

# Key landmark pixel positions (carefully identified visually):
# The campus has:
# - TOP-RIGHT cluster: Entry Gate road area (far right), A-One Block, Canteen, ATM
# - CENTRE-RIGHT cluster: Main Block (large building right of centre), Hostel Block (top right building)
# - CENTRE cluster: Central Library, Play/Fitness, Rent-a-Bike, MBA Law
# - LOWER-CENTRE: Cricket Ground, A-One Block lower
# - LEFT cluster: Rehab+Hospital, University Block, Admission Room, Parking
# - FAR-LEFT: Sensory Park, Swimming Pool, Amphitheatre, Girl's/Boy's Hostel

# Pixel coordinates carefully read from image (1200x760):
pixel_positions = {
    # Entry Gate - the road entry at far right where the main road meets campus
    "Entry Gate":                               (970, 290),

    # Canteen - building top-centre-right (with colorful playground markings next to it)
    "Canteen":                                  (800, 270),

    # Main Block - large building right of centre
    "Main Block":                               (780, 390),

    # A One Block - top-right cluster, large building at top
    "A One Block":                              (905, 370),

    # Hostel Block (point 3 and 11 are duplicates - right side hostel buildings)
    "Hostel Block":                             (885, 395),

    # ATM Facility - near the main block / canteen area
    "A T M Facility":                           (730, 340),

    # Rent a Bike - near road junction centre
    "Rent a Bike Facility":                     (680, 355),

    # Multi-Disciplinary Play and Fitness Complex - the open court/playground area
    "Multi-Disciplinary Play and Fitness Complex": (640, 370),

    # Central Library - to the left of play area
    "Central Library":                          (580, 350),

    # M B A and Law Block - upper left building cluster
    "M B A and Law Block":                      (470, 215),

    # Cricket Ground - large open field in lower centre
    "Cricket Ground, Gymnasium, and Indoor Games": (560, 470),

    # Girl's Hostel - lower-left hostel buildings
    "Girl's Hostel":                            (310, 480),

    # Boy's Hostel - further lower-left hostel
    "Boy's Hostel":                             (280, 545),

    # Mini Parking Area - small parking left side
    "Mini - Parking Area":                      (220, 430),

    # Admission Room - left building cluster
    "Admission Room":                           (215, 400),

    # University Block - top-left large building block
    "University Block":                         (225, 350),

    # Rehab Block and Hospital - far left, lower building
    "Rehab Block and Hospital":                 (145, 430),

    # Sensory Park - far left greenery area
    "Sensory Park":                             (85, 415),

    # Swimming Pool - circular pool at far left
    "Swimming Pool":                            (82, 370),

    # Amphitheatre - open amphitheatre area far left
    "Amphitheatre":                             (100, 400),
}

def px_to_pct(px, py, w=1200, h=760):
    return round(px/w*100, 1), round(py/h*100, 1)

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

name_to_pct = {name: px_to_pct(*px) for name, px in pixel_positions.items()}

print("Computed positions:")
for name, (x, y) in name_to_pct.items():
    print(f"  {name:<50} X:{x}%  Y:{y}%")

for gp in guide['points']:
    name = gp['title']['en']
    if name in name_to_pct:
        gp['mapX'] = name_to_pct[name][0]
        gp['mapY'] = name_to_pct[name][1]
    else:
        print(f"WARNING: No mapping for '{name}'")

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("\nDone! guide.json updated with visually-calibrated positions.")
