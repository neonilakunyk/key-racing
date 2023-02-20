import { ContentType, HttpMethod } from 'common/enums';

type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: BodyInit | null;
  queryParams: Record<string, unknown>;
};

export type { HttpOptions };
