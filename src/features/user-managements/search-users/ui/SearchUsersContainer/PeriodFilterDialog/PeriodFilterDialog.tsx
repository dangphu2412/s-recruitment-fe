import React from 'react';
import { useUserStore } from 'src/entities/user/models';
import { usePeriods } from '../../../../../../entities/user/models/user-master-data.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';
import { useTranslate } from '../../../../../../shared/translations/translation';

export function PeriodFilterDialog(): React.ReactElement {
  const value = useUserStore(user => user.overview.filters.periodIds);
  const togglePeriod = useUserStore(user => user.togglePeriod);
  const { data: periods } = usePeriods();
  const { formatMessage } = useTranslate();

  return (
    <DropDownMultipleCheckboxSelection
      title={formatMessage({ id: 'user.period' })}
      value={value}
      options={periods ?? []}
      onSelect={department => togglePeriod(department.id)}
    />
  );
}
