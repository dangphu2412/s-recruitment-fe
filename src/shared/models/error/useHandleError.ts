import { useCallback, useRef } from 'react';
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
  const refHandleError = useRef<
    ErrorHandlerProps['onHandleClientError'] | null
  >(null);

  if (onHandleClientError !== refHandleError.current) {
    refHandleError.current = onHandleClientError;
  }

  return useCallback(
    (error: any) => {
      if (HttpError.isHttpError(error)) {
        if (error.status === '403') {
          showToast({
            title: '403 Access Denied',
            status: 'error',
            description: error.message
          });
          return;
        }

        if (error.status === '500') {
          showToast({
            title: 'Internal Server Error',
            status: 'error',
            description: error.message
          });
          return;
        }
      }

      if (refHandleError?.current) {
        refHandleError.current(error);
        return;
      }

      showToast({
        title: 'Unhandled Client Error',
        status: 'error',
        description: error.message
      });
    },
    [showToast]
  );
}
