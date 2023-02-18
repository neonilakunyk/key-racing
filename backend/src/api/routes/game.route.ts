import { Router } from 'express';
import { IRequestWithSocket } from 'common/interfaces';
import { run } from 'common/helpers';
import {
  addUser,
  deleteUser,
  getText,
  deleteText,
  getShareLink,
  getJoke,
} from 'services';
import { validationMiddleware } from 'api/middlewares';
import { roomUserSchema } from 'common/validations';

const router: Router = Router();

router.get(
  '/:roomId/text',
  run((req) => getText(Number(req.params.roomId))),
);

router.get(
  '/:roomId/link',
  run((req) => getShareLink(Number(req.params.roomId))),
);

router.put(
  '/delete-text',
  run((req) => deleteText(Number(req.body.roomId))),
);

router.put(
  '/add-user',
  validationMiddleware(roomUserSchema),
  run((req: IRequestWithSocket) => addUser(req.body, req.io)),
);

router.put(
  '/delete-user',
  validationMiddleware(roomUserSchema),
  run((req: IRequestWithSocket) => deleteUser(req.body, req.io)),
);

router.get(
  '/joke',
  run(() => getJoke()),
);

export { router as gameRoute };
