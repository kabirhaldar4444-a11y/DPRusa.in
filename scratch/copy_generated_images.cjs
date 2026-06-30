const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\b6430dac-2f24-4022-9c92-4722542eba2a';
const destDir = path.resolve('public');

const copies = {
  'paimana_highway_1780658874090.png': 'paimana_highway.png',
  'global_metro_1780658904548.png': 'global_metro.png',
  'doha_metro_1780658936341.png': 'doha_metro.png'
};

for (const [srcName, destName] of Object.entries(copies)) {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcName} to public/${destName} successfully!`);
  } else {
    console.error(`Source file does not exist: ${srcPath}`);
  }
}
