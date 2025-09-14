import { createStateContext } from 'react-use';

type SideBarControl = {
  isOpen: boolean;
};
export const [useSidebarController, SideBarController] =
  createStateContext<SideBarControl>({
    isOpen: true
  });
