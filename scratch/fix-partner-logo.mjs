import fs from 'fs';
const file = './src/views/Home.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('src={resolveAssetSrc(partner.logo)}', 'src={resolveAssetSrc((partner as any).logo)}');
fs.writeFileSync(file, content, 'utf8');
