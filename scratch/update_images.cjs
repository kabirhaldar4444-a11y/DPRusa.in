const fs = require('fs');

let content = fs.readFileSync('src/newsData.ts', 'utf-8');

const updates = {
  'bharatmala-pariyojna-india': '/bharatmala.jpg',
  'national-maritime-heritage-complex': '/national_maritime_museum.png'
};

for (const [slug, newImage] of Object.entries(updates)) {
  // We want to find the image property inside the object for the given slug.
  // The object starts with slug: 'slug-name' and is followed by key-value pairs.
  const slugRegex = new RegExp(`slug:\\s*['"\`]${slug}['"\`]`, 'i');
  const slugMatch = content.match(slugRegex);
  if (!slugMatch) {
    console.error(`Could not find slug match for ${slug}`);
    continue;
  }
  
  const slugIndex = slugMatch.index;
  
  // Find the next image property after the slugIndex
  // Example: image: 'https://...' or image: "/..."
  const imageRegex = /image:\s*['"`]([^'"`]+)['"`]/;
  const contentFromSlug = content.slice(slugIndex);
  const imageMatch = contentFromSlug.match(imageRegex);
  if (!imageMatch) {
    console.error(`Could not find image property for slug ${slug}`);
    continue;
  }
  
  // Replace the image property within this block
  const fullMatchText = imageMatch[0];
  const oldImagePath = imageMatch[1];
  const newMatchText = `image: '${newImage}'`;
  
  // Find the global index of the match text
  const matchIndex = slugIndex + imageMatch.index;
  
  content = content.slice(0, matchIndex) + newMatchText + content.slice(matchIndex + fullMatchText.length);
  console.log(`Successfully updated image for ${slug} to ${newImage} (was ${oldImagePath})`);
}

fs.writeFileSync('src/newsData.ts', content);
console.log("Image paths updated successfully!");
