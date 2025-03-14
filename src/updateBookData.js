const fs = require('fs');
const path = require('path');

// Get the book name from command line arguments
const bookName = process.argv[2];

if (!bookName) {
  console.error('Please provide a book name as an argument');
  process.exit(1);
}

// Define file paths
const inputPath = path.join('attached_assets', `${bookName}.json`);
const outputPath = path.join('src', 'books', `${bookName}.jsx`);

try {
  // Read and parse JSON file
  console.log(`Reading ${inputPath}...`);
  const jsonData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

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
  process.exit(1);
}