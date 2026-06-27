const fs = require('fs');
const path = require('path');

const replacementMap = [
  { regex: /(?<![\w.\/-])(SMRU)(?![\w.\/-])/g, replacement: "Stmarys University" },
  { regex: /St\.?\s*Mary'?s\s*Rehabilitation\s*University/gi, replacement: "Stmarys University" },
  { regex: /St\.?\s*Mary'?s\s*University/gi, replacement: "Stmarys University" },
  { regex: /St\.\s*Mary'?s/gi, replacement: "Stmarys" },
  { regex: /St\s*Mary'?s/gi, replacement: "Stmarys" }
];

const dirsToSearch = ['app', 'src', 'data'];
const ignoreDirs = ['node_modules', '.next', 'out', 'output', 'public', '.git'];
let changedFilesCount = 0;

function walkSync(currentDirPath) {
  if (!fs.existsSync(currentDirPath)) return;
  fs.readdirSync(currentDirPath).forEach(function (name) {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.json') || filePath.endsWith('.md')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        replacementMap.forEach(({ regex, replacement }) => {
          content = content.replace(regex, (match) => {
            return replacement;
          });
        });

        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated: ${filePath}`);
          changedFilesCount++;
        }
      }
    } else if (stat.isDirectory() && !ignoreDirs.includes(name)) {
      walkSync(filePath);
    }
  });
}

dirsToSearch.forEach(d => walkSync(d));
console.log(`\nTotal files updated: ${changedFilesCount}`);
