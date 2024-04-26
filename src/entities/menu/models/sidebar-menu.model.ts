import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCake, faHome, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { menuApiClient, MenuItem } from '../api';
import { useQuery } from 'react-query';

export type SidebarMenu = SidebarMenuItem[];

export type SidebarMenuItem = {
  id: string;
  name: string;
  accessLink?: string;
  icon: IconDefinition | undefined;
  subMenus: SidebarMenuItem[] | undefined;
};

const IconKeyByCode: Record<string, IconDefinition> = {
  USER_MANAGEMENT_ICON: faCake,
  CATEGORY_ICON: faHome,
  RECRUITMENT_ICON: faSuitcase
};

export function mapMenuItemToSidebarMenus(
  menuItems: MenuItem[] | undefined
): SidebarMenu {
  if (!menuItems) {
    return [];
  }

  return menuItems.map(({ iconCode, subMenus, ...item }: MenuItem) => {
    return {
      ...item,
      icon: iconCode ? IconKeyByCode[iconCode] : undefined,
      subMenus: mapMenuItemToSidebarMenus(subMenus)
    };
  });
}

export function useQueryMenu() {
  const { data } = useQuery({
    queryFn: menuApiClient.getMenus,
    queryKey: 'MENU'
  });

  return { menus: data };
}
