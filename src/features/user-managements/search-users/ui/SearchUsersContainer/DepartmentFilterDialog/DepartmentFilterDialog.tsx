import React from 'react';
import { useUserStore } from 'src/entities/user/models';
import { useDepartments } from '../../../../../../entities/user/models/user-master-data.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';

export function DepartmentFilterDialog(): React.ReactElement {
  const value = useUserStore(user => user.overview.filters.departmentIds.value);
  const toggleDepartment = useUserStore(user => user.toggleDepartment);
  const { data: departments } = useDepartments();

  return (
    <DropDownMultipleCheckboxSelection
      title={'Department'}
      value={value}
      options={departments ?? []}
      onSelect={department => toggleDepartment(department.id)}
    />
  );
}
