#!/usr/bin/node
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {

  getStatus() {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    return { redis, db };
  }

  async getStats() {
    const stats = { users: await dbClient.nbUsers(), files: await dbClient.nbFiles() };
    return stats;
  }
}

const appController = new AppController();
export default appController;
