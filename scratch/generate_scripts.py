import os
import re

# We will read the English script and extract sections
with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/English/English_Script', 'r') as f:
    eng = f.read()

sections = re.split(r'\n\s*---\s*\n', eng)
print(f"Extracted {len(sections)} sections from English")
for s in sections:
    lines = s.strip().split('\n')
    title = lines[0]
    print(title)

