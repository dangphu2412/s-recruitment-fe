import {
  activityLogApiClient,
  ActivityLogResponse
} from '../../../../entities/activities/api/activity-log-api.client';
import { CommonViewEntityTable } from '../../../../widgets/crud-widget/CommonViewEntityTable';
import * as React from 'react';
import { useMemo } from 'react';
import { endOfDay, subMonths } from 'date-fns';
import { CommonCRUDProvider } from 'src/widgets/crud-widget/CommonCRUDContext';
import { createColumnHelper } from '@tanstack/table-core';
import { Heading, Tag } from '@chakra-ui/react';
import { formatDateTime } from '../../../../shared/models/utils/date.utils';
import { DateRangeFilter } from '../../../activity-logs/ui/DateRangeFilter';
import { LogWorkStatus } from '../../../../entities/activities/config/constants/log-work-status.enum';

function plugin() {
  return {
    values: {
      fromDate: subMonths(new Date(), 1),
      toDate: endOfDay(new Date()),
      workStatus: [LogWorkStatus.LATE]
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
          if (props.row.original.workStatus) {
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
        header: 'Device User'
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
          <DateRangeFilter showApplyButton />
        </div>
        <CommonViewEntityTable columns={columns} />
      </CommonCRUDProvider>
    </section>
  );
}
