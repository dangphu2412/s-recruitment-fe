import { ReactElement } from 'react';
import { useAdminColumns } from 'src/user/app/hooks/table/useAdminColumns';
import { UserManagementView } from 'src/user/domain/models/user.type';
import { Page } from 'src/system/domain/clients';
import { Table } from '../../../../system/app/internal/components/Table';
import { EMPTY_ARRAY } from '../../../../system/domain/constants';

type Props = {
  data: Page<UserManagementView> | undefined;
};

export function AdminTable({ data }: Props): ReactElement {
  const columns = useAdminColumns();

  return <Table columns={columns} items={data?.items ?? EMPTY_ARRAY} />;
}
