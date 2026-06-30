const acorn = require('acorn');
const fs = require('fs');
let code = fs.readFileSync('src/newsData.ts', 'utf-8');

// Strip out types to allow acorn to parse it
code = code.replace(/export interface NewsArticle[\s\S]*?export const NEWS_ARTICLES: NewsArticle\[\] =/m, 'const NEWS_ARTICLES =');

try {
  acorn.parse(code, { ecmaVersion: 2020, sourceType: 'module' });
  console.log("No syntax errors found by Acorn!");
} catch (e) {
  console.log('Error at pos:', e.pos, 'loc:', e.loc, 'message:', e.message);
  console.log('--- CONTEXT ---');
  console.log(code.substring(Math.max(0, e.pos - 100), e.pos + 100));
}
