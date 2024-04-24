import { ReactElement } from 'react';
import { UserManagementView } from '../../../../entities/user/models/user/user.type';
import { Page } from '../../../../shared/models';
import { useAdminColumns } from '../../models/useAdminColumns';
import { Table } from '../../../../shared/ui/Table';
import { EMPTY_ARRAY } from '../../../../shared/config/constants';

type Props = {
  data: Page<UserManagementView> | undefined;
};

export function AdminTable({ data }: Props): ReactElement {
  const columns = useAdminColumns();

  return <Table columns={columns} items={data?.items ?? EMPTY_ARRAY} />;
}
