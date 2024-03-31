import { CellProps, Column } from 'react-table';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { UserManagementView } from '../../../models/user/user.type';
import { StatusCell } from '../../../ui/components/AdminTable/Cell/StatusCell';
import { UsernameCell } from '../../../ui/components/AdminTable/Cell/UsernameCell';
import { MoreActionCell } from '../../../ui/components/AdminTable/Cell/MoreActionCell';
import { useRouter } from 'next/router';
import { PaidCell } from '../../../ui/components/AdminTable/Cell/PaidCell';
import { RoleCell } from '../../../ui/components/AdminTable/Cell/RoleCell';

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
