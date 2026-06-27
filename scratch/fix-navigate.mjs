import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('navigate(')) {
        // Regex to match navigate(something) safely
        // But simply replacing "navigate(" with "navigate.push(" is safe for this project since we checked the grep output.
        content = content.replace(/navigate\(/g, 'navigate.push(');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Replaced in: ${filePath}`);
    }
}

walk('./src', processFile);
walk('./app', processFile);
