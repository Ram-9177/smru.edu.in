const fs = require('fs');
const path = require('path');

const termsToFind = [
  { regex: /official SMRU disclosure/g, replacement: "official Stmarys University disclosure" },
  { regex: /official SMRU contact/g, replacement: "official Stmarys University contact" },
  { regex: /official SMRU route/g, replacement: "official Stmarys University route" },
];

const dirsToSearch = ['components'];
const ignoreDirs = ['node_modules', '.next', 'out', 'output', '.git'];

function walkSync(currentDirPath) {
  if (!fs.existsSync(currentDirPath)) return;
  fs.readdirSync(currentDirPath).forEach(function (name) {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
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
console.log('Done fixing SMRU components leftovers.');
