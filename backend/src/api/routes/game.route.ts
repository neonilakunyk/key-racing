import { Router } from 'express';
import { IRequestWithSocket } from '../../common/interfaces';
import { run } from '../../common/helpers/route.helper';
import {
  addUser,
  deleteUser,
  getRoomUsers,
  getText,
  deleteText,
  getShareLink,
} from '../../services';

const router: Router = Router();

router.get(
  '/:roomId/text',
  run((req) => getText(req.params.roomId)),
);

router.get(
  '/:roomId/link',
  run((req) => getShareLink(req.params.roomId)),
);

router.put(
  '/delete-text',
  run((req) => deleteText(req.body.roomId)),
);

router.get(
  '/:roomId/users',
  run((req) => getRoomUsers(req.params.roomId)),
);

router.put(
  '/add-user',
  run((req: IRequestWithSocket) => addUser(req.body, req.io)),
);

router.put(
  '/delete-user',
  run((req: IRequestWithSocket) => deleteUser(req.body, req.io)),
);

export default router;
