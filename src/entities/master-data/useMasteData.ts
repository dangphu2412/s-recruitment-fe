import { useQuery } from 'react-query';
import { authorizedHttpClient } from '../../shared/api';

type Domain = {
  id: string;
  name: string;
  description: string;
};

export function useMasterData<T>(code: string) {
  return useQuery({
    queryKey: ['master-data', code],
    queryFn: async () => {
      return authorizedHttpClient.request<T>({
        url: `/master-data/${code}`,
        method: 'get'
      });
    }
  });
}

export function useDomains() {
  return useMasterData<Domain[]>('SG0001');
}

export function usePeriods() {
  return useMasterData<Domain[]>('SG0002');
}
