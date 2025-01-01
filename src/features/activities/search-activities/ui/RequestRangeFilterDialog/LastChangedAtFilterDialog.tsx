import { DropDownCalendarSelection } from '../../../../../shared/ui/Input/DropDownCalendar/DropDownCalendar';
import { useActivityRequestStore } from '../../../../../entities/activities/models/activity-request.model';

export function LastChangedAtFilterDialog() {
  const fromDate = useActivityRequestStore(state => state.fromDate);
  const toDate = useActivityRequestStore(state => state.toDate);
  const setValue = useActivityRequestStore(state => state.setValue);

  return (
    <DropDownCalendarSelection
      title={'Last Changed At'}
      fromDate={fromDate}
      toDate={toDate}
      onChange={data => {
        setValue('fromDate', data.fromDate);
        setValue('toDate', data.toDate);
      }}
    />
  );
}
