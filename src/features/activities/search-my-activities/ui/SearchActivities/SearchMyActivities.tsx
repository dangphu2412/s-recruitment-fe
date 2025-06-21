import React from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useMyActivityStore } from '../../../../../entities/activities/models/activity-request.model';
import { StatusFilterDialog } from '../StatusFilterDialog/StatusFilterDialog';

export function SearchMyActivities(): React.ReactElement {
  const query = useMyActivityStore(state => state.query);
  const submitSearch = useMyActivityStore(state => state.submitSearch);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    useMyActivityStore.setState({
      query: e.target.value
    });
  }

  function handleSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submitSearch();
    }
  }

  return (
    <div className={'flex flex-row gap-2'}>
      <Input
        placeholder="Search by anything"
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleSearchPress}
        onBlur={submitSearch}
      />

      <StatusFilterDialog />

      <div>
        <Button onClick={submitSearch}>Search</Button>
      </div>
    </div>
  );
}
