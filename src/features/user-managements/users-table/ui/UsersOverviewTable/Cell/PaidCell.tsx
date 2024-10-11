import React, { Fragment } from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '../../../models/useAdminColumns';

export function PaidCell({
  row
}: CellProps<UserManagementView, string>): React.ReactElement {
  return <Fragment key={row.id}>12 Months</Fragment>;
}
