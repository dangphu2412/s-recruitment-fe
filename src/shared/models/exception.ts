import { useCallback, useRef } from 'react';
import { useNotify } from './notify';
import { AxiosError, AxiosResponse, default as AxiosStatic } from 'axios';
import { useRouter } from 'next/router';
import { HttpStatus } from './http-client';

export type ErrorHandler = (error: unknown) => void;

type BusinessExceptionContext = {
  statusCode: string;
  message: string;
  timestamp: string;
  path: string;
  businessCode: string;
};

type ErrorHandlerProps = {
  onBusinessExceptionCapture?: (error: Error) => void;
};

export function isBusinessException(
  error: unknown
): error is AxiosError<BusinessExceptionContext> {
  return !!(
    (error as AxiosError).response as AxiosResponse<BusinessExceptionContext>
  )?.data?.businessCode;
}
const IAM_LOGOUT_REQUIRED = 'IAM_REGISTRATION_LOGOUT' as const;

export function useExceptionHandler({
  onBusinessExceptionCapture
}: ErrorHandlerProps = {}) {
  const showToast = useNotify();
  const router = useRouter();
  const handleBusinessExceptionRef = useRef<
    ErrorHandlerProps['onBusinessExceptionCapture'] | null
  >(null);

  if (onBusinessExceptionCapture !== handleBusinessExceptionRef.current) {
    handleBusinessExceptionRef.current = onBusinessExceptionCapture;
  }

  return useCallback(
    (error: any) => {
      if (!AxiosStatic.isAxiosError(error)) {
        return;
      }

      if (AxiosError.ERR_NETWORK === error.code) {
        showToast({
          title: 'Network Error',
          status: 'error'
        });
        router.push('/login');
        return;
      }

      if (HttpStatus.UNAUTHORIZED === error.response?.status) {
        return;
      }

      if (HttpStatus.ACCESS_DENIED === error.response?.status) {
        showToast({
          title: 'You cannot access to this resource',
          status: 'error',
          description: error.message
        });
        return;
      }

      if (HttpStatus.NOT_FOUND === error.response?.status) {
        router.push('/404');
        return;
      }

      if (isBusinessException(error)) {
        if (handleBusinessExceptionRef?.current) {
          handleBusinessExceptionRef.current(error);
          return;
        }

        if (IAM_LOGOUT_REQUIRED === error.response?.data?.businessCode) {
          router.push('/logout');
          return;
        }
      }

      showToast({
        title: 'System is troubleshooting error.',
        status: 'error',
        description: 'Please contact administrator dangphu241299@gmail.com'
      });
    },
    [router, showToast]
  );
}
