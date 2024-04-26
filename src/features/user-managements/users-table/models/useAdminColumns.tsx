import { CellProps, Column } from 'react-table';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { UserManagementView } from '../../../../entities/user/models/user/user.type';
import { useRouter } from 'next/router';
import { MoreActionCell } from '../ui/UsersOverviewTable/Cell/MoreActionCell';
import { UsernameCell } from '../ui/UsersOverviewTable/Cell/UsernameCell';
import { PaidCell } from '../ui/UsersOverviewTable/Cell/PaidCell';
import { RoleCell } from '../ui/UsersOverviewTable/Cell/RoleCell';
import { StatusCell } from '../ui/UsersOverviewTable/Cell/StatusCell';

export function useAdminColumns(): Column<UserManagementView>[] {
  const { push } = useRouter();

  return useMemo(
    () => [
      {
        Header: 'Username',
        accessor: 'username',
        Cell: UsernameCell
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Employed At',
        accessor: row => format(new Date(row.createdAt), 'dd/MM/yyyy')
      },
      {
        Header: 'Paid',
        Cell: PaidCell
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
          <MoreActionCell key={props.row.id} {...props} push={push} />
        )
      }
    ],
    [push]
  );
}
