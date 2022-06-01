const rescue = require('express-rescue');
const getTalkerJSON = require('../utils/getTalkerJSON');
const writeTalkerJSON = require('../utils/writeTalkerJSON');

const deleteTalker = rescue(async (req, _res, next) => {
  const talkerJSON = await getTalkerJSON();
  const { id } = req.params;
  
  const newTalkerJSON = talkerJSON.filter((person) => (
    person.id !== parseInt(id, 10)
));
  await writeTalkerJSON(newTalkerJSON);

  next();
});

module.exports = deleteTalker;
