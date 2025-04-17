import React from 'react';
import { useUserStore } from 'src/entities/user/models';
import { UserStatus } from '../../../../../../entities/user/config';
import { DropDownMultipleCheckboxSelection } from '../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';

export function StatusFilterDialog(): React.ReactElement {
  const value = useUserStore(user => user.overview.filters.userStatus);
  const toggleUserStatus = useUserStore(user => user.toggleUserStatus);

  const options = [
    { id: UserStatus.DEBTOR, name: 'Debt' },
    { id: UserStatus.ACTIVE, name: 'Active' },
    { id: UserStatus.INACTIVE, name: 'Inactive' }
  ];

  return (
    <DropDownMultipleCheckboxSelection
      title={'Status'}
      value={value}
      options={options}
      onSelect={option => toggleUserStatus(option.id as UserStatus)}
    />
  );
}
