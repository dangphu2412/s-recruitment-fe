import React from 'react';
import {
  QUERY_USERS_KEY,
  useUserOverview,
  useUserStore
} from '../../../../../entities/user/models';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';
import { Button, Text } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { RefreshButton } from '../../../../../shared/ui/Button/RefreshButton';
import { StepIds } from '../../../user-guide/user-management-guide';
import { useTranslate } from '../../../../../shared/translations/translation';

export function PaginateUsersContainer(): React.ReactElement {
  const { formatMessage } = useTranslate();
  const page = useUserStore(user => user.overview.filters.page);
  const size = useUserStore(user => user.overview.filters.size);
  const setPagination = useUserStore(user => user.setPagination);
  const submitWithFilter = useUserStore(user => user.submitWithFilter);
  const resetFilter = useUserStore(user => user.resetFilter);

  const { data } = useUserOverview();
  const totalRecords = data?.metadata.totalRecords;
  const queryClient = useQueryClient();

  function handlePageChange(currentPage: number) {
    setPagination({
      page: currentPage
    });

    submitWithFilter({
      search: ''
    });
  }

  function handleSizeChange(currentSize: number) {
    setPagination({
      size: currentSize
    });

    submitWithFilter({
      search: ''
    });
  }

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: [QUERY_USERS_KEY]
    });
  }

  function handleResetFilter() {
    resetFilter();
  }

  return (
    <div className={'flex justify-between'} id={StepIds.PAGINATION_CONTROLS}>
      <div className={'flex gap-2 items-center'}>
        <RefreshButton onClick={refresh} />
        <Paginator
          className="py-2"
          totalRecords={totalRecords ?? 0}
          page={page}
          size={size}
          onPageChange={handlePageChange}
          onSizeChange={handleSizeChange}
        />
      </div>

      <div className={'flex gap-2 items-center'}>
        <Text fontSize={'sm'} fontWeight={'medium'}>
          {formatMessage(
            { id: 'user.totalUsers' },
            {
              count: totalRecords
            }
          )}
        </Text>
        <Button variant={'ghost'} onClick={handleResetFilter}>
          {formatMessage({ id: 'user.clear' })}
        </Button>
      </div>
    </div>
  );
}
