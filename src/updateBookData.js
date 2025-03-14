
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
  const fileContent = fs.readFileSync(inputPath, 'utf8');
  const jsonData = JSON.parse(`[${fileContent}]`);
  
  // Transform data to include verse numbers and text along with k and v
  const verses = jsonData.map((item, index) => ({
    verse: (index + 1).toString(),
    text: item.v.map(([text]) => text).join(' '),
    k: item.k,
    v: item.v
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
