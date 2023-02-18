import { Router } from 'express';
import { IRequestWithSocket, IRequestWithUser } from 'common/interfaces';
import { run } from 'common/helpers';
import {
  getRooms,
  getRoomUsers,
  getRoom,
  create,
  shareLinkByEmails,
} from 'services';
import { roomSchema, roomShareSchema } from 'common/validations';
import { validationMiddleware } from 'api/middlewares';

const router: Router = Router();

router.get(
  '/',
  run(() => getRooms()),
);

router.get(
  '/:roomId',
  run((req) => getRoom(Number(req.params.id))),
);

router.get(
  '/:roomId/users',
  run((req) => getRoomUsers(Number(req.params.roomId))),
);

router.post(
  '/',
  validationMiddleware(roomSchema),
  run((req: IRequestWithSocket) => create(req.body, req.io)),
);

router.post(
  '/share-by-email',
  validationMiddleware(roomShareSchema),
  run((req: IRequestWithUser) => shareLinkByEmails(req.body, req.userId)),
);

export { router as roomRoute };
