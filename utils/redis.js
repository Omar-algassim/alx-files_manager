#!/usr/bin/node
import redis from 'redis';
import { promisify } from 'util' 

class RedisClient {
  constructor() {
    const client = redis.createClient();
    client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
  }

  isAlive() {
    return this.client.connected();
  }

  async get(key) {
     await client.get(key, (_, reply) => {
      return reply;
    });
  }

  async set(key, value, duration) {
    await client.set(key, value, 'EX', duration);
  }

  async del(key) {
    await client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
