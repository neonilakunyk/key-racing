import { AppRoute } from 'common/enums/enums';

const replaceIdParam = (route: AppRoute, id: string): string =>
  route.replace(':roomId', id);

export { replaceIdParam };
