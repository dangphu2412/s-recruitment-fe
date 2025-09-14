import React from 'react';
import { Router } from 'next/router';
import { UserManagementView } from '../../../models/useUserManagementColumns';
import { CellContext } from '@tanstack/table-core';
import { faMoneyBill, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MoreActionCellProps = CellContext<UserManagementView, unknown> &
  Pick<Router, 'push'> & {
    onPaymentClick?: (id: string) => void;
  };

export function UserOverviewAction({
  row,
  push,
  onPaymentClick
}: MoreActionCellProps): React.ReactElement {
  return (
    <div className={'flex gap-4'}>
      {!row.original.isProbation && (
        <FontAwesomeIcon
          className={'text-green-700 cursor-pointer hover:text-green-500'}
          icon={faMoneyBill}
          onClick={() => {
            onPaymentClick?.(row.original.id);
          }}
        />
      )}
      <FontAwesomeIcon
        className={'text-blueGray-700 cursor-pointer hover:text-blueGray-500'}
        icon={faPencil}
        onClick={() => {
          push(`/users/${row.original.id}/profile`);
        }}
      />
    </div>
  );
}
