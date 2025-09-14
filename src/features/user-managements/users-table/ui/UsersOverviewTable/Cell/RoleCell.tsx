import { ReactElement } from 'react';
import { Tag } from '@chakra-ui/react';
import { UserManagementView } from '../../../models/useUserManagementColumns';
import { Role } from '../../../../../../entities/user/api';
import { CellContext } from '@tanstack/table-core/src/core/cell';

export function RoleCell({
  cell,
  row
}: CellContext<UserManagementView, Role[]>): ReactElement {
  if (!cell.getValue()?.length) {
    return <Tag key={row.id}>Not Assigned</Tag>;
  }

  return (
    <div key={row.id} className={'flex flex-col gap-2'}>
      {cell.getValue().map(role => (
        <Tag
          key={role.id}
          colorScheme="teal"
          variant="solid"
          className={'w-fit'}
        >
          {role.name}
        </Tag>
      ))}
    </div>
  );
}
