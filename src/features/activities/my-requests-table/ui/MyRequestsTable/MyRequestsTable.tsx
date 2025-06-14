import { BasicTable } from '../../../../../shared/ui';
import { useMyRequestsColumns } from '../../models/useMyRequestsColumns';
import {
  useMyActivityRequestsQuery,
  useMyActivityStore
} from '../../../../../entities/activities/models/activity-request.model';
import { useMemo } from 'react';
import { StepIds } from '../../../user-guide/activity-guide';

export function MyRequestsTable() {
  const { data, isLoading } = useMyActivityRequestsQuery();
  const items = useMemo(() => data?.items ?? [], [data]);
  const columns = useMyRequestsColumns();
  const selectId = useMyActivityStore(state => state.setSelectedId);

  return (
    <BasicTable
      id={StepIds.MY_REQUEST_TABLE}
      columns={columns}
      items={items}
      isLoading={isLoading}
      onRowClick={row => selectId(row.original.id)}
    />
  );
}
