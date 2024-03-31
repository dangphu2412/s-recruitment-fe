import { Fragment, ReactElement } from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '../../../../models/user/user.type';
import { Role } from '../../../../models/rbac/rbac.types';

export function RoleCell({
  value,
  row
}: CellProps<UserManagementView, Role[]>): ReactElement {
  return (
    <Fragment key={row.id}>
      {value.map(role => (
        <div key={role.id}>{role.name}</div>
      ))}
    </Fragment>
  );
}
