import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPeriodIds, userActions } from 'src/entities/user/models';
import { usePeriods } from '../../../../../../entities/user/models/user-master-data.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';

export function PeriodFilterDialog(): React.ReactElement {
  const dispatch = useDispatch();

  const { value } = useSelector(selectPeriodIds);
  const { data: periods } = usePeriods();

  return (
    <DropDownMultipleCheckboxSelection
      title={'Period'}
      value={value}
      options={periods ?? []}
      onSelect={department => dispatch(userActions.togglePeriod(department.id))}
    />
  );
}
