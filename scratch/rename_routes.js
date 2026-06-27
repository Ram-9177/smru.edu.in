const fs = require('fs');
const path = require('path');

const replacementMap = [
  { regex: /explore-smru/g, replacement: "explore-stmarys" },
  { regex: /smru-facts/g, replacement: "stmarys-facts" },
  { regex: /qtst-smru/g, replacement: "qtst-stmarys" },
  { regex: /ExploreSmru/g, replacement: "ExploreStmarys" },
  { regex: /SmruFacts/g, replacement: "StmarysFacts" },
  { regex: /QtstSmru/g, replacement: "QtstStmarys" }
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
        
        replacementMap.forEach(({ regex, replacement }) => {
          content = content.replace(regex, replacement);
        });

        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated route string in: ${filePath}`);
        }
      }
    } else if (stat.isDirectory() && !ignoreDirs.includes(name)) {
      walkSync(filePath);
    }
  });
}

dirsToSearch.forEach(d => walkSync(d));
console.log('Done updating route strings.');
