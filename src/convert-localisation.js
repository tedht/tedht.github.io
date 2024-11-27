// installer csvtojson : npm install csvtojson
// converir en json : node convert-translations.js
const fs = require('fs');
const csv = require('csvtojson');

async function convertCSVtoJSON() {
  const csvFilePath = 'data/localisation.csv';
  const jsonFilePath = 'data/localisation.json';

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