import React from 'react';
import { DropDownCalendarSelection } from '../../../shared/ui/Input/DropDownCalendar/DropDownCalendar';
import { useCommonCRUDContext } from '../../../widgets/crud-widget/CommonCRUDContext';

type DateRangeFilterProps = {
  liveQueryChange?: boolean;
};

export function DateRangeFilter({
  liveQueryChange
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
      onChange={data => {
        if (liveQueryChange) {
          if (data.toDate === null || data.fromDate === null) {
            setValues({
              fromDate: data.fromDate,
              toDate: data.toDate
            });
            return;
          }
          submitValues({
            fromDate: data.fromDate,
            toDate: data.toDate
          });
          return;
        }

        setValues({
          fromDate: data.fromDate,
          toDate: data.toDate
        });
      }}
    />
  );
}
