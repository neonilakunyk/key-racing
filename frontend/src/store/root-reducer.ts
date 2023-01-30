import { authReducer as auth } from './auth';
import { roomReducer as room } from './room';
import { ratingReducer as rating } from './rating';
import { settingsReducer as settings } from './settings';
import { gameReducer as game } from './game';

const rootReducer = {
  auth,
  room,
  rating,
  settings,
  game,
};

export { rootReducer };
