const fs = require('fs');

let content = fs.readFileSync('src/newsData.ts', 'utf-8');

const slug = 'california-high-speed-rail';
const newImage = '/california_hsr.png';

const slugRegex = new RegExp(`slug:\\s*['"\`]${slug}['"\`]`, 'i');
const slugMatch = content.match(slugRegex);
if (slugMatch) {
  const slugIndex = slugMatch.index;
  const imageRegex = /image:\s*['"`]([^'"`]+)['"`]/;
  const contentFromSlug = content.slice(slugIndex);
  const imageMatch = contentFromSlug.match(imageRegex);
  if (imageMatch) {
    const fullMatchText = imageMatch[0];
    const matchIndex = slugIndex + imageMatch.index;
    content = content.slice(0, matchIndex) + `image: '${newImage}'` + content.slice(matchIndex + fullMatchText.length);
    console.log(`Successfully updated image for ${slug} to ${newImage}`);
  } else {
    console.error(`Could not find image property for ${slug}`);
  }
} else {
  console.error(`Could not find slug match for ${slug}`);
}

fs.writeFileSync('src/newsData.ts', content);
console.log("Successfully saved updates to src/newsData.ts!");
