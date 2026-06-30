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
  const regex = new RegExp(`(slug:\\s*['"]\\s*${slug}\\s*['"],[\\s\\S]*?)(^\\s*purpose:\\s*\`|^\\s*})`, 'm');
  const match = content.match(regex);
  if (match) {
    // Escape single quotes in contractor / subcontractor values if needed, but since we use template literal, we are okay.
    // However, if we put single quotes around them, make sure we escape any existing single quotes in value.
    const contractorVal = data.contractor.replace(/'/g, "\\'");
    const subcontractorVal = data.subcontractor.replace(/'/g, "\\'");
    const replacement = `${match[1]}    contractor: '${contractorVal}',\n    subcontractor: '${subcontractorVal}',\n${match[2]}`;
    content = content.replace(regex, replacement);
    console.log('Updated ' + slug);
  } else {
    console.log('Could not find slug: ' + slug);
  }
}

fs.writeFileSync('src/newsData.ts', content);
console.log("Successfully wrote all updates to src/newsData.ts!");
