import { ReactElement } from 'react';
import type { Row } from 'react-table';
import { useRouter } from 'next/router';
import {
  PostOverviewView,
  usePostOverviewColumns
} from '../../models/usePostOverviewColumns';
import { Table } from '../../../../../shared/ui';
import { EMPTY_ARRAY } from '../../../../../shared/config';
import { usePostOverview } from '../../../../../entities/posts/models';

export function PostOverviewTable(): ReactElement {
  const { push } = useRouter();
  const { data } = usePostOverview();
  const columns = usePostOverviewColumns();

  function handleNavigateDetail(row: Row<PostOverviewView>) {
    push(`/posts/${row.original.id}/${row.original.slug}`);
  }

  return (
    <Table
      columns={columns}
      items={data?.items ?? EMPTY_ARRAY}
      onRowClick={handleNavigateDetail}
    />
  );
}
