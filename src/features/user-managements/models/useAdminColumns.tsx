import { CellProps, Column } from 'react-table';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { UserManagementView } from '../../../entities/user/models/user/user.type';
import { useRouter } from 'next/router';
import { UsernameCell } from '../ui/AdminTable/Cell/UsernameCell';
import { PaidCell } from '../ui/AdminTable/Cell/PaidCell';
import { RoleCell } from '../ui/AdminTable/Cell/RoleCell';
import { StatusCell } from '../ui/AdminTable/Cell/StatusCell';
import { MoreActionCell } from '../ui/AdminTable/Cell/MoreActionCell';

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
