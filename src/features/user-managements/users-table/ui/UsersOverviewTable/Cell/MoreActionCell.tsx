import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { CellProps } from 'react-table';
import styles from './Cell.module.scss';
import { Router } from 'next/router';
import { UserManagementView } from '../../../models/useAdminColumns';

type MoreActionCellProps = CellProps<UserManagementView, string> &
  Pick<Router, 'push'> & {
    onPaymentClick?: (id: string) => void;
  };

type ActionOnUserItem = {
  key: string;
  content: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function MoreActionCell({
  row,
  push,
  onPaymentClick
}: MoreActionCellProps): React.ReactElement {
  function getActions(): ActionOnUserItem[] {
    const actions: ActionOnUserItem[] = [];
    if (!row.original.isProbation) {
      actions.push({
        key: `UPDATE_ROLE_KEY${row.original.id}`,
        content: 'Manage role',
        onClick: () => push(`/users/${row.original.id}/role-settings`)
      });
      actions.push({
        key: `MANAGE_PAID_KEY${row.original.id}`,
        content: 'Manage payment',
        onClick: () => {
          onPaymentClick?.(row.original.id);
        }
      });
    }

    actions.push({
      key: `GO_TO_DETAIL${row.original.id}`,
      content: 'Go to detail',
      onClick: () => {
        push(`/users/${row.original.id}/profile`);
      }
    });
    return actions;
  }

  return (
    <Menu>
      <MenuButton className={styles['cell-more-option']} cursor="pointer">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </MenuButton>
      <MenuList>
        {getActions().map(item => (
          <MenuItem key={item.key} onClick={item.onClick}>
            {item.content}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
