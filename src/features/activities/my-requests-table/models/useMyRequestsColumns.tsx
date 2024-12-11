import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { formatDate } from '../../../../shared/models/utils/date.utils';
import { ActivityStatusTag } from '../../../../entities/activities/ui/ActivityStatusTag/ActivityStatusTag';
import { RequestActivityStatus } from '../../../../entities/activities/config/constants/request-activity-status.enum';
import { REQUEST_TYPES } from '../../../../entities/activities/config/constants/request-activity-metadata.constant';

export type RequestsColumn = {
  id: number;
  requestType: string;
  dayOfWeek: {
    id: string;
    name: string;
  };
  timeOfDay: {
    id: string;
    name: string;
  };
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
      columnHelper.accessor('dayOfWeek.name', {
        header: 'Day of week'
      }),
      columnHelper.accessor('timeOfDay.name', {
        header: 'Time of day'
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
