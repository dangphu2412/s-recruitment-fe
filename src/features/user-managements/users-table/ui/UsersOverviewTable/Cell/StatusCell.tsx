import React from 'react';
import { Switch } from '@chakra-ui/react';
import { UserManagementView } from '../../../models/useAdminColumns';
import { useMutateUserActive } from '../../../../../../entities/user/models';
import { CellContext } from '@tanstack/table-core';

type Props = CellContext<UserManagementView, string> & {
  onSwitchFinish?(): void;
};

export function StatusCell({
  cell,
  row,
  onSwitchFinish
}: Props): React.ReactElement {
  const { mutate: toggleUserActive } = useMutateUserActive();

  return (
    <Switch
      key={row.id}
      isChecked={cell.getValue() === null}
      onChange={() =>
        toggleUserActive(row.original.id, {
          onSuccess: onSwitchFinish
        })
      }
      colorScheme={'green'}
    />
  );
}
