#!/usr/bin/node
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  constructor() {
    this.redisClient = redisClient;
    this.dbClient = dbClient;
  }

  getStatus() {
    const redis = this.redisClient.isAlive();
    const db = this.dbClient.isAlive();
    return { redis, db };
  }

  async getStats() {
    const stats = { users: await this.dbClient.nbUsers(), files: await this.dbClient.nbFiles() };
    return stats;
  }
}

const appController = new AppController();
export default appController;
