import {
  useMutation,
  UseMutationOptions,
  UseMutationResult
} from 'react-query';
import {
  AppError,
  useErrorHandler
} from '@modules/error-handling/useErrorHandler';

export type UseAppMutationResult<
  Response,
  Variable = unknown
> = UseMutationResult<Response, AppError, Variable>;

export type UseAppMutationOptions<
  Response,
  Variable = unknown
> = UseMutationOptions<Response, AppError, Variable>;

export function useAppMutation<Response, Variable = unknown>(
  options: UseAppMutationOptions<Response, Variable> = {}
): UseAppMutationResult<Response, Variable> {
  const { handle } = useErrorHandler();

  return useMutation<Response, AppError, Variable>({
    onError: handle,
    ...options
  });
}
