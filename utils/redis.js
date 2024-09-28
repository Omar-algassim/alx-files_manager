#!/usr/bin/node
import redis from 'redis';
import { promisify } from 'util'

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = true;
    this.client.on('connect', () => {
      this.connected = true;
    });

    this.client.on('error', (error) => {
      this.connected = false;
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    const value = await promisify(this.client.get).bind(this.client)(key);
    return value;
  }

  async set(key, value, duration) {
    await promisify(this.client.set).bind(this.client)(key, value, 'EX', duration);
  }

  async del(key) {
    await promisify(this.client.del).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
