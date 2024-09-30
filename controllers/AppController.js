#!/usr/bin/node
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  constructor() {
    this.getStatus = this.getStatus.bind(this);
    this.getStats = this.getStats.bind(this);
      }

  static getStatus(request, response) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    response.status(200).json({ redis, db });
  }

  static getStats(request, response) {
    const [user, file] = Promise.all([dbClient.nbUsers(), dbClient.nbFiles()]);
    response.status(200).json({ users: user, files: file });
  }
}

const appController = new AppController();
export default appController;
