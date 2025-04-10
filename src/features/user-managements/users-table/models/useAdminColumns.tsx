import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { UserOverviewAction } from '../ui/UsersOverviewTable/Cell/UserOverviewAction';
import { UsernameCell } from '../ui/UsersOverviewTable/Cell/UsernameCell';
import { RoleCell } from '../ui/UsersOverviewTable/Cell/RoleCell';
import { StatusCell } from '../ui/UsersOverviewTable/Cell/StatusCell';
import { OperationFee } from '../../../../entities/monthly-money/models';
import { Role } from '../../../../entities/user/api';
import {
  QUERY_USERS_KEY,
  useUserStore
} from '../../../../entities/user/models';
import { Box, Tag } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { formatDate } from '../../../../shared/models/utils/date.utils';
import { createColumnHelper } from '@tanstack/table-core';
import { CommonData } from '../../../../entities/user/api/user-master-data-api-client';

export type UserManagementView = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  createdAt: string;
  joinedAt: string;
  deletedAt: string;
  operationFee?: OperationFee;
  remainMonths: number;
  paidMonths: number;
  debtMonths: number;
  isProbation: boolean;
  department: CommonData;
  roles: Role[];
};

const columnHelper = createColumnHelper<UserManagementView>();

export function useAdminColumns() {
  const { push } = useRouter();
  const setSelectedPaymentUserId = useUserStore(
    user => user.setSelectedPaymentUserId
  );
  const queryClient = useQueryClient();

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries(QUERY_USERS_KEY);
  }, [queryClient]);

  return useMemo(
    () => [
      columnHelper.accessor('deletedAt', {
        header: 'Status',
        cell: props => (
          <StatusCell
            key={props.row.id}
            {...props}
            onSwitchFinish={handleRefresh}
          />
        ),
        enableSorting: false
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        cell: UsernameCell
      }),
      columnHelper.accessor('fullName', {
        header: 'Full Name'
      }),
      columnHelper.accessor('debtMonths', {
        header: 'Debt Months',
        cell: props => {
          if (props.row.original.isProbation) {
            return <Tag>Probation</Tag>;
          }

          if (props.getValue() > 0) {
            return <Box color="red">-{props.getValue()}</Box>;
          }

          return <Box color="green">+{Math.abs(props.getValue())}</Box>;
        }
      }),
      columnHelper.accessor('paidMonths', {
        header: 'Paid Months',
        cell: props => {
          if (props.row.original.isProbation) {
            return <Tag>Probation</Tag>;
          }

          return <>{props.getValue()}</>;
        }
      }),
      columnHelper.accessor('remainMonths', {
        header: 'Remain Months',
        cell: props => {
          if (props.row.original.isProbation) {
            return <Tag>Probation</Tag>;
          }

          return <>{props.getValue()}</>;
        }
      }),
      columnHelper.accessor('joinedAt', {
        header: 'Joined At',
        cell: props => <>{formatDate(props.getValue())}</>
      }),
      columnHelper.accessor('roles', {
        header: 'Roles',
        cell: RoleCell
      }),
      columnHelper.accessor('department.name', {
        header: 'Department'
      }),
      columnHelper.display({
        header: 'Actions',
        cell: props => (
          <UserOverviewAction
            {...props}
            push={push}
            onPaymentClick={id => setSelectedPaymentUserId(id)}
          />
        )
      })
    ],
    [setSelectedPaymentUserId, handleRefresh, push]
  );
}
