#!/usr/bin/node
import appController from '../controllers/AppController';

const route = (app) => {
  app.get('/status', appController.getStatus);
  app.get('/stats', appController.getStats);
};

export default route;
