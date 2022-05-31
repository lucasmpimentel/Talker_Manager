const fs = require('fs').promises;

const writeTalkerJSON = (data) => (
  fs.writeFile('talker.json', JSON.stringify(data), { flag: 'w' })
);

module.exports = writeTalkerJSON;
