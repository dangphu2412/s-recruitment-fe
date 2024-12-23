import { Table } from '../../../../../shared/ui';
import { useUserRequestsColumns } from '../../models/useUserRequestsColumns';
import { useActivityRequests } from '../../../../../entities/activities/models/activity-request.model';
import { useMemo } from 'react';

export function UserRequestsTable() {
  const { data, isFetching } = useActivityRequests();
  const items = useMemo(() => data?.items ?? [], [data]);
  const columns = useUserRequestsColumns();

  return <Table columns={columns} items={items} isLoading={isFetching} />;
}
