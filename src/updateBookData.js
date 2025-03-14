
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
  
  // Read existing JSX file and extract data object
  const existingJSX = fs.readFileSync(outputPath, 'utf8');
  const content = existingJSX.replace(/export default data;/, '').replace(/const data =/, '').trim();
  const existingData = Function(`return ${content}`)();

  // Update verses with k and v properties
  const verses = existingData.chapters[0].verses.map((verse, index) => ({
    ...verse,
    k: jsonData[index]?.k || index,
    v: jsonData[index]?.v || []
  }));

  // Create JSX content
  const jsxContent = `const data = {
  "book": "${bookName}",
  "chapters": [
    {
      "chapter": "1",
      "verses": ${JSON.stringify(verses, null, 6)}
    }
  ]
};

export default data;`;

  fs.writeFileSync(outputPath, jsxContent);
  console.log(`Successfully generated ${outputPath}`);

} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
