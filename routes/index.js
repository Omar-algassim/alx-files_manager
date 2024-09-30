#!/usr/bin/node
import appController from '../controllers/AppController';

const route = (app) => {
  app.get('/status', appController.getStatus);
  app.get('/stats', appController.getStats);
  app.post('/users',)
};

export default route;
