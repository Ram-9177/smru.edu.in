import json
import subprocess

# Get the guide.json from git HEAD
git_show = subprocess.run(['git', 'show', 'HEAD:public/campus-guide/data/guide.json'], capture_output=True, text=True)
original_guide = json.loads(git_show.stdout)

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    current_guide = json.load(f)

# Create a lookup for original points
orig_points = {p['title']['en']: p for p in original_guide['points']}

for p in current_guide['points']:
    name = p['title']['en']
    if name in orig_points:
        p['mapX'] = orig_points[name]['mapX']
        p['mapY'] = orig_points[name]['mapY']

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'w') as f:
    json.dump(current_guide, f, indent=2, ensure_ascii=False)

print("Restored original mapX and mapY from git!")
