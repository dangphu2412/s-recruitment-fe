import React from 'react';
import { DropDownCalendarSelection } from '../../../shared/ui/Input/DropDownCalendar/DropDownCalendar';
import { useCommonCRUDContext } from '../../../widgets/crud-widget/CommonCRUDContext';

type DateRangeFilterProps = {
  showApplyButton?: boolean;
};

export function DateRangeFilter({
  showApplyButton
}: DateRangeFilterProps): React.ReactElement {
  const fromDate = useCommonCRUDContext(state => state.values.fromDate);
  const toDate = useCommonCRUDContext(state => state.values.toDate);
  const setValues = useCommonCRUDContext(state => state.setValues);
  const submitValues = useCommonCRUDContext(state => state.submitValues);

  return (
    <DropDownCalendarSelection
      title={'Date range'}
      fromDate={fromDate}
      toDate={toDate}
      showApplyButton={showApplyButton}
      onApply={() => {
        if (fromDate === null || toDate === null) {
          return;
        }

        submitValues({
          fromDate,
          toDate
        });
      }}
      onChange={data => {
        setValues({
          fromDate: data.fromDate,
          toDate: data.toDate
        });
      }}
    />
  );
}
