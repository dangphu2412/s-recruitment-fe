import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBook,
  faUser,
  faHome,
  faSuitcase,
  faMask,
  faCodePullRequest
} from '@fortawesome/free-solid-svg-icons';
import { menuApiClient, MenuItem } from '../api';
import { useQuery } from 'react-query';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createStoreModel } from '../../../shared/models/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';

export type SidebarMenu = SidebarMenuItem[];

export type SidebarMenuItem = {
  id: string;
  name: string;
  accessLink?: string;
  icon: IconDefinition | undefined;
  subMenus: SidebarMenuItem[] | undefined;
};

const IconKeyByCode: Record<string, IconDefinition> = {
  USER_MANAGEMENT_ICON: faUser,
  CATEGORY_ICON: faHome,
  RECRUITMENT_ICON: faSuitcase,
  POST_ICON: faBook,
  MASTER_ICON: faMask,
  ACTIVITY_MANAGEMENT_ICON: faCodePullRequest
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

type SyncParamsToMenuProps = {
  menus: SidebarMenu;
};

export function useSyncParamsToMenu({ menus }: SyncParamsToMenuProps) {
  const { pathname } = useRouter();
  const flattenItems = React.useMemo(() => {
    return menus.reduce((acc, item) => {
      acc.push(item);

      if (item.subMenus) {
        acc.push(...item.subMenus);
      }

      return acc;
    }, [] as SidebarMenu);
  }, [menus]);
  const dispatch = useDispatch();

  useEffect(() => {
    const found = flattenItems.find(item => item.accessLink === pathname);

    if (found) {
      dispatch(menuActions.setCurrentMenu(found));
    }
  }, [dispatch, flattenItems, pathname]);
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
