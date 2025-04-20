import React, { ReactElement } from 'react';
import { useAdminColumns } from '../../models/useAdminColumns';
import { EMPTY_ARRAY } from '../../../../../shared/config';
import { useUserOverview } from '../../../../../entities/user/models';
import { Table } from '../../../../../shared/ui/Table/Table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { StepIds } from '../../../user-guide/user-management-guide';

export function UsersOverviewTable(): ReactElement {
  const { data, isFetching } = useUserOverview();
  const columns = useAdminColumns();

  const table = useReactTable({
    columns,
    initialState: {
      columnPinning: {
        right: ['Actions']
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
