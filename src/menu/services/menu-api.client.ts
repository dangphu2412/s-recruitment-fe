import { ApiClient } from 'src/system/app/internal/services';
import { MenuItem } from '../clients/menu.api';

export const MenuApiClient = {
  getMenus(): Promise<MenuItem[]> {
    return ApiClient.get<MenuItem[], void>('/menus');
  }
};
