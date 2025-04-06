import React from 'react';
import { Input } from '@chakra-ui/react';
import { useUserStore } from 'src/entities/user/models';

export function SearchInput(): React.ReactElement {
  const value = useUserStore(user => user.overview.filters.query.value);
  const setFilter = useUserStore(user => user.setFilter);
  const setIsSubmitted = useUserStore(user => user.setIsSubmitted);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter({
      query: e.target.value
    });
  }

  function handleSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setIsSubmitted();
    }
  }

  function handleBlur() {
    setIsSubmitted();
  }

  return (
    <Input
      placeholder="Search by username"
      value={value}
      onChange={handleSearchChange}
      onKeyDown={handleSearchPress}
      onBlur={handleBlur}
    />
  );
}
