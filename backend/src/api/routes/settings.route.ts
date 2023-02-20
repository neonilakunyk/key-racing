import { Router } from 'express';
import { IRequestWithUser } from 'common/interfaces';
import { run } from 'common/helpers';
import { getSettings, setGameSettings, setSecuritySettings } from 'services';
import { validationMiddleware } from 'api/middlewares';
import { gameSettingsSchema, securitySettingsSchema } from 'common/validations';

const router: Router = Router();

router.get(
  '/',
  run((req: IRequestWithUser) => getSettings(req.userId)),
);

router.put(
  '/game',
  validationMiddleware({ body: gameSettingsSchema }),
  run((req: IRequestWithUser) => setGameSettings(req.userId, req.body)),
);

router.put(
  '/security',
  validationMiddleware({ body: securitySettingsSchema }),
  run((req: IRequestWithUser) => setSecuritySettings(req.userId, req.body)),
);

export { router as settingsRoute };
