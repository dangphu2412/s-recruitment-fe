import { UserFilterDropdown } from '../../../entities/user/ui/UserFilterDropdown/UserFilterDropdown';
import { useCommonCRUDContext } from '../../../widgets/crud-widget/CommonCRUDContext';

export function UserFilter() {
  const value = useCommonCRUDContext(state => state.values.authors);
  const setValue = useCommonCRUDContext(state => state.setValue);

  return (
    <UserFilterDropdown
      value={value}
      onChange={val => setValue('authors', val)}
      name={'Filter by user'}
    />
  );
}
