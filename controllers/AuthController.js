#!/usr/bin/node
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { v4 as uuid4 } from 'uuid';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AuthControllrt {
  getConnect(req, res) {
    const auth = req.header('Authorization');
    if (!auth) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const code = auth.toString().split(' ')[1];
    const decode = Buffer.from(code, 'base64').toString('utf-8');
    const [email, password] = decode.split(':');
    dbClient.findUser({ email, password }).then((user) => {
      if (!user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const token = uuid4();
      const key = `auth_${token}`;
      redisClient.set(key, user._id.toString(), 86400);
      return res.status(200).send({ token });
    }).catch(() => res.status(401).send({ error: 'Unauthorized' }));
  }

  getDisconnect(req, res) {
    const token = req.header('X-Token');
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    redisClient.get(token).then((reply) => {
      if (!reply) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      redisClient.del(token);
      return res.status(204).end();
    });
  }
}

const authController = new AuthControllrt();
export default authController;
