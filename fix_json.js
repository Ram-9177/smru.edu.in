const fs = require('fs');
const path = 'public/campus-guide/data/guide.json';
let content = fs.readFileSync(path, 'utf8');

let fixed = '';
let inString = false;
for (let i=0; i<content.length; i++) {
   if (content[i] === '"' && content[i-1] !== '\\') inString = !inString;
   if (inString && (content[i] === '\n' || content[i] === '\r')) {
       fixed += ' ';
   } else {
       fixed += content[i];
   }
}

try {
  JSON.parse(fixed);
  fs.writeFileSync(path, fixed, 'utf8');
  console.log('Fixed JSON successfully.');
} catch (e) {
  console.log('Still parse error:', e.message);
}
