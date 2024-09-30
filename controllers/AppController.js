#!/usr/bin/node
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(request, response) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    response.status(200).json({ redis, db });
  }

  static getStats(request, response) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([user, file]) => {
        response.status(200).json({ users: user, files: file });
      });
  }
}

const appController = new AppController();
export default appController;
