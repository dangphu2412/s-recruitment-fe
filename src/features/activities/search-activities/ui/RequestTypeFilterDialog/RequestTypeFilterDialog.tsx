import React from 'react';
import { useActivityRequestStore } from '../../../../../entities/activities/models/activity-request.model';
import { DropDownMultipleCheckboxSelection } from '../../../../../shared/ui/Input/DropDownCheckbox/DropDownCheckbox';
import { REQUEST_TYPES } from '../../../../../entities/activities/config/constants/request-activity-metadata.constant';

export function RequestTypeFilterDialog(): React.ReactElement {
  const value = useActivityRequestStore(state => state.requestTypes);
  const toggleValues = useActivityRequestStore(state => state.toggleValues);

  return (
    <DropDownMultipleCheckboxSelection
      title={'Request Type'}
      value={value}
      options={REQUEST_TYPES}
      onSelect={requestType => toggleValues('requestTypes', requestType.id)}
    />
  );
}
