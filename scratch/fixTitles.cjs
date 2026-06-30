const fs = require('fs');
let content = fs.readFileSync('src/newsData.ts', 'utf-8');

// Replace everything between title: ` and ` for Australia
content = content.replace(/title:\s*`Australia[^`]+Australia`,/g, "title: `Australia-Asia Power Link - Australia`,");

// Replace everything between title: ` and ` for Amritsar
content = content.replace(/title:\s*`Amritsar[^`]+India`,/g, "title: `Amritsar-Kolkata Industrial Corridor (AKIC) - India`,");

// Replace everything between title: ` and ` for Delhi
content = content.replace(/title:\s*`Delhi[^`]+India`,/g, "title: `Delhi-Mumbai Industrial Corridor (DMIC) - India`,");

// Replace everything between title: ` and ` for PAIMANA
content = content.replace(/title:\s*`PAIMANA[^`]+India`,/g, "title: `PAIMANA - India`,");

fs.writeFileSync('src/newsData.ts', content);
