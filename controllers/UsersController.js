#!/usr/bin/node
/* eslint-disable class-methods-use-this */
import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UserController {
  postNew(request, response) {
    const { email, password } = request.body;
    if (!email) {
      response.status(400).send({ error: 'Missing email' });
    } else if (!password) {
      response.status(400).json({ error: 'Missing password' });
    }
    const user = dbClient.findUser({ email });
    user.then((usr) => {
      if (usr) {
        response.status(400).json({ error: 'Already exist', email: usr.email });
      }
    }).catch((err) => {
      console.log(err);
    });
    const hashpsw = sha1(password);
    dbClient.createUser(email, hashpsw);
    const newuser = dbClient.findUser({ email });
    newuser.then((usr) => {
      response.status(201).json({ id: usr._id, email: usr.email });
    }).catch((err) => {
      console.log(err);
    });
  }

  getMe(req, res) {
    const token = req.header('X-Token');
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const userId = redisClient.get(`auth_${token}`);
    const user = dbClient.findUser({ _id: userId });
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    return res.status(200).send({ id: user._id, email: user.email });
  }
}

const userController = new UserController();
export default userController;
