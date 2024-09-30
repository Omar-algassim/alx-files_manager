#!/usr/bin/node
import dbClient from "../utils/db";
import sha1 from 'sha1';
class UserController {
  postNew(request, response) {
    const email = request.body.email;
    const password = request.body.password;
    if (!email) {
      response.status(400).send({ 'error': 'Missing email' });
    } else if (!password) {
        response.status(400).json({ 'error': 'Missing password' });
    }
    const user = dbClient.findUser(email);
    if (user) {
        response.status(400).json({'error': 'Already exist'});
    }
    const hashpsw = sha1(password)
    dbClient.createUser(email, hashpsw);
    const usr = dbClient.findUser(email);
    response.status(201).json({ 'id': usr._id, 'email': usr.email });
  }
}

const userController = new UserController();
export default userController;
