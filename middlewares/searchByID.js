const rescue = require('express-rescue');
const getTalkerJSON = require('../utils/getTalkerJSON');
const CustomError = require('../models/CustomError');

const searchByID = rescue(async (req, _res, next) => {
  const { id } = req.params;
  const talkerDB = await getTalkerJSON();
  
  const talkerID = talkerDB.findIndex((talker) => talker.id === parseInt(id, 10));
  if (talkerID === -1) throw new CustomError(404, 'Pessoa palestrante não encontrada');
  req.talker = talkerDB[talkerID];
  next();
});

module.exports = searchByID;