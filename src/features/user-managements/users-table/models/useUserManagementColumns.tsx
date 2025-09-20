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
import { formatDate } from '../../../../shared/date';
import { createColumnHelper } from '@tanstack/table-core';
import { CommonData } from '../../../../entities/user/api/user-master-data-api-client';
import { useTranslate } from '../../../../shared/translations/translation';

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
  estimatedPaidMonths: number;
  paidMonths: number;
  debtMonths: number;
  isProbation: boolean;
  department: CommonData;
  roles: Role[];
};

const columnHelper = createColumnHelper<UserManagementView>();

export function useUserManagementColumns() {
  const { push } = useRouter();
  const setSelectedPaymentUserId = useUserStore(
    user => user.setSelectedPaymentUserId
  );
  const queryClient = useQueryClient();

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries(QUERY_USERS_KEY);
  }, [queryClient]);
  const { formatMessage } = useTranslate();

  return useMemo(
    () => [
      columnHelper.accessor('deletedAt', {
        header: formatMessage({ id: 'user.table.status' }),
        cell: props => (
          <StatusCell
            key={props.row.id}
            {...props}
            onSwitchFinish={handleRefresh}
          />
        ),
        enableSorting: false,
        size: 100
      }),
      columnHelper.accessor('username', {
        header: formatMessage({ id: 'user.table.username' }),
        cell: UsernameCell
      }),
      columnHelper.accessor('fullName', {
        header: formatMessage({ id: 'user.table.fullName' })
      }),
      columnHelper.accessor('debtMonths', {
        header: formatMessage({ id: 'user.table.debtMonths' }),
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
        header: formatMessage({ id: 'user.table.paidMonths' }),
        cell: props => {
          if (props.row.original.isProbation) {
            return <Tag>Probation</Tag>;
          }

          return (
            <>
              {props.getValue()}/{props.row.original.estimatedPaidMonths}
            </>
          );
        }
      }),
      columnHelper.accessor('joinedAt', {
        header: formatMessage({ id: 'user.table.joinedAt' }),
        cell: props => <>{formatDate(props.getValue())}</>
      }),
      columnHelper.accessor('roles', {
        header: formatMessage({ id: 'user.table.roles' }),
        cell: RoleCell
      }),
      columnHelper.accessor('department.name', {
        header: formatMessage({ id: 'user.table.department' })
      }),
      columnHelper.display({
        id: 'actions',
        header: formatMessage({ id: 'user.table.actions' }),
        cell: props => (
          <UserOverviewAction
            {...props}
            push={push}
            onPaymentClick={id => setSelectedPaymentUserId(id)}
          />
        )
      })
    ],
    [formatMessage, handleRefresh, push, setSelectedPaymentUserId]
  );
}
