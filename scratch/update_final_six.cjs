const fs = require('fs');

let content = fs.readFileSync('src/newsData.ts', 'utf-8');

const updates = {
  'dpr-data-center-campus-2026': {
    contractor: 'DPR Construction',
    subcontractor: 'Equinix'
  },
  'healthcare-patient-tower-topping-out': {
    contractor: 'DPR Construction',
    subcontractor: 'LPR Construction'
  },
  'technical-builder-life-sciences': {
    contractor: 'DPR Construction',
    subcontractor: 'CRB'
  },
  'prefabrication-semiconductor-facility': {
    contractor: 'DPR Construction',
    subcontractor: 'Exyte'
  },
  'railway-and-metro-projects': {
    contractor: 'DPR Construction',
    subcontractor: 'Alstom'
  },
  'new-power-transformer-mfg': {
    contractor: 'PVJ Power Solutions Pvt. Ltd.',
    subcontractor: 'DPR Construction'
  }
};

for (const [slug, data] of Object.entries(updates)) {
  const slugRegex = new RegExp(`slug:\\s*['"\`]${slug}['"\`]`, 'i');
  const slugMatch = content.match(slugRegex);
  if (!slugMatch) {
    console.error(`Could not find slug match for ${slug}`);
    continue;
  }
  
  const slugIndex = slugMatch.index;
  
  const closeBraceIndex = content.indexOf('\n  },', slugIndex);
  const closeBraceIndexAlt = content.indexOf('\n  }', slugIndex);
  
  let targetIndex = -1;
  let hasComma = true;
  if (closeBraceIndex !== -1 && (closeBraceIndexAlt === -1 || closeBraceIndex < closeBraceIndexAlt)) {
    targetIndex = closeBraceIndex;
  } else if (closeBraceIndexAlt !== -1) {
    targetIndex = closeBraceIndexAlt;
    hasComma = false;
  }
  
  if (targetIndex === -1) {
    console.error(`Could not find closing brace for slug ${slug}`);
    continue;
  }
  
  const contractorVal = data.contractor.replace(/'/g, "\\'");
  const subcontractorVal = data.subcontractor.replace(/'/g, "\\'");
  
  let insertion = "";
  const prevPart = content.slice(slugIndex, targetIndex).trim();
  if (prevPart.endsWith(',')) {
    insertion = `\n    contractor: '${contractorVal}',\n    subcontractor: '${subcontractorVal}',`;
  } else {
    insertion = `,\n    contractor: '${contractorVal}',\n    subcontractor: '${subcontractorVal}',`;
  }
  
  content = content.slice(0, targetIndex) + insertion + content.slice(targetIndex);
  console.log(`Successfully updated ${slug}`);
}

fs.writeFileSync('src/newsData.ts', content);
console.log("Successfully wrote all updates to src/newsData.ts safely!");
