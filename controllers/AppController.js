#!/usr/bin/node
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {

  getStatus(request, response) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    response.status(200).json({ "redis": redis, "db": db });
  }

  async getStats(request, response) {
    const stats = { "users": await dbClient.nbUsers(), "files": await dbClient.nbFiles() };
    response.status(200).json(stats);
  }
}

const appController = new AppController();
export default appController;
