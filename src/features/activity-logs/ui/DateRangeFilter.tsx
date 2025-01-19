import React from 'react';
import { DropDownCalendarSelection } from '../../../shared/ui/Input/DropDownCalendar/DropDownCalendar';
import { useCommonCRUDContext } from '../../../widgets/crud-widget/CommonCRUDContext';

export function DateRangeFilter(): React.ReactElement {
  const fromDate = useCommonCRUDContext(state => state.values.fromDate);
  const toDate = useCommonCRUDContext(state => state.values.toDate);
  const setValues = useCommonCRUDContext(state => state.setValues);

  return (
    <DropDownCalendarSelection
      title={'Date range'}
      fromDate={fromDate}
      toDate={toDate}
      onChange={data => {
        setValues({
          fromDate: data.fromDate,
          toDate: data.toDate
        });
      }}
    />
  );
}
