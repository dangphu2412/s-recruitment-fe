import { useUserRequestsColumns } from '../../models/useUserRequestsColumns';
import { useActivityRequests } from '../../../../../entities/activities/models/activity-request.model';
import React, { useMemo } from 'react';
import { Table } from '../../../../../shared/ui/Table/Table';
import {
  ColumnSort,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
// import { Button } from '@chakra-ui/react';

export function UserRequestsTable() {
  const { data, isFetching } = useActivityRequests();
  const items = useMemo(() => data?.items ?? [], [data]);
  const columns = useUserRequestsColumns();
  const [sorting, setSorting] = React.useState<ColumnSort[]>([]);

  const table = useReactTable({
    columns,
    state: { sorting },
    initialState: {
      columnPinning: {
        right: ['approvalStatus', 'Actions']
      }
    },
    onSortingChange: setSorting,
    data: items,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  // function handleApprovalAll() {
  //   const rowIds = table.getSelectedRowModel().rows.map(row => row.original.id);
  //   alert(rowIds.toString());
  // }

  return (
    <>
      {/*<div className={'flex justify-end'}>*/}
      {/*  <Button colorScheme={'teal'} onClick={handleApprovalAll}>*/}
      {/*    Approve*/}
      {/*  </Button>*/}
      {/*</div>*/}

      <Table table={table} items={items} isLoading={isFetching} />
    </>
  );
}
