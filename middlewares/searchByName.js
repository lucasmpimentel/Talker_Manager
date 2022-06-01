const rescue = require('express-rescue');
const getTalkerJSON = require('../utils/getTalkerJSON');

const searchByName = rescue(async (req, _res, next) => {
  const talkerJSON = await getTalkerJSON();
  const applySearch = talkerJSON.filter((person) => (
    person.name.toLowerCase().includes(req.query.q.toLowerCase())
  ));
  req.search = applySearch;
  
  next();
});

module.exports = searchByName;
