import { useQuery } from 'react-query';
import {
  CommonData,
  userMasterDataApiClient
} from '../api/user-master-data-api-client';

export function useDepartments() {
  const { data } = useQuery({
    queryKey: ['departments'],
    queryFn: userMasterDataApiClient.getDepartments
  });

  return {
    data: data?.items ?? ([] as CommonData[])
  };
}

export function usePeriods() {
  const { data } = useQuery({
    queryKey: ['periods'],
    queryFn: userMasterDataApiClient.getPeriods
  });

  return {
    data: data?.items ?? ([] as CommonData[])
  };
}
