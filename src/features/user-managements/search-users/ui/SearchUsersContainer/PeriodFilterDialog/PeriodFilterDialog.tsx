import React from 'react';
import { useUserStore } from 'src/entities/user/models';
import { usePeriods } from '../../../../../../entities/user/models/user-master-data.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';

export function PeriodFilterDialog(): React.ReactElement {
  const value = useUserStore(user => user.overview.filters.periodIds);
  const togglePeriod = useUserStore(user => user.togglePeriod);
  const { data: periods } = usePeriods();

  return (
    <DropDownMultipleCheckboxSelection
      title={'Period'}
      value={value}
      options={periods ?? []}
      onSelect={department => togglePeriod(department.id)}
    />
  );
}
