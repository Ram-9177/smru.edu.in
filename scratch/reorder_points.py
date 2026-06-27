import json

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

# Map names to IDs
name_to_id = {}
for p in guide['points']:
    name_to_id[p['title']['en']] = p['id']

# User's specified order
new_sequence_names = [
    "Entry Gate",
    "A One Block",
    "Hostel Block",
    "Main Block",
    "Rent a Bike Facility",
    "Canteen",
    "Multi-Disciplinary Play and Fitness Complex",
    "Central Library",
    "A T M Facility",
    "Cricket Ground, Gymnasium, and Indoor Games",
    "University Block",
    "M B A and Law Block",
    "Rehab Block and Hospital",
    "Sensory Park",
    "Swimming Pool",
    "Amphitheatre"
]

new_point_order = []
for name in new_sequence_names:
    if name in name_to_id:
        new_point_order.append(name_to_id[name])
    else:
        print(f"Warning: {name} not found in current points.")

# Handle Hostel Block and Cricket Ground which might have multiple IDs
# If the user only listed them once, we use the first occurrence.
# However, we should check if they want the others. The user list only has 18 entries total.

# Update pointOrder
guide['pointOrder'] = new_point_order

# Filter points to only include those in the new order (optional, but keeps it clean)
# Actually, it's better to keep all points in the list but only follow the order.
# The CampusGuide.tsx uses orderedPoints = guide.pointOrder.map(...)

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Updated pointOrder to:")
for i, pid in enumerate(new_point_order, 1):
    pname = next(p['title']['en'] for p in guide['points'] if p['id'] == pid)
    print(f"{i}. {pname} ({pid})")
