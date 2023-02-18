import { Router } from 'express';
import { authRoute } from './auth.route';
import { userRoute } from './user.route';
import { roomRoute } from './room.route';
import { settingsRoute } from './settings.route';
import { gameRoute } from './game.route';

const router: Router = Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/room', roomRoute);
router.use('/settings', settingsRoute);
router.use('/game', gameRoute);

export { router as routes };
