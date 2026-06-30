const fs = require('fs');

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG signature check
  if (buffer.readUInt32BE(0) !== 0x89504E47) {
    return null;
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

function getJpgDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.readUInt16BE(0) !== 0xFFD8) {
    return null;
  }
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    offset += 2;
    if (marker >= 0xFFC0 && marker <= 0xFFC3) {
      // SOF0 - SOF3
      offset += 3; // skip length & precision
      const height = buffer.readUInt16BE(offset);
      const width = buffer.readUInt16BE(offset + 2);
      return { width, height };
    } else {
      const length = buffer.readUInt16BE(offset);
      offset += length;
    }
  }
  return null;
}

const files = [
  'media__1780636624119.png',
  'media__1780639047589.png',
  'media__1780639137881.jpg',
  'media__1780639202579.png'
];

for (const f of files) {
  const p = `public/${f}`;
  let dim = getPngDimensions(p) || getJpgDimensions(p);
  console.log(`${f}: ${dim ? `${dim.width}x${dim.height}` : 'unknown'}`);
}
