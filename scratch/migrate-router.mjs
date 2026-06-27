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
    let original = content;
    let modified = false;

    // Check if file uses @/lib/router or ../lib/router
    if (!content.includes('lib/router')) return;

    // 1. Handle imports
    // Regex to capture imported names: import { Link, useNavigate, useParams, useLocation } from "@/lib/router";
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+["'](?:@\/\.\.\/|@\/|\.\.\/)lib\/router["'];?/g;
    
    let importsToReplace = [];
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        importsToReplace.push(match);
    }

    if (importsToReplace.length > 0) {
        for (const match of importsToReplace) {
            const items = match[1].split(',').map(s => s.trim());
            const nextImports = [];
            const nextNavImports = [];
            
            if (items.includes('Link')) nextImports.push('Link');
            if (items.includes('useNavigate')) nextNavImports.push('useRouter');
            if (items.includes('useParams')) nextNavImports.push('useParams');
            if (items.includes('useLocation')) nextNavImports.push('usePathname'); // We'll map useLocation to usePathname loosely

            let replacement = '';
            if (nextImports.length > 0) {
                replacement += `import Link from "next/link";\n`;
            }
            if (nextNavImports.length > 0) {
                replacement += `import { ${nextNavImports.join(', ')} } from "next/navigation";\n`;
            }

            content = content.replace(match[0], replacement.trim());
        }
        modified = true;
    }

    // 2. Replace hooks usage
    if (content.includes('useNavigate()')) {
        content = content.replace(/const (\w+) = useNavigate\(\)/g, 'const $1 = useRouter()');
        modified = true;
    }
    
    if (content.includes('useLocation()')) {
        content = content.replace(/const (\w+) = useLocation\(\)/g, 'const pathname = usePathname();\n  const $1 = { pathname }');
        modified = true;
    }

    // 3. Replace <Link to="..."> with <Link href="...">
    // Need a robust regex for this
    const linkRegex = /<Link([^>]+)to=/g;
    if (linkRegex.test(content)) {
        content = content.replace(linkRegex, '<Link$1href=');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Migrated: ${filePath}`);
    }
}

walk('./src', processFile);
walk('./app', processFile);
console.log('Migration complete.');
