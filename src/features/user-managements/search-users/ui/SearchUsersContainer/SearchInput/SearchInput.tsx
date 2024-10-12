import React from 'react';
import { Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, userActions } from 'src/entities/user/models';

export function SearchInput(): React.ReactElement {
  const dispatch = useDispatch();
  const { query } = useSelector(selectFilters);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      userActions.setFilter({
        query: e.target.value
      })
    );
  }

  function handleSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      dispatch(userActions.setIsSubmitted());
    }
  }

  function handleBlur() {
    dispatch(userActions.setIsSubmitted());
  }

  return (
    <Input
      placeholder="Search by username"
      value={query.value}
      onChange={handleSearchChange}
      onKeyDown={handleSearchPress}
      onBlur={handleBlur}
    />
  );
}
