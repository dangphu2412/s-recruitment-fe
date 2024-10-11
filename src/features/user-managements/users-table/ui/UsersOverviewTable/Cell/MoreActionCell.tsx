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
  const actionItems: ActionOnUserItem[] = [
    {
      key: `UPDATE_ROLE_KEY${row.original.id}`,
      content: 'Update role',
      onClick: () => push(`/users/${row.original.id}/role-settings`)
    },
    {
      key: `MANAGE_PAID_KEY${row.original.id}`,
      content: 'Manage payment',
      onClick: () => {
        onPaymentClick?.(row.original.id);
      }
    }
  ];

  return (
    <Menu>
      <MenuButton className={styles['cell-more-option']} cursor="pointer">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </MenuButton>
      <MenuList>
        {actionItems.map(item => (
          <MenuItem key={item.key} onClick={item.onClick}>
            {item.content}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
