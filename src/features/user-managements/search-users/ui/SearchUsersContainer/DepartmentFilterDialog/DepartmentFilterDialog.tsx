import React from 'react';
import { useUserStore } from 'src/entities/user/models';
import { useDepartments } from '../../../../../../entities/user/models/user-master-data.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';
import { useTranslate } from '../../../../../../shared/translations/translation';

export function DepartmentFilterDialog(): React.ReactElement {
  const value = useUserStore(user => user.overview.filters.departmentIds);
  const toggleDepartment = useUserStore(user => user.toggleDepartment);
  const { data: departments } = useDepartments();
  const { formatMessage } = useTranslate();

  return (
    <DropDownMultipleCheckboxSelection
      title={formatMessage({ id: 'user.department' })}
      value={value}
      options={departments ?? []}
      onSelect={department => toggleDepartment(department.id)}
    />
  );
}
