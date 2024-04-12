// backend/controllers/index.js

import userController from './userController';
import errorHandler from '../middleWare/errorMiddleware';

export default {
  userController,
  errorHandler,
};
