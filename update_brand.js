const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const filePath = path.join(dir, f);
        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath, callback);
        } else if (filePath.match(/\.(ts|tsx|js|jsx|md|json)$/)) {
            callback(filePath);
        }
    }
}

const regex = /\b(Stmarys|St Marys|St\. Marys|St Mary's|St\.\s*Mary's)\b/g;

function replaceSafe(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let modified = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Skip obvious structural code lines that shouldn't contain display brand names
        if (line.trim().startsWith('import ') && line.includes(' from ')) continue;
        if (line.includes('className=')) continue;
        if (line.includes('href=')) continue;
        // Skip image imports or src attributes if they use the word
        if (line.includes('src=') || line.includes('from "') || line.includes("from '")) continue;
        // Skip component declarations unless it's a metadata object
        if (line.match(/export\s+(default\s+)?(function|class)/)) continue;

        let newLine = line.replace(regex, (match, p1, offset, string) => {
            // Check context
            const before = string.slice(0, offset);
            const after = string.slice(offset + match.length);
            
            // If part of hyphenated slug
            if (before.endsWith('-') || after.startsWith('-')) return match;
            
            // If inside a URL string (e.g., https://stmarys...)
            if (before.includes('https://') || before.includes('http://')) return match;

            return "St.Mary's";
        });

        if (line !== newLine) {
            lines[i] = newLine;
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'));
        console.log('Updated:', filePath);
    }
}

['src', 'app', 'data'].forEach(dir => {
    walk(path.join(__dirname, dir), replaceSafe);
});
