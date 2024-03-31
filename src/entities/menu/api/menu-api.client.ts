import { MenuItem } from '../models/menu.api';
import { authorizedHttpClient } from '../../../shared/api/factories/http-client.factories';

export const menuApiClient = {
  getMenus(): Promise<MenuItem[]> {
    return authorizedHttpClient.request<MenuItem[]>({
      method: 'get',
      url: '/menus'
    });
  }
};
