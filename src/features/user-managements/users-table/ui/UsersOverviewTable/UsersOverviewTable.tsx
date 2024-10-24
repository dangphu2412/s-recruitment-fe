import { ReactElement } from 'react';
import { useAdminColumns } from '../../models/useAdminColumns';
import { Table } from '../../../../../shared/ui';
import { EMPTY_ARRAY } from '../../../../../shared/config';
import { useUserOverview } from '../../../../../entities/user/models';

export function UsersOverviewTable(): ReactElement {
  const { data, isFetching } = useUserOverview();
  const columns = useAdminColumns();

  return (
    <Table
      columns={columns}
      items={data?.items ?? EMPTY_ARRAY}
      isLoading={isFetching}
    />
  );
}
