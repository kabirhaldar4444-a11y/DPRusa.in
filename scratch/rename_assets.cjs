const fs = require('fs');

const renames = {
  'media__1780639137881.jpg': 'bharatmala.jpg',
  'media__1780639202579.png': 'national_maritime_museum.png'
};

for (const [oldName, newName] of Object.entries(renames)) {
  const oldPath = `public/${oldName}`;
  const newPath = `public/${newName}`;
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${oldName} to ${newName}`);
  } else {
    console.log(`File does not exist: ${oldPath}`);
  }
}

// Clean up files in public directory we don't need
const toDelete = [
  'media__1780636624119.png',
  'media__1780639047589.png'
];

for (const f of toDelete) {
  const p = `public/${f}`;
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`Deleted ${p}`);
  }
}
