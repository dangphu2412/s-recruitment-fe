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

export function PaginateUsersContainer(): React.ReactElement {
  const { page, size } = useUserStore(user => user.overview.pagination);
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
      query: ''
    });
  }

  function handleSizeChange(currentSize: number) {
    setPagination({
      size: currentSize
    });

    submitWithFilter({
      query: ''
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
    <div className={'flex justify-between'}>
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
          Total: {totalRecords} users
        </Text>
        <Button variant={'ghost'} onClick={handleResetFilter}>
          Clear
        </Button>
      </div>
    </div>
  );
}
