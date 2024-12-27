import { Column } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import {
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal
} from '@chakra-ui/react';

type Props<T> = {
  column: Column<T, any>;
};

export function MoreAction<T>({ column }: Props<T>) {
  return (
    <Menu>
      <MenuButton
        className={
          'cursor-pointer rounded-full hover:bg-slate-200 user-select-none w-6 h-6'
        }
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </MenuButton>

      <Portal>
        <MenuList>
          {column.getIsSorted() && (
            <MenuItem onClick={column.clearSorting}>Clear sort</MenuItem>
          )}
          {column.getIsSorted() !== 'asc' && (
            <MenuItem onClick={() => column.toggleSorting(false)}>
              Sort by ascending
            </MenuItem>
          )}
          {column.getIsSorted() !== 'desc' && (
            <MenuItem onClick={() => column.toggleSorting(true)}>
              Sort by descending
            </MenuItem>
          )}
          <Divider />
          <MenuItem onClick={() => column.pin('right')}>Pin right</MenuItem>
          <MenuItem onClick={() => column.pin('left')}>Pin left</MenuItem>
          <MenuItem onClick={() => column.pin(false)}>Unpin</MenuItem>
          <Divider />
          <MenuItem onClick={column.getToggleVisibilityHandler()}>
            {column.getCanHide() ? 'Hide column' : 'Show column'}
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
}
