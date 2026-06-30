const fs = require('fs');
let content = fs.readFileSync('src/newsData.ts', 'utf-8');

const correctValues = {
  'equinix-sv10-data-center': '\\$122 Million (Initial Construction)',
  'reliance-jamnagar-refinery': '\\$12+ Billion (multi-phase integrated refinery & petrochemical complex)',
  'bhadla-solar-park-india': '\\$1.3 – \\$2.1+ billion',
  'industrial-systems-specialist-contracting': 'Small-scale systems: \\$5M – \\$50M\\nLarge industrial plants: \\$100M – \\$2B+',
  'gift-city-gujarat': '\\$20+ billion (multi-phase development)',
  'navi-mumbai-international-airport': '\\$2+ billion',
  'delhi-mumbai-industrial-corridor': '\\$100 billion+',
  'amritsar-kolkata-industrial-corridor': '\\$20–30 billion'
};

for (const slug of Object.keys(correctValues)) {
    // We want to find value: \`... until the next scope: [
    const regex = new RegExp(`value:\\s*\\\`[\\s\\S]*?scope:\\s*\\[`, 'm');
    const startIdx = content.indexOf(`slug: '${slug}'`);
    if (startIdx !== -1) {
        // search forward for value:
        const substr = content.substring(startIdx);
        const match = substr.match(regex);
        if (match) {
            const replacement = `value: \`${correctValues[slug]}\`,\n      scope: [`;
            content = content.substring(0, startIdx) + substr.replace(regex, replacement);
            console.log('Fixed ' + slug);
        } else {
            console.log('Could not find value to fix for ' + slug);
        }
    }
}

// Also fix the corrupted characters
content = content.replace(/Australia\?"Asia Power Link \?" Australia/g, 'Australia-Asia Power Link - Australia');
content = content.replace(/Amritsar\?"Kolkata Industrial Corridor \(AKIC\) \?" India/g, 'Amritsar-Kolkata Industrial Corridor (AKIC) - India');
content = content.replace(/Delhi\?"Mumbai Industrial Corridor \(DMIC\) \?" India/g, 'Delhi-Mumbai Industrial Corridor (DMIC) - India');
content = content.replace(/PAIMANA \?" India/g, 'PAIMANA - India');
content = content.replace(/\?"/g, '-');
content = content.replace(//g, '');

fs.writeFileSync('src/newsData.ts', content);
