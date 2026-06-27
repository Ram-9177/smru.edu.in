import re

input_path = "/Users/ram/Downloads/SMRU_6_Schools-main/src/Partners - Codes/Edinbox/smru-forensic-landing-v2.html"
output_path = "/Users/ram/Downloads/SMRU_6_Schools-main/public/partners/edinbox/index.html"

with open(input_path, "r") as f:
    content = f.read()

# 1. Remove the duplicate Top Bar and Navbar
# We look for the start of the body and remove up to the Hero section
# Top bar starts with <div class="top-bar">
# Navbar starts with <nav class="navbar-main">
# Hero starts with <section class="hero">

content = re.sub(r'<!-- ══════════════════════\s+TOP UTILITY BAR.*?<!-- ══════════════════════\s+HERO', '<!-- HERO', content, flags=re.DOTALL)
# The above might be too aggressive if the comments are different. Let's try more specific tags.

# Alternatively, just remove the specific blocks if they exist
content = re.sub(r'<div class="top-bar">.*?</div>\s+</div>\s+</div>', '', content, flags=re.DOTALL) # This regex is tricky due to nested divs
content = re.sub(r'<nav class="navbar-main">.*?</nav>', '', content, flags=re.DOTALL)

# Let's use a simpler approach: remove the first top-bar and navbar-main blocks
def remove_block(html, tag, class_name):
    pattern = f'<{tag}[^>]*class=["\'][^"\']*{class_name}[^"\']*["\'][^>]*>.*?</{tag}>'
    return re.sub(pattern, '', html, flags=re.DOTALL, count=1)

content = remove_block(content, 'div', 'top-bar')
content = remove_block(content, 'nav', 'navbar-main')
content = remove_block(content, 'footer', '') # Remove the footer too

# 2. Add the height reporting script before </body>
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
// Also handle the reveal elements visibility
document.addEventListener('scroll', reportHeight);
setInterval(reportHeight, 1500);
</script>
"""

if "</body>" in content:
    content = content.replace("</body>", script_to_append + "</body>")
else:
    content += script_to_append

with open(output_path, "w") as f:
    f.write(content)

print(f"Swapped Edinbox code and removed duplicate navbar/footer. Saved to {output_path}")
