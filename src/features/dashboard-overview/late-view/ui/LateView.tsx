import {
  activityLogApiClient,
  ActivityLogResponse
} from '../../../../entities/activities/api/activity-log-api.client';
import { CommonViewEntityTable } from '../../../../widgets/crud-widget/CommonViewEntityTable';
import * as React from 'react';
import { useMemo } from 'react';
import { endOfDay, subWeeks } from 'date-fns';
import { CommonCRUDProvider } from 'src/widgets/crud-widget/CommonCRUDContext';
import { createColumnHelper } from '@tanstack/table-core';
import { Heading, Tag } from '@chakra-ui/react';
import { formatDateTime } from '../../../../shared/models/utils/date.utils';
import { DateRangeFilter } from '../../../activity-logs/ui/DateRangeFilter';

function plugin() {
  return {
    values: {
      fromDate: subWeeks(new Date(), 1),
      toDate: endOfDay(new Date()),
      isLate: true
    }
  };
}

export function LateView() {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ActivityLogResponse>();

    return [
      columnHelper.display({
        header: 'Log status',
        cell: props => {
          if (props.row.original.isLate) {
            return <Tag colorScheme={'red'}>Late</Tag>;
          }

          if (props.row.original.fromTime === props.row.original.toTime) {
            return <Tag colorScheme={'yellow'}>Not checkout</Tag>;
          }

          return <Tag colorScheme={'green'}>On time</Tag>;
        }
      }),
      columnHelper.accessor('fromTime', {
        header: 'From time',
        cell: ({ getValue }) => formatDateTime(getValue())
      }),
      columnHelper.accessor('toTime', {
        header: 'To time',
        cell: ({ getValue }) => formatDateTime(getValue())
      }),
      columnHelper.accessor('deviceUserId', {
        header: 'Device User Id'
      }),
      columnHelper.accessor('author.email', {
        header: 'Author email'
      })
    ];
  }, []);

  return (
    <section className={'space-y-8'}>
      <CommonCRUDProvider
        resource={'tracking'}
        fetcher={activityLogApiClient.findLogs}
        registerPlugin={plugin}
      >
        <div className={'flex justify-between'}>
          <Heading size={'md'}>Late activities</Heading>
          <DateRangeFilter liveQueryChange />
        </div>
        <CommonViewEntityTable columns={columns} />
      </CommonCRUDProvider>
    </section>
  );
}
