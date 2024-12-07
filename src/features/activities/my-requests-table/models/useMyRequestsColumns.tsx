import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';

export type RequestsColumn = {
  requestType: string;
  dayOfWeek: string;
  timeOfDay: string;
};

export function useMyRequestsColumns() {
  return useMemo(() => {
    const columnHelper = createColumnHelper<RequestsColumn>();

    return [
      columnHelper.accessor('requestType', {
        header: 'Request type'
      }),
      columnHelper.accessor('dayOfWeek', {
        header: 'Day of week'
      }),
      columnHelper.accessor('timeOfDay', {
        header: 'Time of day'
      })
    ];
  }, []);
}
