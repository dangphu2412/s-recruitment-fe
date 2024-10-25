import { CellProps, Column } from 'react-table';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { UserOverviewAction } from '../ui/UsersOverviewTable/Cell/UserOverviewAction';
import { UsernameCell } from '../ui/UsersOverviewTable/Cell/UsernameCell';
import { RoleCell } from '../ui/UsersOverviewTable/Cell/RoleCell';
import { StatusCell } from '../ui/UsersOverviewTable/Cell/StatusCell';
import { OperationFee } from '../../../../entities/monthly-money/models';
import { Role } from '../../../../entities/user/api';
import { useDispatch } from 'react-redux';
import { QUERY_USERS_KEY, userActions } from '../../../../entities/user/models';
import { Box, Tag } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { formatDate } from '../../../../shared/models/utils/date.utils';
import { CommonData } from '../../../../entities/master-data/useMasteData';

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
  domain: CommonData;
  roles: Role[];
};

export function useAdminColumns(): Column<UserManagementView>[] {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries(QUERY_USERS_KEY);
  }, [queryClient]);

  return useMemo(
    () => [
      {
        Header: 'Username',
        accessor: 'username',
        Cell: UsernameCell
      },
      {
        Header: 'Full Name',
        accessor: 'fullName'
      },
      {
        Header: 'Debt Months',
        accessor: 'debtMonths',
        Cell: props => {
          if (props.row.original.isProbation) {
            return <Tag>Probation</Tag>;
          }

          if (props.value > 0) {
            return <Box color="red">-{props.value}</Box>;
          }

          return <Box color="green">+{Math.abs(props.value)}</Box>;
        }
      },
      {
        Header: 'Paid Months',
        accessor: 'paidMonths',
        Cell: props => {
          if (props.row.original.isProbation) {
            return <Tag>Probation</Tag>;
          }

          return <>{props.value}</>;
        }
      },
      {
        Header: 'Remain Months',
        accessor: 'remainMonths',
        Cell: props => {
          if (props.row.original.isProbation) {
            return <Tag>Probation</Tag>;
          }

          return <>{props.value}</>;
        }
      },
      {
        Header: 'Joined At',
        accessor: 'joinedAt',
        Cell: props => <>{formatDate(new Date(props.row.original.joinedAt))}</>
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: RoleCell
      },
      {
        Header: 'Domain',
        accessor: 'domain',
        Cell: props => <>{props.value?.name}</>
      },
      {
        Header: 'Status',
        accessor: 'deletedAt',
        Cell: props => (
          <StatusCell
            key={props.row.id}
            {...props}
            onSwitchFinish={handleRefresh}
          />
        )
      },
      {
        Header: 'Actions',
        Cell: (props: CellProps<UserManagementView, string>) => (
          <UserOverviewAction
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
    [dispatch, handleRefresh, push]
  );
}
