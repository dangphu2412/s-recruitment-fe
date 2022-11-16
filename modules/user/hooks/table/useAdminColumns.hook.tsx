import { Column } from 'react-table';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { UserManagementView } from '../../models/user.type';
import { StatusCell } from '../../components/AdminTable/Cell/StatusCell';
import { UsernameCell } from '../../components/AdminTable/Cell/UsernameCell';
import { MoreActionCell } from '../../components/AdminTable/Cell/MoreActionCell';

export function useAdminColumns(): Column<UserManagementView>[] {
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
        accessor: row =>
          row?.operationFee ? row?.operationFee?.paidMoney : 'Not start'
      },
      {
        Header: 'Status',
        accessor: 'deletedAt',
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        Cell: MoreActionCell
      }
    ],
    []
  );
}
