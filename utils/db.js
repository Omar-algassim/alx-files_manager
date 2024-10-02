#!/usr/bin/node

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`);
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const nUser = await this.client.db(this.database).collection('users').countDocuments();
    return nUser;
  }

  async nbFiles() {
    const nFile = await this.client.db(this.database).collection('files').countDocuments();
    return nFile;
  }

  async findUser(user) {
    const userFound = await this.client.db(this.database).collection('users').findOne(user);
    return userFound;
  }

  async createUser(email, password) {
    this.client.db(this.database).collection('users').insertOne({ email, password });
    return { email, password };
  }
}

const dbClient = new DBClient();

export default dbClient;
