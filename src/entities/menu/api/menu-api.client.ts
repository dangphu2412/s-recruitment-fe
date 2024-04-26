import { authorizedHttpClient } from '../../../shared/api/factories/http-client.factories';

export type MenuItem = {
  id: string;
  name: string;
  accessLink?: string;
  iconCode?: string;
  subMenus?: MenuItem[];
};

export const menuApiClient = {
  getMenus(): Promise<MenuItem[]> {
    return authorizedHttpClient.request<MenuItem[]>({
      method: 'get',
      url: '/menus'
    });
  }
};
