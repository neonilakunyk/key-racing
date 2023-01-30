enum HttpErrorMessage {
  NO_SUCH_EMAIL = 'That address is either invalid or is not associated with a user account',
  EMAIL_ALREADY_EXISTS = 'User with such email already exists',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  INVALID_TOKEN = 'Invalid token',
  UNAUTHORIZED = 'Unauthorized',
  NO_ROOM_WITH_SUCH_ID = 'Room with such id does not exist',
  ROOM_ALREADY_EXISTS = 'Room with such name already exists',
  NO_ROOM_ACCESS = 'You have no access to this room',
  INVALID_LOGIN_DATA = 'Incorrect email or password',
  INVALID_FILE_TYPE = 'Invalid file type',
}

export { HttpErrorMessage };
