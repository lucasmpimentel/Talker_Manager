const rescue = require('express-rescue');
const CustomError = require('../models/CustomError');

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

const checkLogin = rescue((req, res, next) => {
  const { email, password } = req.body;
  
  if (!email) throw new CustomError(400, 'O campo "email" é obrigatório');
  if (!email.match(emailRegex)) {
    throw new CustomError(400, 'O "email" deve ter o formato "email@email.com"');
  }
  if (!password) throw new CustomError(400, 'O campo "password" é obrigatório');
  if (password.length < 6) {
    throw new CustomError(400, 'O "password" deve ter pelo menos 6 caracteres');
  }
  next();
});

module.exports = checkLogin;