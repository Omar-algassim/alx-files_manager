#!/usr/bin/node
import appController from '../controllers/AppController';
import userController from '../controllers/UsersController';
import authController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const route = (app) => {
  app.get('/status', appController.getStatus);
  app.get('/stats', appController.getStats);
  app.post('/users', userController.postNew);
  app.get('/connect', authController.getConnect);
  app.get('/disconnect', authController.getDisconnect);
  app.get('/users/me', userController.getMe);
  app.post('/files', FilesController.postUpload);
  app.get('/files/:id', FilesController.getShow);
  app.get('/files/', FilesController.getIndex);
  app.put('/files/:id/publish', FilesController.putPublish);
  app.put('/files/:id/unpublish', FilesController.putUnpublish);
  app.get('/files/:id/data', FilesController.getFile);
};

export default route;
