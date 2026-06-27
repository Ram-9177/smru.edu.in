import os
import re
import json

base_dir = '/Users/ram/Desktop/Campus Tour - SMRU/src/Audio'

def read_script(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    sections = re.split(r'\n\s*---\s*\n', content)
    parsed = []
    for s in sections:
        s = s.strip()
        if not s: continue
        lines = s.split('\n')
        title_line = lines[0]
        body = '\n'.join(lines[1:]).strip()
        if body == "[No Script Available]":
            body = ""
        parsed.append(body)
    return parsed

eng_script = read_script(f'{base_dir}/English/English_Script')
hi_script = read_script(f'{base_dir}/Hindhi/Hindhi_Script')
te_script = read_script(f'{base_dir}/Telugu/Telugu_Script')

json_path = '/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json'
with open(json_path, 'r') as f:
    guide = json.load(f)

for i, point in enumerate(guide['points']):
    # Safety check
    if i < len(eng_script):
        point['transcript'] = {
            'en': eng_script[i],
            'hi': hi_script[i],
            'te': te_script[i]
        }

with open(json_path, 'w') as f:
    json.dump(guide, f, indent=2, ensure_ascii=False)

print("Merged scripts into guide.json!")

