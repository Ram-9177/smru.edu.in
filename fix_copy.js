const fs = require('fs');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [search, replace] of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/views/Contact.tsx', [
  [/Public grievance workflow placeholder pending official verification./g, "Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
]);

replaceInFile('src/views/PhdAdmission.tsx', [
  [/Fee reference page pending official verification updates./g, "Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
]);

replaceInFile('src/lib/seo/info-pages.ts', [
  [/placeholder page/g, "information page"],
  [/placeholder and support page/g, "information and support page"],
  [/Only as a placeholder location, not as final proof of contact details./g, "Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."],
  [/treat it as pending publication rather than confirmed or unavailable/g, "official details will be published by the university. For current verified guidance, please contact the official university helpdesk"]
]);

replaceInFile('src/lib/seo/home-faqs.ts', [
  [/treat it as pending publication until the university confirms it/g, "official details will be published by the university. For current verified guidance, please contact the official university helpdesk"]
]);

replaceInFile('src/lib/seo/static-page-faqs.ts', [
  [/pending publication until officially confirmed/g, "official details will be published by the university. For current verified guidance, please contact the official university helpdesk"]
]);

