import { Router } from 'express';
import { IRequestWithSocket, IRequestWithUser } from 'common/interfaces';
import { run } from 'common/helpers';
import { getRooms, getRoom, create, shareLinkByEmails } from 'services';
import { roomSchema, roomShareSchema } from 'common/validations';
import { validationMiddleware } from 'api/middlewares';

const router: Router = Router();

router.get(
  '/',
  run(() => getRooms()),
);

router.get(
  '/:roomId',
  run((req) => getRoom(Number(req.params.roomId))),
);

router.post(
  '/',
  validationMiddleware({ body: roomSchema }),
  run((req: IRequestWithSocket) => create(req.body, req.io)),
);

router.post(
  '/share-by-email',
  validationMiddleware({ body: roomShareSchema }),
  run((req: IRequestWithUser) => shareLinkByEmails(req.body, req.userId)),
);

export { router as roomRoute };
