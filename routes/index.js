const express = require('express');
const getTalker = require('../utils/getTalkerJSON');
const searchByID = require('../middlewares/searchByID');
const generateToken = require('../utils/getToken');
const { checkLogin, checkToken } = require('../middlewares/loginMiddlewares');
const {
  checkNewTalker,
  checkTalk,
  insertNewTalker,
} = require('../middlewares/newTalkerMiddlewares');

const routes = express.Router();

routes.get('/talker', async (_req, res) => {
  const talker = await getTalker();
  res.status(200).json(talker);
});

routes.get('/talker/:id', searchByID, (req, res) => {
  res.status(200).json(req.talker);
});

routes.post('/login', checkLogin, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

routes.post('/talker',
checkToken,
checkNewTalker,
checkTalk,
insertNewTalker,
(req, res) => {
  res.status(201).json(req.response);
});

module.exports = routes;