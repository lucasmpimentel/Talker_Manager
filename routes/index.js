const express = require('express');
const getTalker = require('../utils/getTalkerJSON');
const searchByID = require('../middlewares/searchByID');

const routes = express.Router();

routes.get('/talker', async (_req, res) => {
  const talker = await getTalker();
  res.status(200).json(talker);
});

routes.get('/talker/:id', searchByID, (req, res) => {
  res.status(200).json(req.talker);
});

module.exports = routes;