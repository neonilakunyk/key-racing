import 'reflect-metadata';
import cors from 'cors';
import path from 'path';
import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './api/routes';
import { env } from './env';
import { getSocketHandlers } from './socket/handlers';
import { logger } from './common/utils/logger.util';
import { connectDB } from './data/db';
import {
  errorHandlerMiddleware,
  auth as authorizationMiddleware,
  socket as socketMiddleware,
} from './api/middlewares';
import { SocketEvents } from './common/enums';

const { port, url } = env.app;

const app: Express = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: url,
    methods: ['POST'],
  },
});

io.on(SocketEvents.CONNECTION, getSocketHandlers(io));

app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', authorizationMiddleware, socketMiddleware(io));

routes(app);

app.use(errorHandlerMiddleware);

app.use('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

connectDB();

httpServer.listen(port, async () => {
  logger.info(`Server is running at ${port}.`);
});

export default app;
