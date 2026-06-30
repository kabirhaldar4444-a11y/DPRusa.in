const fs = require('fs');

let content = fs.readFileSync('src/newsData.ts', 'utf-8');

const updates = {
  'paimana-india': '/paimana_highway.png',
  'railway-and-metro-projects': '/global_metro.png',
  'doha-metro-qatar': '/doha_metro.png'
};

for (const [slug, newImage] of Object.entries(updates)) {
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
}

fs.writeFileSync('src/newsData.ts', content);
console.log("Successfully saved all updates to src/newsData.ts!");
