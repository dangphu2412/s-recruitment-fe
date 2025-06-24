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
  function renderSortSection() {
    if (!column.getCanSort()) {
      return null;
    }

    return (
      <>
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
      </>
    );
  }

  function renderPinSection() {
    if (!column.getCanPin()) {
      return null;
    }

    return (
      <>
        <MenuItem onClick={() => column.pin('right')}>Pin right</MenuItem>
        <MenuItem onClick={() => column.pin('left')}>Pin left</MenuItem>
        <MenuItem onClick={() => column.pin(false)}>Unpin</MenuItem>
        <Divider />
      </>
    );
  }

  function renderHideSection() {
    if (!column.getCanHide()) {
      return null;
    }

    return (
      <>
        <MenuItem onClick={column.getToggleVisibilityHandler()}>
          {column.getIsVisible() ? 'Hide column' : 'Show column'}
        </MenuItem>
        <Divider />
      </>
    );
  }

  function renderGroupBySection() {
    if (!column.getCanGroup()) {
      return null;
    }

    return (
      <>
        <MenuItem onClick={column.getToggleGroupingHandler()}>
          {column.getIsGrouped() ? 'Remove group' : 'Group'}
        </MenuItem>
        <Divider />
      </>
    );
  }

  if (!column.getCanSort() && !column.getCanPin() && !column.getCanHide()) {
    return null;
  }

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
          {renderSortSection()}
          {renderPinSection()}
          {renderHideSection()}
          {renderGroupBySection()}
        </MenuList>
      </Portal>
    </Menu>
  );
}
