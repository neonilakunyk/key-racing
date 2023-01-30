import { Express } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import roomRoute from './room.route';
import settingsRoute from './settings.route';
import gameRoute from './game.route';

const routes = (app: Express): void => {
  app.use('/api/auth', authRoute);
  app.use('/api/user', userRoute);
  app.use('/api/room', roomRoute);
  app.use('/api/settings', settingsRoute);
  app.use('/api/game', gameRoute);
};

export default routes;
