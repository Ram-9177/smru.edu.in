const fs = require('fs');
const path = require('path');

const termsToFind = [
  { regex: /(?<![\w.\/-])(SMRU)(?![\w.\/-])/g, name: "SMRU (standalone)" },
  { regex: /St\.?\s*Mary'?s\s*Rehabilitation\s*University/gi, name: "St Marys Rehab Uni" },
  { regex: /St\.?\s*Mary'?s\s*University/gi, name: "St Marys Uni" },
  { regex: /(?<![\w.\/-])(smru)(?![\w.\/-])/g, name: "smru (standalone lowercase)" }
];

const dirsToSearch = ['app', 'src', 'data'];
const ignoreDirs = ['node_modules', '.next', 'out', 'output', 'public', '.git', '.next-dev'];
let findings = [];

function walkSync(currentDirPath) {
  if (!fs.existsSync(currentDirPath)) return;
  fs.readdirSync(currentDirPath).forEach(function (name) {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.json') || filePath.endsWith('.md')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        let fileHasFindings = false;
        termsToFind.forEach(({ regex, name }) => {
          let match;
          while ((match = regex.exec(content)) !== null) {
            // Context around the match
            const start = Math.max(0, match.index - 30);
            const end = Math.min(content.length, match.index + match[0].length + 30);
            const context = content.substring(start, end).replace(/\n/g, '\\n');
            
            findings.push(`${filePath} -> [${name}] matched "${match[0]}" in context: "...${context}..."`);
          }
        });
      }
    } else if (stat.isDirectory() && !ignoreDirs.includes(name)) {
      walkSync(filePath);
    }
  });
}

dirsToSearch.forEach(d => walkSync(d));
if (findings.length > 0) {
  console.log(`Found ${findings.length} missing references:`);
  findings.slice(0, 50).forEach(f => console.log(f)); // show up to 50
  if (findings.length > 50) console.log('...and more.');
} else {
  console.log('No missing references found!');
}
