import { ReactElement } from 'react';
import { useUserGroupColumns } from '../../models/useUserGroupColumns';
import { Table } from '../../../../../shared/ui';
import { EMPTY_ARRAY } from '../../../../../shared/config';
import { useUserGroupQuery } from '../../../../../entities/user/models/user-group.model';

export function UserGroupTable(): ReactElement {
  const { data, isFetching } = useUserGroupQuery();
  const columns = useUserGroupColumns();

  return (
    <Table
      columns={columns}
      items={data?.items ?? EMPTY_ARRAY}
      isLoading={isFetching}
    />
  );
}
