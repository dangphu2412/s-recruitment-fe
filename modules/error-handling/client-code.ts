import { AxiosError } from 'axios';

export const ClientErrorCode = {
  UNAUTHORIZED: '401',
  INCORRECT_USERNAME_OR_PASSWORD: 'AUTH__INCORRECT_USERNAME_OR_PASSWORD',
  MAINTENANCE: 'MAINTENANCE',
  GOT_ISSUE: 'GOT_ISSUE',
  LOGOUT_REQUIRED: 'AUTH__LOGOUT_REQUIRED',
  INVALID_TOKEN_FORMAT: 'AUTH__INVALID_TOKEN_FORMAT',
  UN_HANDLE_ERROR_CLIENT: 'UN_HANDLE_ERROR_CLIENT'
};

export const ErrorMessageManager = new Map([
  [
    `${ClientErrorCode.INCORRECT_USERNAME_OR_PASSWORD}`,
    'Username or password is incorrect'
  ],
  [`${ClientErrorCode.MAINTENANCE}`, 'System is maintenance'],
  [`${ClientErrorCode.GOT_ISSUE}`, 'System is getting some issue'],
  [`${ClientErrorCode.UNAUTHORIZED}`, ''],
  [
    `${ClientErrorCode.LOGOUT_REQUIRED}`,
    'Your session has been expired. You need to log out now'
  ],
  [`${AxiosError.ERR_NETWORK}`, 'There is a network error'],
  [`${AxiosError.ECONNABORTED}`, 'Connection aborted']
]);
