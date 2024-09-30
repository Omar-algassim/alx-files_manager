#!/usr/bin/node
import express from 'express';
import route from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

route(app);
app.listen(port, () => {
  console.log(`server is connected in Port ${port}`);
});

export default app;
