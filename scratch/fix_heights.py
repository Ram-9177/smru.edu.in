import os

script_to_append = """
<script>
function reportHeight() {
  const height = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  window.parent.postMessage({ type: 'SMRU_IFRAME_HEIGHT', height: height }, '*');
}
window.addEventListener('load', reportHeight);
window.addEventListener('resize', reportHeight);
if (document.body) {
  new MutationObserver(reportHeight).observe(document.body, { attributes: true, childList: true, subtree: true });
}
setInterval(reportHeight, 1500);
</script>
"""

paths = [
    "public/partners/ist/index.html",
    "public/partners/qtst/index.html"
]

for path in paths:
    if os.path.exists(path):
        with open(path, "r") as f:
            content = f.read()
        
        if "reportHeight" not in content:
            if "</body>" in content:
                content = content.replace("</body>", script_to_append + "</body>")
            else:
                content += script_to_append
            
            with open(path, "w") as f:
                f.write(content)
            print(f"Updated {path}")
        else:
            print(f"Skipped {path} (already has reportHeight)")
    else:
        print(f"Path not found: {path}")
