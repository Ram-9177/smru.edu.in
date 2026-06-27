import json

with open('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/data/guide.json', 'r') as f:
    guide = json.load(f)

html = """
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; padding: 0; position: relative; }
        #map { width: 100%; height: auto; display: block; }
        .marker { position: absolute; width: 12px; height: 12px; background: red; border: 2px solid white; border-radius: 50%; transform: translate(-50%, -50%); cursor: pointer; }
        .label { position: absolute; color: white; background: rgba(0,0,0,0.8); font-size: 14px; font-weight: bold; padding: 2px 5px; transform: translate(10px, -10px); white-space: nowrap; pointer-events: none; }
        #click-log { position: fixed; top: 10px; left: 10px; background: white; padding: 10px; border: 2px solid black; z-index: 1000; font-family: monospace; font-size: 16px; }
    </style>
</head>
<body>
    <div id="click-log">Click on the center of the building for a marker to get its real coordinates.</div>
    <div style="position: relative; width: 100vw;">
        <img id="map" src="../public/campus-guide/images/campus-map-base.jpg" />
"""

for i, p in enumerate(guide['points']):
    x, y = p['mapX'], p['mapY']
    name = p['title']['en']
    html += f'        <div class="marker" style="left: {x}%; top: {y}%;"></div>\n'
    html += f'        <div class="label" style="left: {x}%; top: {y}%;">{i+1}: {name}</div>\n'

html += """
    </div>
    <script>
        const map = document.getElementById('map');
        const log = document.getElementById('click-log');
        map.onclick = (e) => {
            const rect = map.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 100;
            const y = (e.clientY - rect.top) / rect.height * 100;
            const msg = `Clicked: ${x.toFixed(2)}%, ${y.toFixed(2)}%`;
            console.log(msg);
            log.innerHTML += '<br/>' + msg;
            
            const m = document.createElement('div');
            m.className = 'marker';
            m.style.left = x + '%';
            m.style.top = y + '%';
            m.style.background = 'blue';
            map.parentElement.appendChild(m);
        };
    </script>
</body>
</html>
"""

with open('/Users/ram/Desktop/Campus Tour - SMRU/scratch/view_map.html', 'w') as f:
    f.write(html)

print("Generated scratch/view_map.html")
