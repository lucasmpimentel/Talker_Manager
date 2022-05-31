const rescue = require('express-rescue');
const CustomError = require('../models/CustomError');

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

const checkLogin = rescue((req, _res, next) => {
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

const checkToken = rescue((req, _res, next) => {
  const { authorization } = req.headers;
  const TOKEN_LENGTH = 16;
  
  if (!authorization) throw new CustomError(401, 'Token não encontrado');
  if (authorization.length !== TOKEN_LENGTH) throw new CustomError(401, 'Token inválido');

  next();
});

module.exports = { checkLogin, checkToken };