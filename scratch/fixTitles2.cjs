const fs = require('fs');
let content = fs.readFileSync('src/newsData.ts', 'utf-8');

content = content.replace(/Australia\?\?\?Asia Power Link \?\?\? Australia/g, 'Australia-Asia Power Link - Australia');
content = content.replace(/Amritsar\?\?\?Kolkata Industrial Corridor \(AKIC\) \?\?\? India/g, 'Amritsar-Kolkata Industrial Corridor (AKIC) - India');
content = content.replace(/Delhi\?\?\?Mumbai Industrial Corridor \(DMIC\) \?\?\? India/g, 'Delhi-Mumbai Industrial Corridor (DMIC) - India');
content = content.replace(/PAIMANA \?\?\? India/g, 'PAIMANA - India');
content = content.replace(/\?\?\?/g, '-');

// Wait, let's just replace all `title:` that match anything weird
content = content.replace(/title:\s*`Australia[^`]+Australia`,/g, "title: `Australia-Asia Power Link - Australia`,");
content = content.replace(/title:\s*`Amritsar[^`]+India`,/g, "title: `Amritsar-Kolkata Industrial Corridor (AKIC) - India`,");
content = content.replace(/title:\s*`Delhi[^`]+India`,/g, "title: `Delhi-Mumbai Industrial Corridor (DMIC) - India`,");
content = content.replace(/title:\s*`PAIMANA[^`]+India`,/g, "title: `PAIMANA - India`,");

fs.writeFileSync('src/newsData.ts', content);
