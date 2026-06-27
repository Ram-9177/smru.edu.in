import json

# User provided coordinates
user_coords = [
    ("Entry Gate", 79.3, 35.7),
    ("Canteen", 65.7, 31.2),
    ("Hostel Block", 78, 61.5),
    ("A One Block", 92.9, 62.6),
    ("Rent a Bike Facility", 64.9, 37.7),
    ("Multi-Disciplinary Play and Fitness Complex", 60.6, 35.3),
    ("Central Library", 50.6, 32.4),
    ("M B A and Law Block", 43.3, 23.2),
    ("A T M Facility", 54.9, 31.8),
    ("Cricket Ground, Gymnasium, and Indoor Games", 59, 57.4),
    ("Hostel Block", 81.9, 53.9),
    ("Cricket Ground, Gymnasium, and Indoor Games", 51.3, 71.7),
    ("Girl's Hostel", 43.7, 53.9),
    ("Boy's Hostel", 39.5, 73.3),
    ("Mini - Parking Area", 30.9, 50.8),
    ("Admission Room", 27.3, 43.2),
    ("University Block", 26.8, 34.3),
    ("Rehab Block and Hospital", 17.4, 59.2),
    ("Sensory Park", 9.9, 50),
    ("Swimming Pool", 9.5, 56.9),
    ("Amphitheatre", 17, 49.5),
    ("Main Block", 66.4, 47.5)
]

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

# Use a list-based approach to match points in order, since there are duplicates
user_idx = 0
for gp in guide['points']:
    name = gp['title']['en']
    
    # Try to match the next item in user_coords that has the same name
    # We'll search from the current user_idx onwards to handle duplicates in order
    found = False
    for i in range(user_idx, len(user_coords)):
        u_name, u_x, u_y = user_coords[i]
        if u_name == name:
            gp['mapX'] = u_x
            gp['mapY'] = u_y
            print(f"Updated {name} to {u_x}, {u_y}")
            # If it's a match, we mark it. For true duplicates like Hostel Block, 
            # we should move the index forward if we matched the 'current' one.
            # But simpler: if we matched the EXACT index we are on, increment.
            if i == user_idx:
                user_idx += 1
            found = True
            break
    
    if not found:
        # Fallback search from start if order is different
        for i in range(len(user_coords)):
            u_name, u_x, u_y = user_coords[i]
            if u_name == name:
                gp['mapX'] = u_x
                gp['mapY'] = u_y
                print(f"Updated {name} (out of order) to {u_x}, {u_y}")
                break

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Successfully applied user coordinates to guide.json")
