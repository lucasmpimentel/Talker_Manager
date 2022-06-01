const rescue = require('express-rescue');
const CustomError = require('../models/CustomError');
const getTalkerJSON = require('../utils/getTalkerJSON');
const writeTalkerJSON = require('../utils/writeTalkerJSON');

/* regex pattern retirado de https://regexr.com/31dth, com algumas adaptações para encaixar no requisito */
const regexDate = /^(([1-2][0-9])|(0[1-9])|(3[0-1]))\/((1[0-2])|(0[1-9]))\/([0-9]{4})$/g;

const checkNewTalker = rescue((req, _res, next) => {
  const { name, age } = req.body;
  const MIN_AGE = 18;

  if (!name) throw new CustomError(400, 'O campo "name" é obrigatório');
  if (!age) throw new CustomError(400, 'O campo "age" é obrigatório');
  if (name.length < 3) throw new CustomError(400, 'O "name" deve ter pelo menos 3 caracteres');
  if (age < MIN_AGE) throw new CustomError(400, 'A pessoa palestrante deve ser maior de idade');
  
  next();
});

const checkEmpty = (talk) => {
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    throw new CustomError(
      400,
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    );
  }
};

const checkTalk = rescue((req, _res, next) => {
  const { talk } = req.body;
  const MIN_RATE = 1;
  const MAX_RATE = 5;
  
  checkEmpty(talk);
  if (!talk.watchedAt.match(regexDate)) {
    throw new CustomError(400, 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
  if (talk.rate < MIN_RATE || talk.rate > MAX_RATE) {
    throw new CustomError(400, 'O campo "rate" deve ser um inteiro de 1 à 5');
  }

  next();
});

const insertNewTalker = rescue(async (req, _res, next) => {
  const talkerJSON = await getTalkerJSON();
  const id = 1 + talkerJSON[talkerJSON.length - 1].id;
  const newTalker = { id, ...req.body };
  
  talkerJSON.push(newTalker);
  await writeTalkerJSON(talkerJSON);
  req.response = newTalker;
  next();
});

module.exports = { checkNewTalker, checkTalk, insertNewTalker };