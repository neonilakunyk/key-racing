import cors from 'cors';
import Knex from 'knex';
import path from 'path';
import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Model } from 'objection';

import { knexConfig } from '../knexfile';
import { routes } from 'api/routes';
import { env } from 'env';
import { getSocketHandlers } from 'socket/handlers';
import { logger } from 'common/utils';
import {
  errorHandlerMiddleware,
  auth as authorizationMiddleware,
  socket as socketMiddleware,
} from 'api/middlewares';
import { SocketEvents } from 'common/enums';

const { port, url } = env.app;

const app: Express = express();
const httpServer = createServer(app);

const knex = Knex(knexConfig);
Model.knex(knex);

const io = new Server(httpServer, {
  cors: {
    origin: url,
    methods: ['POST'],
  },
});

io.on(SocketEvents.CONNECTION, getSocketHandlers(io));

app.use(
  cors({
    origin: url,
  }),
);

/* method to handle application/json, new body object containing the parsed data is populated on the request object */
app.use(express.json());
/* method handle application/x-www-form-urlencoded, new body object will contain key-value pairs, where the value can be
 - a string or array (when extended is false)
 - any type (when extended is true)*/
app.use(express.urlencoded({ extended: true }));

app.use('/api', authorizationMiddleware, socketMiddleware(io), routes);

app.use(errorHandlerMiddleware);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

httpServer.listen(port, async () => {
  logger.info(`Server is running at ${port}.`);
});

app.on('close', async () => {
  await knex.destroy();
});

export default app;
