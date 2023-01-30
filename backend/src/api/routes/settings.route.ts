import { Router } from 'express';
import { IRequestWithUser } from '../../common/interfaces';
import { run } from '../../common/helpers';
import {
  getSettings,
  setGameSettings,
  setSecuritySettings,
} from '../../services';
import { validationMiddleware } from '../middlewares';
import { gameSettingsSchema } from '../../common/validations';

const router: Router = Router();

router.get(
  '/',
  run((req: IRequestWithUser) => getSettings(req.userId)),
);

router.put(
  '/game',
  validationMiddleware(gameSettingsSchema),
  run((req: IRequestWithUser) => setGameSettings(req.userId, req.body)),
);

router.put(
  '/security',
  run((req: IRequestWithUser) => setSecuritySettings(req.userId, req.body)),
);

export default router;
