import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCake, faHome, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { menuApiClient, MenuItem } from '../api';
import { useQuery } from 'react-query';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createStoreModel } from '../../../shared/models/store';
import { useRouter } from 'next/router';
import React from 'react';
import isEmpty from 'lodash/isEmpty';

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

export function useMenu() {
  const { push } = useRouter();
  const { menus } = useQueryMenu();

  const items = React.useMemo(() => mapMenuItemToSidebarMenus(menus), [menus]);

  const selectMenu = React.useCallback(
    (item: SidebarMenuItem) => {
      if (item.accessLink && isEmpty(item.subMenus)) {
        push(item.accessLink);
      }
    },
    [push]
  );

  function goToDashboard() {
    push('/');
  }

  return {
    items,
    selectMenu,
    goToDashboard
  };
}

export type MenuDomain = {
  currentMenu: SidebarMenuItem;
};

const menuSlice = createSlice({
  name: 'MenuDomain',
  initialState: {} as MenuDomain,
  reducers: {
    setCurrentMenu(state, action: PayloadAction<SidebarMenuItem>) {
      state.currentMenu = action.payload;
    }
  }
});

export const currentMenuSelector = (state: { MenuDomain: MenuDomain }) =>
  state.MenuDomain.currentMenu;

export const menuActions = menuSlice.actions;

export const menuStorage = createStoreModel('MenuDomain', menuSlice.reducer);
