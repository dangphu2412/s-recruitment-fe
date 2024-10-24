import { ReactElement } from 'react';
import { CellProps } from 'react-table';
import { Tag } from '@chakra-ui/react';
import { UserManagementView } from '../../../models/useAdminColumns';
import { Role } from '../../../../../../entities/user/api';

export function RoleCell({
  value,
  row
}: CellProps<UserManagementView, Role[]>): ReactElement {
  if (!value?.length) {
    return <Tag key={row.id}>Not Assigned</Tag>;
  }

  return (
    <div key={row.id} className={'flex flex-col gap-2'}>
      {value.map(role => (
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
