const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const middleware = require('./src/utils/middleware.js');
const { CORS_ORIGIN } = require('./src/utils/config.js');
const recipeRouter = require('./src/routes/recipes.js');
const dietRouter = require('./src/routes/diets.js');

const server = express();

server.name = 'API';

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${CORS_ORIGIN}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/recipes', recipeRouter);
server.use('/diets', dietRouter);

server.use(middleware.unknownEndpoint);
server.use(middleware.errorHandler);

module.exports = server;
