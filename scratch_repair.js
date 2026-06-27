const fs = require('fs');
let text = fs.readFileSync('src/lib/seo/info-pages.ts', 'utf8');

// Clean up any garbage between `  },` and `  {` or `];`
// We match `  },\n` followed by any lines that don't start with `  {` or `];`, up to `  {` or `];`.
// We use `\s*\{\s*slug` to safely detect the start of the next object just in case.
text = text.replace(/  \},\n(?:(?!(?:  \{|\];)).*\n)*  \{/g, '  },\n  {');
text = text.replace(/  \},\n(?:(?!(?:  \{|\];)).*\n)*\];/g, '  },\n];');

fs.writeFileSync('src/lib/seo/info-pages.ts', text);
console.log('Repaired info-pages.ts');
