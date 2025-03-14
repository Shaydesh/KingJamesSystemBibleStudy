
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookName = process.argv[2];

if (!bookName) {
  console.error('Please provide a book name');
  process.exit(1);
}

const inputPath = path.join('attached_assets', `${bookName}.json`);
const outputPath = path.join('src', 'books', `${bookName}.jsx`);

try {
  // Read and parse input file
  const fileContent = fs.readFileSync(inputPath, 'utf8');
  const jsonData = JSON.parse(`[${fileContent}]`);
  
  // Read existing JSX file
  const existingJSX = fs.readFileSync(outputPath, 'utf8');
  const content = existingJSX.replace(/export default data;/, '').replace(/const data =/, '').trim();
  const existingData = Function(`return ${content}`)();

  // Update all chapters with k and v properties
  existingData.chapters = existingData.chapters.map((chapter, chapterIndex) => ({
    ...chapter,
    verses: chapter.verses.map((verse, verseIndex) => ({
      ...verse,
      k: verseIndex,
      v: jsonData[verseIndex]?.v || []
    }))
  }));

  // Create JSX content
  const jsxContent = `const data = ${JSON.stringify(existingData, null, 2)};

export default data;`;

  fs.writeFileSync(outputPath, jsxContent);
  console.log(`Successfully generated ${outputPath}`);

} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
