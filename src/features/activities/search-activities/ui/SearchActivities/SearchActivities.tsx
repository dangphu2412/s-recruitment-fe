import React from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useActivityRequestStore } from '../../../../../entities/activities/models/activity-request.model';
import { DepartmentFilterDialog } from '../DepartmentFilterDialog/DepartmentFilterDialog';
import { LastChangedAtFilterDialog } from '../RequestRangeFilterDialog/LastChangedAtFilterDialog';
import { StatusFilterDialog } from '../StatusFilterDialog/DepartmentFilterDialog';

export function SearchActivities(): React.ReactElement {
  const query = useActivityRequestStore(state => state.query);
  const setValue = useActivityRequestStore(state => state.setValue);
  const submitSearch = useActivityRequestStore(state => state.submitSearch);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue('query', e.target.value);
  }

  function handleSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submitSearch();
    }
  }

  return (
    <div className={'flex flex-row gap-2'}>
      <Input
        placeholder="Search by requester name ..."
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleSearchPress}
        onBlur={submitSearch}
      />

      <DepartmentFilterDialog />
      <StatusFilterDialog />
      <LastChangedAtFilterDialog />

      <div>
        <Button onClick={submitSearch}>Search</Button>
      </div>
    </div>
  );
}
