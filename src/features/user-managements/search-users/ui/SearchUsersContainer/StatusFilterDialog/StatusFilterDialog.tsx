import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserStatus, userActions } from 'src/entities/user/models';
import { UserStatus } from '../../../../../../entities/user/config';
import { DropDownMultipleCheckboxSelection } from '../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';

export function StatusFilterDialog(): React.ReactElement {
  const dispatch = useDispatch();

  const { value } = useSelector(selectUserStatus);

  const options = [
    { id: UserStatus.DEBTOR, name: 'Debt' },
    { id: UserStatus.ACTIVE, name: 'Active' },
    { id: UserStatus.INACTIVE, name: 'Inactive' },
    { id: UserStatus.TEMPORARY_STOP, name: 'Temporary Stop' }
  ];

  return (
    <DropDownMultipleCheckboxSelection
      title={'Status'}
      value={value}
      options={options}
      onSelect={option =>
        dispatch(userActions.toggleUserStatus(option.id as UserStatus))
      }
    />
  );
}
