import { useMutation, useQuery } from 'react-query';
import { authorizedHttpClient } from '../../shared/api';

export type CommonData = {
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
  DEPARTMENTS = 'SG0001',
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

export function useDepartments() {
  return useMasterData<CommonData[]>(CommonCodes.DEPARTMENTS);
}

export function usePeriods() {
  return useMasterData<CommonData[]>(CommonCodes.PERIOD);
}

export function getPeriodKey() {
  return ['master-data', CommonCodes.PERIOD];
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
