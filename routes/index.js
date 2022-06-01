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
const editTalker = require('../middlewares/editTalker');
const deleteTalker = require('../middlewares/deleteTalker');
const searchByName = require('../middlewares/searchByName');

const routes = express.Router();

routes.get('/talker', async (_req, res) => {
  const talker = await getTalker();
  res.status(200).json(talker);
});

routes.get('/talker/search', checkToken, searchByName, (req, res) => {
  res.status(200).json(req.search);
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

routes.put('/talker/:id',
checkToken,
searchByID,
checkNewTalker,
checkTalk,
editTalker,
(req, res) => {
  res.status(200).json(req.update);
});

routes.delete('/talker/:id',
checkToken,
searchByID,
deleteTalker,
(req, res) => {
  res.status(204).end();
});

module.exports = routes;