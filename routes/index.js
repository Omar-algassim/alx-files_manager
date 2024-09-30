#!/usr/bin/node
import appController from '../controllers/AppController';
import userController from '../controllers/UsersController';

const route = (app) => {
  app.get('/status', appController.getStatus);
  app.get('/stats', appController.getStats);
  app.post('/users', userController.postNew)
};

export default route;
