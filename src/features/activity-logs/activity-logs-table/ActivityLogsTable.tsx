import * as React from 'react';
import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { ActivityLogResponse } from '../../../entities/activities/api/activity-log-api.client';
import { LogWorkStatus } from '../../../entities/activities/config/constants/log-work-status.enum';
import { Tag, Text } from '@chakra-ui/react';
import { formatDayOfWeekAndDate } from '../../../shared/models/utils/date.utils';
import {
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { EMPTY_ARRAY } from '../../../shared/config';
import { Table } from '../../../shared/ui/Table/Table';
import { useActivityLogsList } from '../../../entities/activities/models/activity-log.model';

export function ActivityLogsTable() {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ActivityLogResponse>();

    return [
      columnHelper.accessor('workStatus', {
        header: 'Log status',
        cell: props => {
          if (props.row.original.workStatus === LogWorkStatus.LATE) {
            return <Tag colorScheme={'red'}>Late</Tag>;
          }

          if (props.row.original.workStatus === LogWorkStatus.NOT_FINISHED) {
            return <Tag colorScheme={'yellow'}>Not checkout</Tag>;
          }

          return <Tag colorScheme={'green'}>On time</Tag>;
        }
      }),
      columnHelper.accessor('author.email', {
        header: 'Author email',
        cell: props => {
          const value = props.getValue();

          if (!value) {
            return <Tag colorScheme={'gray'}>Not Linked</Tag>;
          }

          return <span>{value}</span>;
        }
      }),
      columnHelper.accessor('deviceAuthor.name', {
        header: 'Fingerprint User Name'
      }),
      columnHelper.accessor('fromTime', {
        header: 'From time',
        cell: ({ getValue, row }) => {
          return (
            <>
              <p>{formatDayOfWeekAndDate(getValue())}</p>
              {row.original.auditedFromTime && (
                <p>
                  <Text fontSize={'sm'} color={'red'} as={'span'}>
                    Audit to:
                  </Text>
                  {formatDayOfWeekAndDate(row.original.auditedFromTime)}
                </p>
              )}
            </>
          );
        }
      }),
      columnHelper.accessor('toTime', {
        header: 'To time',
        cell: ({ getValue, row }) => {
          return (
            <>
              <p>{formatDayOfWeekAndDate(getValue())}</p>
              {row.original.auditedToTime && (
                <p>
                  <Text fontSize={'sm'} color={'red'} as={'span'}>
                    Audit to:
                  </Text>
                  {formatDayOfWeekAndDate(row.original.auditedToTime)}
                </p>
              )}
            </>
          );
        }
      })
    ];
  }, []);
  const { data, isFetching } = useActivityLogsList();

  const table = useReactTable({
    columns,
    data: data?.items ?? EMPTY_ARRAY,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  return (
    <Table
      table={table}
      items={data?.items ?? EMPTY_ARRAY}
      isLoading={isFetching}
    />
  );
}
