import { readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const rootMarker = '<div id="root"><!-- prerendered by scripts/prerender.js --></div>';
const vite = await createServer({
  appType: 'custom',
  server: { middlewareMode: true },
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const renderedApp = renderToString(createElement(App));
  const outputPath = new URL('../dist/index.html', import.meta.url);
  const html = await readFile(outputPath, 'utf8');

  if (!html.includes(rootMarker)) {
    throw new Error('No se encontró el contenedor de prerenderizado esperado en dist/index.html.');
  }

  await writeFile(outputPath, html.replace(rootMarker, `<div id="root">${renderedApp}</div>`));
} finally {
  await vite.close();
}
