import React, { ReactNode } from 'react';
import { Router } from 'next/router';
import { UserManagementView } from '../../../models/useAdminColumns';
import { MoreActionCell } from '../../../../../../shared/ui/Table/Cell/MoreActionCell';
import { CellContext } from '@tanstack/table-core';

type MoreActionCellProps = CellContext<UserManagementView, unknown> &
  Pick<Router, 'push'> & {
    onPaymentClick?: (id: string) => void;
  };

type ActionOnUserItem = {
  key: string;
  content: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function UserOverviewAction({
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

  return <MoreActionCell renderActions={getActions} />;
}
