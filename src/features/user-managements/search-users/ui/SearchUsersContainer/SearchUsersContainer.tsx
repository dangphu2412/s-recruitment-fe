import React from 'react';
import { Button } from '@chakra-ui/react';
import { StatusFilterDialog } from './StatusFilterDialog/StatusFilterDialog';
import { SearchInput } from './SearchInput/SearchInput';
import { useUserStore } from 'src/entities/user/models';
import { DepartmentFilterDialog } from './DepartmentFilterDialog/DepartmentFilterDialog';
import { PeriodFilterDialog } from './PeriodFilterDialog/PeriodFilterDialog';
import { StepIds } from '../../../user-guide/user-management-guide';
import { useTranslate } from '../../../../../shared/translations/translation';
import { BirthdayFilterDialog } from './BirthdayFilterDialog/BirthdayFilterDialog';

export function SearchUsersContainer(): React.ReactElement {
  const setIsSubmitted = useUserStore(user => user.setIsSubmitted);
  const { formatMessage } = useTranslate();

  function handleSubmitFilter() {
    setIsSubmitted();
  }

  return (
    <div className={'flex flex-row gap-2'} id={StepIds.FILTERS_BAR}>
      <SearchInput />
      <DepartmentFilterDialog />
      <PeriodFilterDialog />
      <BirthdayFilterDialog />
      <StatusFilterDialog />

      <div>
        <Button onClick={handleSubmitFilter}>
          {formatMessage({ id: 'user.search' })}
        </Button>
      </div>
    </div>
  );
}
