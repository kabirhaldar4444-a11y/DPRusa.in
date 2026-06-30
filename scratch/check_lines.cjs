const fs = require('fs');
const path = require('path');

// Read generate_news_data.cjs
const content = fs.readFileSync(path.join(__dirname, 'generate_news_data.cjs'), 'utf8');

// Modify it to export articles instead of writing them to newsData.ts
const modifiedContent = content
  .replace(/fs\.writeFileSync[\s\S]*$/, 'module.exports = { articles };');

// Write to temp file and require it
const tempFilePath = path.join(__dirname, 'temp_check.cjs');
fs.writeFileSync(tempFilePath, modifiedContent, 'utf8');

const { articles } = require(tempFilePath);
fs.unlinkSync(tempFilePath);

let allValid = true;
const imageCounts = {};

articles.forEach((art, i) => {
  const lines = art.overview.trim().split('\n');
  const lineCount = lines.length;
  console.log(`[${i+1}] Slug: ${art.slug}`);
  console.log(`    Overview lines: ${lineCount}`);
  
  if (lineCount < 30 || lineCount > 50) {
    console.error(`    🔴 ERROR: Overview lines count ${lineCount} is out of bounds (30-50 lines)!`);
    allValid = false;
  }
  
  // Check for duplicate images
  if (imageCounts[art.image]) {
    imageCounts[art.image].push(art.slug);
  } else {
    imageCounts[art.image] = [art.slug];
  }
});

console.log('\n--- Image Duplication Check ---');
let duplicateImages = false;
for (const [img, slugs] of Object.entries(imageCounts)) {
  if (slugs.length > 1) {
    console.error(`🔴 DUPLICATE IMAGE: ${img} used by: \n  - ${slugs.join('\n  - ')}`);
    duplicateImages = true;
  }
}

if (!duplicateImages) {
  console.log('🟢 Success: No duplicate images found.');
}

if (allValid && !duplicateImages) {
  console.log('🟢 Success: All project overviews are strictly between 30 and 50 lines and images are unique.');
} else {
  console.error('🔴 Validation failed. Please correct the errors.');
}
