
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read Genesis.json
const genesisJson = require('../../attached_assets/Genesis.json');

// Read the Genesis.jsx content
const genesisJsxPath = join(__dirname, '../../src/books/Genesis.jsx');
const genesisJsxContent = fs.readFileSync(genesisJsxPath, 'utf8');

// Parse the data object from Genesis.jsx
const startIndex = genesisJsxContent.indexOf('const data =');
const jsxData = eval('(' + genesisJsxContent.substring(startIndex + 'const data ='.length) + ')');

// Merge the data
jsxData.chapters.forEach((chapter, chapterIndex) => {
  chapter.verses.forEach((verse, verseIndex) => {
    const jsonVerse = genesisJson[parseInt(verse.k)];
    if (jsonVerse) {
      verse.k = jsonVerse.k;
      verse.v = jsonVerse.v;
    }
  });
});

// Generate the new content
const newContent = `const data = ${JSON.stringify(jsxData, null, 2)};\n\nexport default data;`;

// Write back to Genesis.jsx
fs.writeFileSync(genesisJsxPath, newContent, 'utf8');

console.log('Merge completed successfully!');
