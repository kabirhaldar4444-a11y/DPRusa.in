const fs = require('fs');
const content = fs.readFileSync('src/newsData.ts', 'utf-8');

const slug = 'california-high-speed-rail';
const slugIndex = content.indexOf(`slug: '${slug}'`);
if (slugIndex !== -1) {
  console.log(content.slice(slugIndex, slugIndex + 500));
} else {
  console.log("Not found");
}
