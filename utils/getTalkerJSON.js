const fs = require('fs').promises;

const getJSON = async () => {
  const result = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(result);
 };

module.exports = getJSON;