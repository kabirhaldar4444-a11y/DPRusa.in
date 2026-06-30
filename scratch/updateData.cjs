const fs = require('fs');
let content = fs.readFileSync('src/newsData.ts', 'utf-8');

const updates = {
  'hyperscale-data-center-prineville': { contractor: 'DPR Construction', subcontractor: 'Hoffman Construction (Precision Construction Division)' },
  'advanced-biopharmaceutical-holly-springs': { contractor: 'DPR Construction', subcontractor: 'Fluor Corporation' },
  'equinix-sv10-data-center': { contractor: 'JTM Construction Group', subcontractor: 'Schuff Steel' },
  'doha-metro-qatar': { contractor: 'ALYSJ Joint Venture', subcontractor: 'DPR Construction' },
  'reliance-jamnagar-refinery': { contractor: 'Reliance Industries Limited', subcontractor: 'DPR Construction' },
  'bhadla-solar-park-india': { contractor: 'Adani Renewable Energy Park Rajasthan Ltd / Multiple EPC Packages', subcontractor: 'DPR Construction' },
  'industrial-systems-specialist-contracting': { contractor: 'VINCI Construction', subcontractor: 'DPR Construction' },
  'gift-city-gujarat': { contractor: 'Larsen & Toubro (L&T)', subcontractor: 'DPR Construction' },
  'navi-mumbai-international-airport': { contractor: 'Larsen & Toubro (L&T)', subcontractor: 'DPR Construction' },
  'delhi-mumbai-industrial-corridor': { contractor: 'National Industrial Corridor Development Corporation (NICDC)', subcontractor: 'DPR Construction' },
  'amritsar-kolkata-industrial-corridor': { contractor: 'National Industrial Corridor Development Corporation', subcontractor: 'DPR Construction' }
};

for (const [slug, data] of Object.entries(updates)) {
  const regex = new RegExp(`(slug:\\s*['"]\\s*${slug}\\s*['"],[\\s\\S]*?)(^\\s*purpose:\\s*\`|^\\s*})`, 'm');
  const match = content.match(regex);
  if (match) {
    const replacement = `${match[1]}    contractor: '${data.contractor}',\n    subcontractor: '${data.subcontractor}',\n${match[2]}`;
    content = content.replace(regex, replacement);
    console.log('Updated ' + slug);
  } else {
    console.log('Could not find slug: ' + slug);
  }
}

fs.writeFileSync('src/newsData.ts', content);
