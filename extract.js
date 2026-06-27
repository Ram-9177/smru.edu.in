require('ts-node').register({ transpileOnly: true });
const { schools } = require('./src/data/schools.ts');
const { OFFICIAL_COURSES } = require('./src/data/official-courses.ts');

const fs = require('fs');
fs.writeFileSync('/tmp/extracted_schools.json', JSON.stringify(schools, null, 2));
fs.writeFileSync('/tmp/extracted_courses.json', JSON.stringify(OFFICIAL_COURSES, null, 2));
console.log("Extraction successful!");
