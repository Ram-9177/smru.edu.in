import json

# Points data from My Maps
points_data = [
    {"name": "Entry Gate", "lat": 17.33202, "lon": 78.72782},
    {"name": "Canteen", "lat": 17.33218, "lon": 78.7269},
    {"name": "Hostel Block", "lat": 17.33109, "lon": 78.72788},
    {"name": "A One Block", "lat": 17.33082, "lon": 78.72861},
    {"name": "Rent a Bike Facility", "lat": 17.33189, "lon": 78.72677},
    {"name": "Multi-Disciplinary Play and Fitness Complex", "lat": 17.3319, "lon": 78.72644},
    {"name": "Central Library", "lat": 17.33197, "lon": 78.72589},
    {"name": "M B A and Law Block", "lat": 17.3324, "lon": 78.72548},
    {"name": "A T M Facility", "lat": 17.33214, "lon": 78.72608},
    {"name": "Cricket Ground, Gymnasium, and Indoor Games", "lat": 17.3306, "lon": 78.72584},
    {"name": "Girl's Hostel", "lat": 17.33113, "lon": 78.72537},
    {"name": "Boy's Hostel", "lat": 17.33036, "lon": 78.72522},
    {"name": "Mini - Parking Area", "lat": 17.33139, "lon": 78.72452},
    {"name": "Admission Room", "lat": 17.3316, "lon": 78.72432},
    {"name": "University Block", "lat": 17.33196, "lon": 78.72433},
    {"name": "Rehab Block and Hospital", "lat": 17.33235, "lon": 78.72439},
    {"name": "Sensory Park", "lat": 17.33133, "lon": 78.7232},
    {"name": "Swimming Pool", "lat": 17.33115, "lon": 78.72306},
    {"name": "Amphitheatre", "lat": 17.33141, "lon": 78.72362},
    {"name": "Main Block", "lat": 17.33145, "lon": 78.72698}
]

kml_template = """<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Points</name>
    <Style id="icon-1899-0288D1-normal">
      <IconStyle>
        <color>ffd18802</color>
        <scale>1</scale>
        <Icon>
          <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
        </Icon>
        <hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/>
      </IconStyle>
      <LabelStyle>
        <scale>0</scale>
      </LabelStyle>
    </Style>
    <StyleMap id="icon-1899-0288D1">
      <Pair>
        <key>normal</key>
        <styleUrl>#icon-1899-0288D1-normal</styleUrl>
      </Pair>
    </StyleMap>
{placemarks}
  </Document>
</kml>
"""

placemark_template = """    <Placemark>
      <name>{name}</name>
      <styleUrl>#icon-1899-0288D1</styleUrl>
      <Point>
        <coordinates>
          {lon},{lat},0
        </coordinates>
      </Point>
    </Placemark>"""

placemarks = []
for p in points_data:
    placemarks.append(placemark_template.format(name=p['name'], lat=p['lat'], lon=p['lon']))

with open('/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/Map/Points.kml', 'w') as f:
    f.write(kml_template.format(placemarks='\n'.join(placemarks)))

print("Updated Points.kml with perfect pointing.")
