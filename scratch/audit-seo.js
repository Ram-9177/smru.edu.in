const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');

let files = [];
function findHtml(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name.startsWith('_next')) continue;
        const res = path.resolve(dir, entry.name);
        if (entry.isDirectory()) {
            findHtml(res);
        } else if (res.endsWith('.html')) {
            files.push(res);
        }
    }
}
findHtml(outDir);

const results = {
    totalFiles: files.length,
    lowTextHtml: [],
    brokenExternalLinks: [],
    longTitles: [],
    onlyOneInternalLink: [],
    duplicateH1: [],
    multipleH1: [],
    lowWordCount: [],
    noH1: []
};

for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(outDir, file);

    // Get Title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (title.length > 60) results.longTitles.push(relativePath);

    // Get H1s
    const h1s = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    if (h1s.length > 1) results.multipleH1.push(relativePath);
    if (h1s.length === 0) results.noH1.push(relativePath);
    
    // Low word count approx
    const text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                     .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                     .replace(/<[^>]+>/g, ' ')
                     .replace(/\s+/g, ' ')
                     .trim();
    const wordCount = text.split(' ').length;
    if (wordCount < 300) {
        results.lowWordCount.push({ path: relativePath, count: wordCount });
    }
    
    const textToHtml = (text.length / html.length) * 100;
    if (textToHtml < 10) {
        results.lowTextHtml.push({ path: relativePath, ratio: textToHtml.toFixed(2) });
    }
    
    // Links
    const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    let internalCount = 0;
    for (const l of links) {
        if (l.startsWith('/') || l.includes('smru.edu.in')) internalCount++;
    }
    if (internalCount <= 1 && relativePath !== '404.html') {
        results.onlyOneInternalLink.push(relativePath);
    }
}

console.log(JSON.stringify(results, null, 2));
