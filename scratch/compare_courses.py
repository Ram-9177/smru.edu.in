import pandas as pd
import re

# Read Excel file
df = pd.read_excel("/Users/ram/Downloads/SMRU_Course_Codes.xlsx", header=1)
excel_codes = set()
for _, row in df.iterrows():
    if pd.notna(row['Full Code']):
        excel_codes.add(str(row['Full Code']).strip())

# Read TS file
with open("/Users/ram/Desktop/Campus Tour - SMRU/src/data/official-courses.ts", "r") as f:
    content = f.read()

# Extract courseCode values from TS file
ts_codes = set(re.findall(r'courseCode:\s*"([^"]+)"', content))

print("Total codes in Excel:", len(excel_codes))
print("Total codes in TS:", len(ts_codes))

missing_in_ts = excel_codes - ts_codes
missing_in_excel = ts_codes - excel_codes

print("\n--- Course Codes in Excel but missing in App ---")
if missing_in_ts:
    for code in sorted(list(missing_in_ts)):
        # Find the row in df for context
        row = df[df['Full Code'] == code].iloc[0]
        print(f"{code} : {row['Course Name']} ({row.get('School Name', '')})")
else:
    print("None!")

print("\n--- Course Codes in App but missing in Excel ---")
if missing_in_excel:
    for code in sorted(list(missing_in_excel)):
        print(code)
else:
    print("None!")
