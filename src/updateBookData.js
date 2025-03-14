
const fs = require('fs');
const path = require('path');

const bookName = process.argv[2];

if (!bookName) {
  console.error('Please provide a book name as an argument');
  process.exit(1);
}

const inputPath = path.join('attached_assets', `${bookName}.json`);
const outputPath = path.join('src', 'books', `${bookName}.jsx`);

try {
  // Read and parse input file
  const fileContent = fs.readFileSync(inputPath, 'utf8');
  const jsonData = JSON.parse(fileContent);

  // Process verses to generate output format
  const processedVerses = jsonData.map(verse => ({
    verse: verse.k.toString(),
    text: verse.v.map(part => part[0]).join(' '),
    k: verse.k,
    v: verse.v
  }));

  // Create JSX content
  const jsxContent = `const data = {
  "book": "${bookName}",
  "chapters": [
    {
      "chapter": "1",
      "verses": ${JSON.stringify(processedVerses, null, 2)}
    }
  ]
};

export default data;`;

  // Write to output file
  fs.writeFileSync(outputPath, jsxContent);
  console.log(`Successfully generated ${outputPath}`);

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
