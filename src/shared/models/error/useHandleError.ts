import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import {
  ClientErrorCode,
  ErrorMessageManager
} from '../../config/constants/client-code';
import { useCallback } from 'react';
import { HttpError } from '../http-client';
import { useNotify } from '../notify';

export interface AppError {
  clientCode: string;
  message: string;
}
export type ErrorHandler = (error: unknown) => void;

function mapToAppError(error: AxiosError): AppError {
  if (!HttpError.isHttpError(error)) {
    return {
      clientCode: ClientErrorCode.UN_HANDLE_ERROR_CLIENT,
      message: 'Please contact admin to troubleshoot the issue'
    };
  }

  return {
    clientCode: error.code,
    message:
      ErrorMessageManager.get(error.code) ??
      'Please contact admin to troubleshoot the issue'
  };
}

type ErrorHandlerProps = {
  onHandleClientError?: (error: AppError) => void;
};

export function useHandleError({
  onHandleClientError
}: ErrorHandlerProps = {}) {
  const { push } = useRouter();
  const showToast = useNotify();

  return useCallback(
    (error: any) => {
      const { clientCode, message } = mapToAppError(error);

      switch (clientCode) {
        case AxiosError.ERR_NETWORK:
        case ClientErrorCode.MAINTENANCE:
          push('/500');
          break;
        case ClientErrorCode.INVALID_TOKEN_FORMAT:
        case ClientErrorCode.LOGOUT_REQUIRED:
        case ClientErrorCode.UNAUTHORIZED:
          push('/logout');
          break;
        case ClientErrorCode.FORBIDDEN:
          showToast({
            title: '403 Access Denied',
            status: 'error',
            description: message
          });
          break;
        default:
          if (onHandleClientError) {
            onHandleClientError({ clientCode, message });
            return;
          }

          showToast({
            title: 'Error',
            status: 'error',
            description: message
          });
          break;
      }
    },
    [onHandleClientError, push, showToast]
  );
}
