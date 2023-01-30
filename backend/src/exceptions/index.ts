import { HttpCode } from '../common/enums';

const DEFAULT_MESSAGE = 'Network Error';

enum CustomExceptionName {
  HTTP_ERROR = 'HttpError',
}

class HttpError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
    this.name = CustomExceptionName.HTTP_ERROR;
  }
}

export { HttpError };

