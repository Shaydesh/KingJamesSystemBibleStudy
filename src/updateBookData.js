
const fs = require('fs');
const path = require('path');

// Get the book name from command line arguments
const bookName = process.argv[2];

if (!bookName) {
  console.error('Please provide a book name as an argument. Example: node updateBookData.js Genesis');
  process.exit(1);
}

// Paths to the files
const jsonFilePath = `./attached_assets/${bookName}.json`;
const jsxFilePath = `./src/books/${bookName}.jsx`;

// Check if the JSON file exists
if (!fs.existsSync(jsonFilePath)) {
  console.error(`Error: ${bookName}.json file not found in attached_assets directory.`);
  process.exit(1);
}

// Read the JSON file
console.log('Current working directory:', process.cwd());
console.log('Looking for JSON file at:', jsonFilePath);
console.log(`Reading ${bookName}.json file...`);
let bookJson;
try {
  const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
  console.log('File content length:', fileContent.length);
  bookJson = JSON.parse(fileContent);
  console.log('Successfully parsed JSON');
} catch (error) {
  console.error(`Error with ${bookName}.json:`, error);
  process.exit(1);
}

// Create the JSX content
console.log(`Creating updated ${bookName}.jsx content...`);

// Start with the basic structure
let jsxContent = `const data =
{
    "book": "${bookName}",
    "chapters": [
        {
            "chapter": "1",
            "verses": [
`;

// Process and add all verses
for (let i = 0; i < bookJson.length; i++) {
  const item = bookJson[i];
  
  // Format each verse entry
  const verseEntry = `                {
                    "verse": "${i + 1}",
                    "text": "${item.text || getVerseText(item)}",
                    "k": ${item.k ? JSON.stringify(item.k) : 'null'},
                    "v": ${JSON.stringify(item.v, null, 10).replace(/^/gm, '                    ')}
                }${i < bookJson.length - 1 ? ',' : ''}`;
  
  jsxContent += verseEntry + '\n';
}

// Complete the JSX structure
jsxContent += `            ]
        }
    ]
};

export default data;`;

// Function to extract verse text from a verse object
function getVerseText(verseObject) {
  // Extract text from the verse object's phrases
  if (verseObject.v && Array.isArray(verseObject.v)) {
    return verseObject.v.map(phrase => phrase[0]).join(' ');
  }
  return ""; // Default empty string if no text can be determined
}

// Write the updated content to the JSX file
console.log(`Writing updated content to ${bookName}.jsx...`);
try {
  fs.writeFileSync(jsxFilePath, jsxContent);
  console.log(`${bookName}.jsx has been updated successfully!`);
} catch (error) {
  console.error(`Error writing to ${bookName}.jsx:`, error);
  process.exit(1);
}
