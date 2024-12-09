import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { formatDate } from '../../../../shared/models/utils/date.utils';
import { ActivityStatusTag } from '../../../../entities/activities/ui/ActivityStatusTag/ActivityStatusTag';
import { RequestActivityStatus } from '../../../../entities/activities/config/constants/request-activity-status.enum';
import {
  REQUEST_TYPES,
  TIME_OF_DAYS
} from '../../../../entities/activities/config/constants/request-activity-metadata.constant';

export type RequestsColumn = {
  id: number;
  requestType: string;
  dayOfWeek: string;
  timeOfDay: string;
  createdAt: string;
  approvalStatus: RequestActivityStatus;
};

export function useMyRequestsColumns() {
  return useMemo(() => {
    const columnHelper = createColumnHelper<RequestsColumn>();

    return [
      columnHelper.accessor('requestType', {
        header: 'Request type',
        cell: ({ getValue }) => {
          return REQUEST_TYPES.find(type => type.id === getValue())?.name;
        }
      }),
      columnHelper.accessor('dayOfWeek', {
        header: 'Day of week'
      }),
      columnHelper.accessor('timeOfDay', {
        header: 'Time of day',
        cell: ({ getValue }) => {
          return TIME_OF_DAYS.find(({ id }) => id === getValue())?.name;
        }
      }),
      columnHelper.accessor('createdAt', {
        header: 'Submitted at',
        cell: props => <>{formatDate(new Date(props.getValue()))}</>
      }),
      columnHelper.accessor('approvalStatus', {
        header: 'Status',
        cell: ({ getValue }) => {
          return <ActivityStatusTag value={getValue()} />;
        }
      })
    ];
  }, []);
}
