import React from 'react';
import { CellProps } from 'react-table';
import { Switch } from '@chakra-ui/react';
import { UserManagementView } from '../../../../../entities/user/models/user/user.type';
import { useMutateUserActive } from '../../../../../entities/user/features/hooks/data/useMutateUserActive';

export function StatusCell({
  value,
  row
}: CellProps<UserManagementView, string>): React.ReactElement {
  const { mutate: toggleUserActive } = useMutateUserActive();

  return (
    <Switch
      key={row.id}
      isChecked={value === null}
      onChange={() => toggleUserActive(row.original.id)}
      colorScheme={'green'}
    />
  );
}
