const rescue = require('express-rescue');
const getTalkerJSON = require('../utils/getTalkerJSON');
const writeTalkerJSON = require('../utils/writeTalkerJSON');

const editTalker = rescue(async (req, _res, next) => {
  const talkerJSON = await getTalkerJSON();
  const { id } = req.params;
  const updated = { ...req.body, id: parseInt(id, 10) }; 
  
  const newTalkerJSON = talkerJSON.map((person) => {
    if (person.id === parseInt(id, 10)) {
      return updated;
    }
    return person;
  });
  await writeTalkerJSON(newTalkerJSON);
  req.update = updated;

  next();
});

module.exports = editTalker;