import os
import re
import json

base_dir = '/Users/ram/Desktop/Campus Tour - SMRU/src/Audio'

def read_script(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    sections = re.split(r'\n\s*---\s*\n', content)
    parsed = {}
    for i, s in enumerate(sections):
        s = s.strip()
        if not s: continue
        lines = s.split('\n')
        title_line = lines[0]
        body = '\n'.join(lines[1:]).strip()
        parsed[i+1] = {
            'title': title_line,
            'body': body
        }
    return parsed

eng_script = read_script(f'{base_dir}/English/English_Script')
hi_script = read_script(f'{base_dir}/Hindhi/Hindhi_Script')
te_script = read_script(f'{base_dir}/Telugu/Telugu_Script')

# Mapping from original 1-18 indexes to new 22-point indexes
# old order: 
# 1 Welcome
# 2 Main Entrance
# 3 A One Block
# 4 Hostel Block
# 5 Main Block
# 6 Electric Bikes
# 7 Student Cafeteria
# 8 Multi...
# 9 Central Library
# 10 ATM
# 11 Cricket Ground
# 12 University Block
# 13 MBA Law
# 14 Rehab
# 15 Sensory
# 16 Swimming
# 17 Amphitheatre
# 18 Closing

# New 22 points titles in English:
titles = [
    "Entry Gate",
    "Canteen",
    "Hostel Block",
    "A One Block",
    "Rent a Bike Facility",
    "Multi-Disciplinary Play and Fitness Complex",
    "Central Library",
    "M B A and Law Block",
    "A T M Facility",
    "Cricket Ground, Gymnasium, and Indoor Games",
    "Hostel Block",
    "Cricket Ground, Gymnasium, and Indoor Games",
    "Girl's Hostel",
    "Boy's Hostel",
    "Mini - Parking Area",
    "Admission Room",
    "University Block",
    "Rehab Block and Hospital",
    "Sensory Park",
    "Swimming Pool",
    "Amphitheatre",
    "Main Block"
]

def map_language(lang_data, lang_code):
    # Get titles from lang_data to reuse if possible
    def get_title(old_idx, new_eng_title):
        if old_idx is None: return new_eng_title
        # strip "1. " from old title
        old_title = re.sub(r'^\d+\.\s*', '', lang_data[old_idx]['title'])
        return old_title

    # New 22 items
    new_data = []
    
    # 1. Entry Gate (Welcome 1 + Main Entrance 2)
    t = get_title(2, "Entry Gate") # Use 'Main Entrance' translated title for 'Entry Gate'
    if lang_code == 'en': t = "Entry Gate"
    elif lang_code == 'hi': t = "एंट्री गेट (मेन एंट्रेंस)"
    elif lang_code == 'te': t = "ఎంట్రీ గేట్ (మెయిన్ ఎంట్రన్స్)"
    b = lang_data[1]['body'] + "\n\n" + lang_data[2]['body']
    new_data.append((t, b))
    
    # 2. Canteen (Student Cafeteria 7)
    t = get_title(7, "Canteen")
    b = lang_data[7]['body']
    new_data.append((t, b))
    
    # 3. Hostel Block (Hostel Block 4)
    t = get_title(4, "Hostel Block")
    b = lang_data[4]['body']
    new_data.append((t, b))
    
    # 4. A One Block (A One Block 3)
    t = get_title(3, "A One Block")
    b = lang_data[3]['body']
    new_data.append((t, b))
    
    # 5. Rent a Bike Facility (Electric Bikes 6)
    t = get_title(6, "Rent a Bike Facility")
    b = lang_data[6]['body']
    new_data.append((t, b))
    
    # 6. Multi-Disciplinary (8)
    t = get_title(8, titles[5])
    b = lang_data[8]['body']
    new_data.append((t, b))
    
    # 7. Central Library (9)
    t = get_title(9, titles[6])
    b = lang_data[9]['body']
    new_data.append((t, b))
    
    # 8. MBA and Law (13)
    t = get_title(13, titles[7])
    b = lang_data[13]['body']
    new_data.append((t, b))
    
    # 9. ATM (10)
    t = get_title(10, titles[8])
    b = lang_data[10]['body']
    new_data.append((t, b))
    
    # 10. Cricket Ground (11)
    t = get_title(11, titles[9])
    b = lang_data[11]['body']
    new_data.append((t, b))
    
    # 11. Hostel Block (duplicate of 3)
    t = get_title(4, titles[10])
    b = lang_data[4]['body']
    new_data.append((t, b))
    
    # 12. Cricket Ground (duplicate of 10)
    t = get_title(11, titles[11])
    b = lang_data[11]['body']
    new_data.append((t, b))
    
    # 13, 14, 15, 16 -> Empty
    for i in range(12, 16):
        new_data.append((titles[i], ""))
        
    # 17. University Block (12)
    t = get_title(12, titles[16])
    b = lang_data[12]['body']
    new_data.append((t, b))
    
    # 18. Rehab Block (14)
    t = get_title(14, titles[17])
    b = lang_data[14]['body']
    new_data.append((t, b))
    
    # 19. Sensory Park (15)
    t = get_title(15, titles[18])
    b = lang_data[15]['body']
    new_data.append((t, b))
    
    # 20. Swimming Pool (16)
    t = get_title(16, titles[19])
    b = lang_data[16]['body']
    new_data.append((t, b))
    
    # 21. Amphitheatre (17)
    t = get_title(17, titles[20])
    b = lang_data[17]['body']
    new_data.append((t, b))
    
    # 22. Main Block (5) + Closing Message (18)
    t = get_title(5, titles[21])
    b = lang_data[5]['body'] + "\n\n" + lang_data[18]['body']
    new_data.append((t, b))
    
    # Format the result
    res = []
    for i, (title, body) in enumerate(new_data):
        res.append(f"{i+1}. {title}\n\n{body}" if body else f"{i+1}. {title}\n\n[No Script Available]")
        
    return "\n\n---\n\n".join(res)

new_eng = map_language(eng_script, 'en')
new_hi = map_language(hi_script, 'hi')
new_te = map_language(te_script, 'te')

with open(f'{base_dir}/English/English_Script', 'w') as f:
    f.write(new_eng + '\n')
    
with open(f'{base_dir}/Hindhi/Hindhi_Script', 'w') as f:
    f.write(new_hi + '\n')
    
with open(f'{base_dir}/Telugu/Telugu_Script', 'w') as f:
    f.write(new_te + '\n')

print("Scripts updated!")

