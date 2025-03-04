// instal csvtojson : npm install csvtojson
// convert to json : node src/convert-localisation.js
const fs = require('fs');
const csv = require('csvtojson');

async function convertCSVtoJSON() {
  const csvFilePath = 'localisation/localisation.csv';
  const jsonFilePath = 'localisation/localisation.json';

  try {
    const jsonArray = await csv().fromFile(csvFilePath);


    const translations = {};
    jsonArray.forEach(row => {
      const key = row.key;
      Object.keys(row).forEach(lang => {
        if (lang !== 'key') {
          translations[lang] = translations[lang] || {};
          translations[lang][key] = row[lang];
        }
      });
    });

    fs.writeFileSync(jsonFilePath, JSON.stringify(translations, null, 2));
    console.log('Translations converted and saved to JSON!');
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
  }
}

convertCSVtoJSON();