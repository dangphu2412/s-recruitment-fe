import { MenuItem } from '../clients/menu.api';
import { authorizedHttpClient } from '../../system/infrastructure/factories/http-client.factories';

export const menuApiClient = {
  getMenus(): Promise<MenuItem[]> {
    return authorizedHttpClient.request<MenuItem[]>({
      method: 'get',
      url: '/menus'
    });
  }
};
