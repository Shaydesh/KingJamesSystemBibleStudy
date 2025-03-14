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
  const fileContent = fs.readFileSync(inputPath, 'utf8');
  // Wrap the content in array brackets to make it valid JSON
  const jsonData = JSON.parse(`[${fileContent}]`);

  // Create JSX content with the complete verse structure
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

  fs.writeFileSync(outputPath, jsxContent);
  console.log(`Successfully generated ${outputPath}`);

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}