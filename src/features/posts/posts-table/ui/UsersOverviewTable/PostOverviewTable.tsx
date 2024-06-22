import { ReactElement } from 'react';
import { usePostOverviewColumns } from '../../models/usePostOverviewColumns';
import { Table } from '../../../../../shared/ui';
import { EMPTY_ARRAY } from '../../../../../shared/config';
import { usePostOverview } from '../../../../../entities/posts/models';

export function PostOverviewTable(): ReactElement {
  const { data } = usePostOverview();
  const columns = usePostOverviewColumns();

  return <Table columns={columns} items={data?.items ?? EMPTY_ARRAY} />;
}
