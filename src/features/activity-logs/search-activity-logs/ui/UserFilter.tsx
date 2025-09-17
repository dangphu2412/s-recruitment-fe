import { UserFilterDropdown } from '../../../../entities/user/ui/UserFilterDropdown/UserFilterDropdown';
import { useActivityLogListStore } from '../../../../entities/activities/models/activity-log.model';

export function UserFilter() {
  const value = useActivityLogListStore(state => state.values.authors);

  return (
    <UserFilterDropdown
      value={value}
      onChange={val =>
        useActivityLogListStore.getInitialState().setValue('authors', val)
      }
      name={'User filter'}
    />
  );
}
