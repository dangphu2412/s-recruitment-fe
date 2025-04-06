import React from 'react';
import { Button } from '@chakra-ui/react';
import { StatusFilterDialog } from './StatusFilterDialog/StatusFilterDialog';
import { SearchInput } from './SearchInput/SearchInput';
import { useUserStore } from 'src/entities/user/models';
import { DepartmentFilterDialog } from './DepartmentFilterDialog/DepartmentFilterDialog';
import { PeriodFilterDialog } from './PeriodFilterDialog/PeriodFilterDialog';

export function SearchUsersContainer(): React.ReactElement {
  const setIsSubmitted = useUserStore(user => user.setIsSubmitted);

  function handleSubmitFilter() {
    setIsSubmitted();
  }

  return (
    <div className={'flex flex-row gap-2'}>
      <SearchInput />
      <DepartmentFilterDialog />
      <PeriodFilterDialog />
      <StatusFilterDialog />

      <div>
        <Button onClick={handleSubmitFilter}>Search</Button>
      </div>
    </div>
  );
}
