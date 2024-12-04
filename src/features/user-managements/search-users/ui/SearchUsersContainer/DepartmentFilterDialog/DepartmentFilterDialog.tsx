import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepartmentIds, userActions } from 'src/entities/user/models';
import { useDepartments } from '../../../../../../entities/user/models/user-master-data.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';

export function DepartmentFilterDialog(): React.ReactElement {
  const dispatch = useDispatch();

  const { value } = useSelector(selectDepartmentIds);
  const { data: departments } = useDepartments();

  return (
    <DropDownMultipleCheckboxSelection
      title={'Department'}
      value={value}
      options={departments ?? []}
      onSelect={department =>
        dispatch(userActions.toggleDepartment(department.id))
      }
    />
  );
}
