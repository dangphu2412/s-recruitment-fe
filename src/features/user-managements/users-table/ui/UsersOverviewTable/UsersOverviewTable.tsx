import React, { ReactElement } from 'react';
import { useUserManagementColumns } from '../../models/useUserManagementColumns';
import { EMPTY_ARRAY } from '../../../../../shared/config';
import { useUserOverview } from '../../../../../entities/user/models';
import { Table } from '../../../../../shared/ui/Table/Table';
import { StepIds } from '../../../user-guide/user-management-guide';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

export function UsersOverviewTable(): ReactElement {
  const { data, isFetching } = useUserOverview();
  const columns = useUserManagementColumns();

  const table = useReactTable({
    columns,
    initialState: {
      columnPinning: {
        right: ['actions']
      }
    },
    data: data?.items ?? EMPTY_ARRAY,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <Table
      id={StepIds.USER_TABLE}
      table={table}
      items={data?.items ?? EMPTY_ARRAY}
      isLoading={isFetching}
    />
  );
}
