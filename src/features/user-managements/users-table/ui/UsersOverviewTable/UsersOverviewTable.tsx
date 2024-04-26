import { ReactElement } from 'react';
import { useAdminColumns } from '../../models/useAdminColumns';
import { Table } from '../../../../../shared/ui/Table';
import { EMPTY_ARRAY } from '../../../../../shared/config/constants';
import { useUserOverview } from '../../../../../entities/user/features/hooks/data/useUserOverview';

export function UsersOverviewTable(): ReactElement {
  const { data } = useUserOverview();
  const columns = useAdminColumns();

  return <Table columns={columns} items={data?.items ?? EMPTY_ARRAY} />;
}
