import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import {
  ClientErrorCode,
  ErrorMessageManager
} from '../../../domain/constants/client-code';
import { useNotify } from 'src/system/app/internal/hooks/useNotify';
import { useCallback } from 'react';
import { HttpError } from '../../external/http-client';

export interface AppError {
  clientCode: string;
  message: string;
}

function transformToAppError(error: AxiosError): AppError {
  if (!HttpError.isHttpError(error)) {
    return {
      clientCode: ClientErrorCode.UN_HANDLE_ERROR_CLIENT,
      message: 'System is getting some problem'
    };
  }

  return {
    clientCode: error.code,
    message:
      ErrorMessageManager.get(error.code) ?? 'System is getting some problem'
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
      const { clientCode, message } = transformToAppError(error);

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
          push('/403');
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
