import { CellProps, Column } from 'react-table';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { MoreActionCell } from '../ui/UsersOverviewTable/Cell/MoreActionCell';
import { UsernameCell } from '../ui/UsersOverviewTable/Cell/UsernameCell';
import { PaidCell } from '../ui/UsersOverviewTable/Cell/PaidCell';
import { RoleCell } from '../ui/UsersOverviewTable/Cell/RoleCell';
import { StatusCell } from '../ui/UsersOverviewTable/Cell/StatusCell';
import { OperationFee } from '../../../../entities/monthly-money/models';
import { Role } from '../../../../entities/user/api';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../entities/user/models';

export type UserManagementView = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  deletedAt: string;
  operationFee?: OperationFee;
  remainMonths: number;
  paidMonths: number;
  roles: Role[];
};

export function useAdminColumns(): Column<UserManagementView>[] {
  const { push } = useRouter();
  const dispatch = useDispatch();

  return useMemo(
    () => [
      {
        Header: 'Username',
        accessor: 'username',
        Cell: UsernameCell
      },
      {
        Header: 'Employed At',
        accessor: row => format(new Date(row.createdAt), 'dd/MM/yyyy')
      },
      {
        Header: 'Paid Months',
        accessor: 'paidMonths'
      },
      {
        Header: 'Remain Months',
        accessor: 'remainMonths'
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: RoleCell
      },
      {
        Header: 'Status',
        accessor: 'deletedAt',
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        Cell: (props: CellProps<UserManagementView, string>) => (
          <MoreActionCell
            key={props.row.id}
            {...props}
            push={push}
            onPaymentClick={id =>
              dispatch(userActions.setSelectedPaymentUserId(id))
            }
          />
        )
      }
    ],
    [dispatch, push]
  );
}
