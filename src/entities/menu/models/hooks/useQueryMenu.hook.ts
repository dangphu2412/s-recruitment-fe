import { useQuery } from 'react-query';
import { menuApiClient } from '../../api/menu-api.client';

export function useQueryMenu() {
  const { data } = useQuery({
    queryFn: menuApiClient.getMenus,
    queryKey: 'MENU'
  });

  return { menus: data };
}
