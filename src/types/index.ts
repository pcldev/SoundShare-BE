const COMMON_ERROR = {
  NotFound: { status: 404, message: 'Not found', type: 'NOT_FOUND' },
  MissingParameter: { status: 422, message: 'Missing parameter', type: 'MISSING_PARAMETER' },
};

const SERVER_ERROR = {
  DefaultError: { status: 500, message: 'Server error', type: 'SERVER_ERROR' },
};

const AUDIO_ERROR = {
  UploadError: { status: 500, message: 'Uploading files error', type: 'FILES_ERROR' },
  ReplaceError: { status: 500, message: 'Replace file error', type: 'FILES_ERROR' },
};

const TODO_ERROR = {
  CreateError: { status: 500, message: 'Create todo error', type: 'TODO_ERROR' },
  DeleteError: { status: 500, message: 'Delete todo error', type: 'TODO_ERROR' },
};

const USER_ERROR = {
  UserExist: { status: 409, message: 'User already exits', type: 'USER_ERROR' },
  UserNotExist: { status: 404, message: 'User not exits', type: 'USER_ERROR' },
  PasswordWrong: { status: 404, message: 'Password is wrong', type: 'USER_ERROR' },
};

const AUTH_ERROR = {
  JwtVerify: { message: 'Auth Error', status: 401, type: 'AUTH_ERROR', redirectUrl: '/' },
  RoleVerify: { message: 'Auth Role Error', status: 401, type: 'AUTH_ERROR', redirectUrl: '/' },
};

export { COMMON_ERROR, SERVER_ERROR, USER_ERROR, AUTH_ERROR, AUDIO_ERROR, TODO_ERROR };
