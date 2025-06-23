import React from 'react';
import { DropDownCalendarSelection } from '../../../../shared/ui/Input/DropDownCalendar/DropDownCalendar';
import { useActivityLogListStore } from '../../../../entities/activities/models/activity-log.model';

type DateRangeFilterProps = {
  showApplyButton?: boolean;
};

export function DateRangeFilter({
  showApplyButton
}: DateRangeFilterProps): React.ReactElement {
  const fromDate = useActivityLogListStore(state => state.values.fromDate);
  const toDate = useActivityLogListStore(state => state.values.toDate);
  const setValues = useActivityLogListStore(state => state.setValues);
  const submitValues = useActivityLogListStore(state => state.submitValues);

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
