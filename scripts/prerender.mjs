/**
 * Post-build prerendering script.
 * Run after `npm run build` to generate static HTML for each route.
 * 
 * Usage: node scripts/prerender.mjs
 * 
 * This creates individual index.html files for each route so that
 * search engines can crawl them and hosting without SPA fallback works.
 */

import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const TEMPLATE = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

const routes = [
  {
    path: '/planeamento',
    title: 'Planeamento de Casa Inteligente | B-Found',
    description: 'Configure a tecnologia ideal para a sua casa com o nosso guia interativo e receba um orçamento personalizado da B-Found.',
    canonical: 'https://b-found.pt/planeamento',
  },
];

for (const route of routes) {
  const dir = path.join(DIST, route.path);
  fs.mkdirSync(dir, { recursive: true });

  let html = TEMPLATE;
  
  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );
  
  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${route.description}">`
  );
  
  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${route.canonical}" />`
  );
  
  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`✓ Generated ${route.path}/index.html`);
}

console.log('\nPrerendering complete!');
