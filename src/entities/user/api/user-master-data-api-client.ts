import { authorizedHttpClient } from 'src/shared/api/factories/http-client.factories';
import { Page } from 'src/shared/pagination/offset-paging';

export type CommonData = {
  id: string;
  name: string;
  description: string;
};

export const userMasterDataApiClient = {
  getDepartments: async () => {
    return authorizedHttpClient.request<Page<CommonData>>({
      url: '/departments',
      method: 'get'
    });
  },
  createDepartment: async (data: Omit<CommonData, 'id'>) => {
    return authorizedHttpClient.request<void>({
      url: '/departments',
      method: 'post',
      data
    });
  },
  getPeriods: async () => {
    return authorizedHttpClient.request<Page<CommonData>>({
      url: '/periods',
      method: 'get'
    });
  },
  createPeriod: async (data: Omit<CommonData, 'id'>) => {
    return authorizedHttpClient.request<void>({
      url: '/periods',
      method: 'post',
      data
    });
  }
};
