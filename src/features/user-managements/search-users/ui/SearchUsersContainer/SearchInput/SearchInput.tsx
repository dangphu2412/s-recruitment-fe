import React from 'react';
import { Input } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { userActions } from 'src/entities/user/models';

export function SearchInput(): React.ReactElement {
  const dispatch = useDispatch();
  const [currentSearch, setCurrentSearch] = React.useState('');

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(e.target.value);
  }

  function handleSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      dispatch(
        userActions.submitWithFilter({
          query: currentSearch
        })
      );
    }
  }

  function handleBlur() {
    dispatch(
      userActions.setFilter({
        query: currentSearch
      })
    );
  }

  return (
    <Input
      placeholder="Search by username"
      value={currentSearch}
      onChange={handleSearchChange}
      onKeyDown={handleSearchPress}
      onBlur={handleBlur}
    />
  );
}
