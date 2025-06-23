import { UserFilterDropdown } from '../../../../entities/user/ui/UserFilterDropdown/UserFilterDropdown';
import { useActivityLogListStore } from '../../../../entities/activities/models/activity-log.model';

export function UserFilter() {
  const value = useActivityLogListStore(state => state.values.authors);
  const setValue = useActivityLogListStore(state => state.setValue);

  return (
    <UserFilterDropdown
      value={value}
      onChange={val => setValue('authors', val)}
      name={'Filter by user'}
    />
  );
}
