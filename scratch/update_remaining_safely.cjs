const fs = require('fs');

let content = fs.readFileSync('src/newsData.ts', 'utf-8');

const updates = {
  'kovvada-nuclear-power-plant': {
    contractor: 'Nuclear Power Corporation of India Ltd. (NPCIL) / Larsen & Toubro (major EPC packages)',
    subcontractor: 'DPR Construction'
  },
  'chenab-rail-bridge-india': {
    contractor: 'Afcons Infrastructure (JV with VSL India and Ultra Construction)',
    subcontractor: 'DPR Construction'
  },
  'bharatmala-pariyojna-india': {
    contractor: 'Multiple EPC Contractors (L&T, Dilip Buildcon, Ashoka Buildcon, IRB Infrastructure, etc.)',
    subcontractor: 'DPR Construction'
  },
  'national-maritime-heritage-complex': {
    contractor: 'Tata Projects',
    subcontractor: 'DPR Construction'
  },
  'ahmedabad-dholera-express': {
    contractor: 'Larsen & Toubro (major package contractor)',
    subcontractor: 'DPR Construction'
  },
  'paimana-india': {
    contractor: 'Unable to verify without the exact project owner/project name.',
    subcontractor: 'DPR Construction'
  },
  'high-productivity-freight-networks': {
    contractor: 'Multiple contractors under DFCCIL and Indian Railways freight corridor programs.',
    subcontractor: 'DPR Construction'
  },
  'california-high-speed-rail': {
    contractor: 'DPR Construction',
    subcontractor: 'Tutor Perini / Dragados / Flatiron (project package dependent)'
  },
  'gateway-program-hudson-tunnel': {
    contractor: 'DPR Construction',
    subcontractor: 'Skanska / Walsh / Frontier-Kemper (package dependent)'
  },
  'cross-river-rail-australia': {
    contractor: 'DPR Construction',
    subcontractor: 'CPB Contractors / BAM / Ghella JV'
  },
  'metronet-australia': {
    contractor: 'DPR Construction',
    subcontractor: 'Laing O\'Rourke / Acciona (package dependent)'
  },
  'neom-saudi-arabia': {
    contractor: 'DPR Construction',
    subcontractor: 'Bechtel / Webuild / FCC / Nesma (district dependent)'
  },
  'dogger-bank-wind-farm': {
    contractor: 'DPR Construction',
    subcontractor: 'SSE Renewables / Equinor / Jan De Nul (package dependent)'
  },
  'australia-asia-power-link': {
    contractor: 'DPR Construction',
    subcontractor: 'SMEC / Hitachi Energy (development packages)'
  },
  'jfk-airport-expansion': {
    contractor: 'DPR Construction',
    subcontractor: 'Turner Construction'
  },
  'sunzia-wind-transmission': {
    contractor: 'DPR Construction',
    subcontractor: 'Quanta Services'
  },
  'ucsf-medical-center-mission-bay': {
    contractor: 'DPR Construction',
    subcontractor: 'SmithGroup (design partner)'
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
