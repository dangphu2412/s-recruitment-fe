import React from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '../../../../domain/models/user.type';
import { useMutateUserActive } from 'src/user/app/hooks/data/useMutateUserActive';
import { Switch } from '@chakra-ui/react';

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
