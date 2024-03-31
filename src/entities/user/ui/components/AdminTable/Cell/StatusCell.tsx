import React from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '../../../../models/user/user.type';
import { Switch } from '@chakra-ui/react';
import { useMutateUserActive } from '../../../../features/hooks/data/useMutateUserActive';

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
