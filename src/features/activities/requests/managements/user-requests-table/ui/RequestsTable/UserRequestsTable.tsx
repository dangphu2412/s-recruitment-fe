import { useUserRequestsColumns } from '../../models/useUserRequestsColumns';
import {
  useActivityRequests,
  useUpdateApprovalActivityRequestMutation
} from '../../../../../../../entities/activities/models/activity-request.model';
import React, { useMemo } from 'react';
import { Table } from '../../../../../../../shared/ui/Table/Table';
import {
  ColumnSort,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button, Portal, Text } from '@chakra-ui/react';
import { ApprovalRequestAction } from '../../../../../../../entities/activities/config/constants/request-activity-status.enum';
import { useNotify } from '../../../../../../../shared/notify';

export function UserRequestsTable() {
  const { data, isFetching } = useActivityRequests();
  const items = useMemo(() => data?.items ?? [], [data]);
  const columns = useUserRequestsColumns();
  const { mutate } = useUpdateApprovalActivityRequestMutation();
  const notify = useNotify();
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
  const rowIds = table.getSelectedRowModel().rows.map(row => row.original.id);

  function handleApprovalAll() {
    mutate(
      { ids: rowIds, action: ApprovalRequestAction.APPROVE },
      {
        onSuccess: () => {
          table.setRowSelection(() => ({}));
          notify({
            title: 'Success',
            description: `${rowIds.length} requests has been approved`,
            status: 'success'
          });
        }
      }
    );
  }

  return (
    <>
      {rowIds.length > 0 && (
        <Portal>
          <div
            className={
              'fixed bottom-8 left-[50%] shadow-lg bg-white rounded px-8 py-4'
            }
          >
            <div className={'flex gap-4 items-center'}>
              <Text fontWeight="semibold">
                {rowIds.length}/{data?.metadata.totalRecords} selected
              </Text>

              <Button onClick={handleApprovalAll}>Approve</Button>
            </div>
          </div>
        </Portal>
      )}

      <Table table={table} items={items} isLoading={isFetching} />
    </>
  );
}
