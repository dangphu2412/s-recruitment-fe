import { Table } from '../../../../../shared/ui';
import { useMyRequestsColumns } from '../../models/useMyRequestsColumns';
import { useMyActivityRequestsQuery } from '../../../../../entities/activities/models/activity-request.model';
import { useMemo } from 'react';

export function MyRequestsTable() {
  const { data, isLoading } = useMyActivityRequestsQuery();
  const items = useMemo(() => data?.items ?? [], [data]);
  const columns = useMyRequestsColumns();

  return <Table columns={columns} items={items} isLoading={isLoading} />;
}
