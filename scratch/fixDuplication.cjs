const fs = require('fs');
let content = fs.readFileSync('src/newsData.ts', 'utf-8');

const correctValues = {
  'equinix-sv10-data-center': true,
  'reliance-jamnagar-refinery': true,
  'bhadla-solar-park-india': true,
  'industrial-systems-specialist-contracting': true,
  'gift-city-gujarat': true,
  'navi-mumbai-international-airport': true,
  'delhi-mumbai-industrial-corridor': true,
  'amritsar-kolkata-industrial-corridor': true
};

for (const slug of Object.keys(correctValues)) {
    const startIdx = content.indexOf(`slug: '${slug}'`);
    if (startIdx !== -1) {
        let endIdx = content.indexOf(`slug: '`, startIdx + 10);
        if (endIdx === -1) endIdx = content.length;
        
        let substr = content.substring(startIdx, endIdx);
        
        const regex = /scope:\s*\[[\s\S]*?scope:\s*\[/m;
        if (regex.test(substr)) {
            substr = substr.replace(regex, 'scope: [');
            content = content.substring(0, startIdx) + substr + content.substring(endIdx);
            console.log('Fixed duplication for ' + slug);
        } else {
            console.log('No duplication found for ' + slug);
        }
    }
}

fs.writeFileSync('src/newsData.ts', content);
