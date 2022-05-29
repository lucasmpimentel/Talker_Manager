const express = require('express');
const getTalker = require('../utils/getTalkerJSON');

const routes = express.Router();

routes.get('/talker', async (_req, res) => {
  const talker = await getTalker();
  res.status(200).json(JSON.parse(talker));
});

module.exports = routes;