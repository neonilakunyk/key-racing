import { Router } from 'express';
import { IRequestWithSocket, IRequestWithUser } from '../../common/interfaces';
import { run } from '../../common/helpers/route.helper';
import { getRooms, getRoom, create, shareLinkByEmails } from '../../services';
import { roomSchema } from '../../common/validations';
import { validationMiddleware } from '../middlewares';

const router: Router = Router();

router.get(
  '/',
  run(() => getRooms()),
);

router.get(
  '/:id',
  run((req) => getRoom(req.params.id)),
);

router.post(
  '/share-by-email',
  run((req: IRequestWithUser) => shareLinkByEmails(req.body, req.userId)),
);

router.post(
  '/',
  validationMiddleware(roomSchema),
  run((req: IRequestWithSocket) => create(req.body, req.io)),
);

export default router;
