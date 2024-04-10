// backend/controllers/index.js

const userController = require('./userController');
const errorHandler = require('../middleWare/errorMiddleware');

module.exports = {
  userController,
  errorHandler,
};
