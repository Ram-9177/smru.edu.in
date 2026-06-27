import json

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

for p in guide['points']:
    if p['id'] == 'point-22':
        # English Truncation
        en_lines = p['transcript']['en'].split('\n\n')
        # Keep only the building description (first 6 segments)
        p['transcript']['en'] = '\n\n'.join(en_lines[:6])
        
        # Hindi Truncation
        hi_lines = p['transcript']['hi'].split('\n\n')
        p['transcript']['hi'] = '\n\n'.join(hi_lines[:6])
        
        # Telugu Truncation
        te_lines = p['transcript']['te'].split('\n\n')
        p['transcript']['te'] = '\n\n'.join(te_lines[:6])

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Cleaned up Main Block (point-22) transcript to remove sign-off message.")
