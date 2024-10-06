import { useMutation, useQuery } from 'react-query';
import { authorizedHttpClient } from '../../shared/api';

type Domain = {
  id: string;
  name: string;
  code: string;
  description: string;
};

type SaveDomainInputs = {
  name: string;
  description: string;
};

enum CommonCodes {
  DOMAIN = 'SG0001',
  PERIOD = 'SG0002'
}

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
  return useMasterData<Domain[]>(CommonCodes.DOMAIN);
}

export function usePeriods() {
  return useMasterData<Domain[]>(CommonCodes.PERIOD);
}

export function useMutateCommon(code: string) {
  return useMutation({
    mutationKey: ['master-data', code],
    mutationFn: async (inputs: SaveDomainInputs) => {
      return authorizedHttpClient.request<SaveDomainInputs>({
        url: `/master-data/${code}`,
        method: 'post',
        data: {
          ...inputs
        }
      });
    }
  });
}

export function useMutatePeriod() {
  return useMutateCommon(CommonCodes.PERIOD);
}
