const fs = require('fs');
const path = require('path');

const termsToFind = [
  { regex: /SMRU\./g, replacement: "Stmarys University." },
  { regex: /SMRU,/g, replacement: "Stmarys University," },
  { regex: /SMRU\?/g, replacement: "Stmarys University?" },
  { regex: /Short name: SMRU/g, replacement: "Short name: Stmarys University" },
  { regex: /alias is SMRU/g, replacement: "alias is Stmarys University" },
  { regex: /admission to SMRU/g, replacement: "admission to Stmarys University" },
  { regex: /Choose SMRU/g, replacement: "Choose Stmarys University" },
  { regex: /at SMRU/g, replacement: "at Stmarys University" },
  { regex: /from SMRU/g, replacement: "from Stmarys University" },
  { regex: /by SMRU/g, replacement: "by Stmarys University" },
  { regex: /exploring SMRU/g, replacement: "exploring Stmarys University" },
  { regex: /for SMRU/g, replacement: "for Stmarys University" },
];

const dirsToSearch = ['app', 'src', 'data'];
const ignoreDirs = ['node_modules', '.next', 'out', 'output', 'public', '.git'];

function walkSync(currentDirPath) {
  if (!fs.existsSync(currentDirPath)) return;
  fs.readdirSync(currentDirPath).forEach(function (name) {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.json') || filePath.endsWith('.md')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        termsToFind.forEach(({ regex, replacement }) => {
          content = content.replace(regex, replacement);
        });

        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Fixed leftovers in: ${filePath}`);
        }
      }
    } else if (stat.isDirectory() && !ignoreDirs.includes(name)) {
      walkSync(filePath);
    }
  });
}

dirsToSearch.forEach(d => walkSync(d));
console.log('Done fixing SMRU leftovers.');
