import { AppRoute } from 'common/enums';

const replaceIdParam = (route: AppRoute, id: number): AppRoute =>
  route.replace(':roomId', String(id)) as AppRoute;

export { replaceIdParam };
