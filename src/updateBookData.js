
const fs = require('fs');
const path = require('path');

const bookName = process.argv[2];

if (!bookName) {
  console.error('Please provide a book name as an argument');
  process.exit(1);
}

const inputPath = path.join('attached_assets', `${bookName}.json`);
const outputPath = path.join('src', 'books', `${bookName}.jsx`);

console.log('Input path:', inputPath);
console.log('Output path:', outputPath);

try {
  const fileContent = fs.readFileSync(inputPath, 'utf8');
  console.log('File content length:', fileContent.length);
  
  const jsonData = JSON.parse(fileContent);
  console.log('Successfully parsed JSON');

  // Transform each verse to include verse number and text
  const verses = jsonData.map((verse, index) => ({
    verse: (index + 1).toString(),
    text: verse.v.map(part => part[0]).join(' '),
    k: verse.k,
    v: verse.v
  }));

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

  console.log(`Writing to ${outputPath}...`);
  fs.writeFileSync(outputPath, jsxContent);
  console.log('Conversion completed successfully!');

} catch (error) {
  console.error('Error:', error.message);
  if (error.code === 'ENOENT') {
    console.error(`File not found: ${inputPath}`);
  }
  process.exit(1);
}
