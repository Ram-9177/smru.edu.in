const fs = require('fs');
const path = require('path');

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
        
        content = content.replace(/SMRU-Logo\.webp/g, "Stmarys-Logo.webp");

        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated logo ref in: ${filePath}`);
        }
      }
    } else if (stat.isDirectory() && !ignoreDirs.includes(name)) {
      walkSync(filePath);
    }
  });
}

dirsToSearch.forEach(d => walkSync(d));
console.log('Done fixing SMRU-Logo.webp references.');
