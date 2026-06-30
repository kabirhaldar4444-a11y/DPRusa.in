const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\b6430dac-2f24-4022-9c92-4722542eba2a';
const destDir = path.resolve('public');

const files = [
  'media__1780636624119.png',
  'media__1780639047589.png',
  'media__1780639137881.jpg',
  'media__1780639202579.png'
];

for (const f of files) {
  const srcPath = path.join(srcDir, f);
  const destPath = path.join(destDir, f);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f} to public/`);
  } else {
    console.log(`Source file does not exist: ${srcPath}`);
  }
}
