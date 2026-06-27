const fs = require('fs');
const path = require('path');

const terms = [
  "SMRU",
  "St. Mary’s Rehabilitation University",
  "St Marys Rehabilitation University",
  "St. Mary's Rehabilitation University",
  "St Mary's Rehabilitation University",
  "St. Mary’s University",
  "St Marys University",
  "St. Mary's University",
  "St Mary's University",
  "St Mary’s",
  "St Mary's",
  "St.Marys"
];

const dirsToSearch = ['app', 'src'];
const ignoreDirs = ['node_modules', '.next', 'out', 'output', 'public', '.git'];
let results = {};

terms.forEach(t => results[t] = 0);

function walkSync(currentDirPath) {
  if (!fs.existsSync(currentDirPath)) return;
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.json') || filePath.endsWith('.html') || filePath.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        terms.forEach(t => {
          const regex = new RegExp(t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
          const matches = content.match(regex);
          if (matches) {
            results[t] += matches.length;
          }
        });
      }
    } else if (stat.isDirectory() && !ignoreDirs.includes(name)) {
      walkSync(filePath);
    }
  });
}

dirsToSearch.forEach(d => walkSync(d));
console.log(JSON.stringify(results, null, 2));
