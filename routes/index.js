#!/usr/bin/node
import appController from '../controllers/AppController';
import userController from '../controllers/UsersController';
import authController from '../controllers/AuthControllrt';

const route = (app) => {
  app.get('/status', appController.getStatus);
  app.get('/stats', appController.getStats);
  app.post('/users', userController.postNew);
  app.get('/connect', authController.getConnect);
  app.get('/disconnect', authController.getDisconnect);
  app.get('/users/me', authController.getMe);
};

export default route;
