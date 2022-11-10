import { useQuery } from 'react-query';
import { useErrorHandler } from '@modules/error-handling/useErrorHandler';
import { MenuApiClient } from '../services/menu-api.client';

export function useQueryMenu() {
  const { handle } = useErrorHandler();

  return useQuery({
    queryFn: MenuApiClient.getMenus,
    queryKey: 'MENU',
    retry: false,
    onError: handle
  });
}
