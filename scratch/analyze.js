const fs = require('fs');

// We can just parse the file to find all projects and their properties.
// Let's write a parser that parses the TS file using VM or dynamic evaluation.
const content = fs.readFileSync('src/newsData.ts', 'utf-8');

// Strip out TypeScript types so we can evaluate it as JavaScript.
let jsContent = content
  .replace(/export interface NewsArticle[\s\S]*?export const NEWS_ARTICLES: NewsArticle\[\] =/m, 'const NEWS_ARTICLES =')
  .replace(/export const NEWS_ARTICLES: NewsArticle\[\] =/g, 'const NEWS_ARTICLES =');

// Append code to print JSON representation of NEWS_ARTICLES to stdout.
jsContent += '\n\nconsole.log(JSON.stringify(NEWS_ARTICLES, null, 2));';

try {
  // Run it
  const { execSync } = require('child_process');
  fs.writeFileSync('scratch/temp_news.js', jsContent);
  const result = execSync('node scratch/temp_news.js', { encoding: 'utf-8' });
  const articles = JSON.parse(result);
  
  console.log(`Loaded ${articles.length} projects.`);
  for (const a of articles) {
    console.log(`SLUG: ${a.slug}`);
    console.log(`TITLE: ${a.title}`);
    console.log(`CONTRACTOR: ${a.contractor || 'N/A'}`);
    console.log(`SUBCONTRACTOR: ${a.subcontractor || 'N/A'}`);
    console.log(`CONSTRUCTOR: ${a.constructor && typeof a.constructor === 'string' ? a.constructor : 'N/A'}`);
    console.log(`SUBCONSTRUCTOR: ${a.subConstructor || a.subconstructor || 'N/A'}`);
    console.log('---');
  }
} catch (e) {
  console.error("Error executing:", e);
} finally {
  if (fs.existsSync('scratch/temp_news.js')) {
    fs.unlinkSync('scratch/temp_news.js');
  }
}
