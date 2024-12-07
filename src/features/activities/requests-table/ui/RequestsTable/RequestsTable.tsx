import { Table } from '../../../../../shared/ui';
import { useRequestsColumns } from '../../models/useRequestsColumns';
import { useActivityRequestsQuery } from '../../../../../entities/activities/models/activity-request.model';
import { useMemo } from 'react';

export function RequestsTable() {
  const { data, isLoading } = useActivityRequestsQuery();
  const items = useMemo(() => data?.items ?? [], [data]);
  const columns = useRequestsColumns();

  return <Table columns={columns} items={items} isLoading={isLoading} />;
}
