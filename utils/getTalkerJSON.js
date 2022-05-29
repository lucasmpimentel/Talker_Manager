const fs = require('fs').promises;

const getJSON = async () => {
  const result = await fs.readFile('./talker.json', 'utf-8');
  return result;
 };

module.exports = getJSON;