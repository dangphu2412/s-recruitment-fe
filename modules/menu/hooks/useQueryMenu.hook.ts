import { useAppQuery } from '@modules/shared/hooks/useAppQuery';
import { MenuApiClient } from '../services/menu-api.client';

export function useQueryMenu() {
  return useAppQuery({
    queryFn: MenuApiClient.getMenus,
    queryKey: 'MENU'
  });
}
