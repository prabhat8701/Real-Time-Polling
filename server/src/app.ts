import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.routes.js';
import pollsRouter from './routes/polls.routes.js';
import votesRouter from './routes/votes.routes.js';

dotenv.config();

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/users', usersRouter);
  app.use('/polls', pollsRouter);
  app.use('/votes', votesRouter);

  return app;
}
