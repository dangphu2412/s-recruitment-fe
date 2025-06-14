import { useCallback } from 'react';
import { HttpError } from '../http-client';
import { useNotify } from '../notify';

export interface AppError {
  clientCode: string;
  message: string;
}
export type ErrorHandler = (error: unknown) => void;

type ErrorHandlerProps = {
  onHandleClientError?: (error: Error | HttpError) => void;
};

export function useHandleError({
  onHandleClientError
}: ErrorHandlerProps = {}) {
  const showToast = useNotify();

  return useCallback(
    (error: any) => {
      if (onHandleClientError) {
        onHandleClientError(error);
        return;
      }

      if (HttpError.isHttpError(error)) {
        if (error.status === '403') {
          showToast({
            title: '403 Access Denied',
            status: 'error',
            description: error.message
          });
        }
      }

      showToast({
        title: 'Internal Server Error',
        status: 'error',
        description: error.message
      });
    },
    [onHandleClientError, showToast]
  );
}
