import { BasicTable } from '../../../../../shared/ui';
import { useMyRequestsColumns } from '../../models/useMyRequestsColumns';
import {
  useMyActivityRequestsQuery,
  useMyActivityStore
} from '../../../../../entities/activities/models/activity-request.model';
import { useMemo } from 'react';
import { StepIds } from '../../../user-guide/activity-guide';
import { useDebounceValue } from '../../../../../shared/models/debounce';

export function MyRequestsTable() {
  const { data, isLoading } = useMyActivityRequestsQuery();
  const selectId = useMyActivityStore(state => state.setSelectedId);
  const query = useMyActivityStore(state => state.query);
  const deboucnedQuery = useDebounceValue(query);

  const items = useMemo(() => {
    if (!data?.items?.length) {
      return [];
    }

    return data.items.filter(item => {
      return Object.values(item).some(value =>
        typeof value === 'string' ? value.includes(deboucnedQuery) : false
      );
    });
  }, [data, deboucnedQuery]);
  const columns = useMyRequestsColumns();

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
