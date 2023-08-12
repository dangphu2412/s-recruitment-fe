import { QueryClientConfig } from 'react-query/types/core/types';
import { ErrorHandler } from 'src/system/domain/usecases/error.usecase';

type QueryClientAdapter = {
  onError: ErrorHandler;
};

export function getQueryClientConfig({
  onError
}: QueryClientAdapter): QueryClientConfig {
  return {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        refetchOnMount: 'always',
        onError
      },
      mutations: {
        onError,
        retry: false
      }
    }
  };
}
