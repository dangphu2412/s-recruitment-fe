import React from 'react';
import { useActivityRequestStore } from '../../../../../entities/activities/models/activity-request.model';
import { useDepartments } from '../../../../../entities/user/models/user-master-data.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';

export function DepartmentFilterDialog(): React.ReactElement {
  const value = useActivityRequestStore(state => state.departmentIds);
  const toggleValues = useActivityRequestStore(state => state.toggleValues);
  const { data: departments } = useDepartments();

  return (
    <DropDownMultipleCheckboxSelection
      title={'Department'}
      value={value}
      options={departments ?? []}
      onSelect={department => toggleValues('departmentIds', department.id)}
    />
  );
}
