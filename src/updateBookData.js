
const fs = require('fs');
const path = require('path');

const bookName = process.argv[2];

if (!bookName) {
  console.error('Please provide a book name as an argument');
  process.exit(1);
}

// Define file paths
const inputPath = path.join('attached_assets', `${bookName}.json`);
const outputPath = path.join('src', 'books', `${bookName}.jsx`);

console.log('Input path:', inputPath);
console.log('Output path:', outputPath);

try {
  // Read and parse JSON file
  console.log(`Reading ${inputPath}...`);
  const fileContent = fs.readFileSync(inputPath, 'utf8');
  console.log('File content length:', fileContent.length);
  
  const jsonData = JSON.parse(fileContent);
  console.log('Successfully parsed JSON');

  // Create JSX content
  const jsxContent = `const data = {
  "book": "${bookName}",
  "chapters": [
    {
      "chapter": "1",
      "verses": ${JSON.stringify(jsonData, null, 6)}
    }
  ]
};

export default data;`;

  // Write to JSX file
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
