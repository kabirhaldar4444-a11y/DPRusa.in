const fs = require('fs');
const path = require('path');

const srcFile = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\b6430dac-2f24-4022-9c92-4722542eba2a\\california_hsr_1780658060853.png';
const destFile = path.resolve('public/california_hsr.png');

if (fs.existsSync(srcFile)) {
  fs.copyFileSync(srcFile, destFile);
  console.log("Copied California HSR image to public/california_hsr.png successfully!");
} else {
  console.error("Source file does not exist: " + srcFile);
}
