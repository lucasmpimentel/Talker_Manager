const fs = require('fs').promises;

const getTalkerJSON = async () => {
  const result = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(result);
 };

module.exports = getTalkerJSON;