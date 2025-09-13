import React from 'react';
import { Input } from '@chakra-ui/react';
import { useUserStore } from 'src/entities/user/models';
import { StepIds } from '../../../../user-guide/user-management-guide';
import { useTranslate } from '../../../../../../shared/translations/translation';

export function SearchInput(): React.ReactElement {
  const value = useUserStore(user => user.overview.filters.search);
  const setFilter = useUserStore(user => user.setFilter);
  const setIsSubmitted = useUserStore(user => user.setIsSubmitted);
  const { formatMessage } = useTranslate();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter({
      search: e.target.value
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
      id={StepIds.SEARCH_BAR}
      placeholder={formatMessage({ id: 'user.searchPlaceholder' })}
      value={value}
      onChange={handleSearchChange}
      onKeyDown={handleSearchPress}
      onBlur={handleBlur}
    />
  );
}
