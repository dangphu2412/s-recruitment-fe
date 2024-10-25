import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { StatusFilterDialog } from './StatusFilterDialog/StatusFilterDialog';
import { SearchInput } from './SearchInput/SearchInput';
import { userActions } from 'src/entities/user/models';
import { DepartmentFilterDialog } from './DepartmentFilterDialog/DepartmentFilterDialog';
import { PeriodFilterDialog } from './PeriodFilterDialog/PeriodFilterDialog';

export function SearchUsersContainer(): React.ReactElement {
  const dispatch = useDispatch();

  function handleSubmitFilter() {
    dispatch(userActions.setIsSubmitted());
  }

  return (
    <Flex className="space-x-2">
      <SearchInput />
      <DepartmentFilterDialog />
      <PeriodFilterDialog />
      <StatusFilterDialog />

      <Button onClick={handleSubmitFilter}>Search</Button>
    </Flex>
  );
}
