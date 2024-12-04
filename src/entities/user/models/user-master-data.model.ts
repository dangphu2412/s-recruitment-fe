import { useQuery } from 'react-query';
import { authorizedHttpClient } from '../../../shared/api';

export type CommonData = {
  id: string;
  name: string;
  code: string;
  description: string;
};

export function useDepartments() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      return authorizedHttpClient.request<CommonData[]>({
        url: '/departments',
        method: 'get'
      });
    }
  });
}

export function usePeriods() {
  return useQuery({
    queryKey: ['periods'],
    queryFn: async () => {
      return authorizedHttpClient.request<CommonData[]>({
        url: '/periods',
        method: 'get'
      });
    }
  });
}
