import { faCake, faHome, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MenuItem } from '../clients/menu.api';
import { SidebarMenu } from '../clients/sidebar-menu.types';

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
