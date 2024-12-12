import React from 'react';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';
import { Button, Text } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { RefreshButton } from '../../../../../shared/ui/Button/RefreshButton';
import {
  ACTIVITY_REQUESTS_QUERY_KEY,
  useActivityRequests,
  useActivityRequestStore
} from '../../../../../entities/activities/models/activity-request.model';
import { DEFAULT_PAGINATION } from '../../../../../shared/models';

export function PaginateActivities(): React.ReactElement {
  const page = useActivityRequestStore(state => state.page);
  const size = useActivityRequestStore(state => state.size);
  const submitValues = useActivityRequestStore(state => state.submitValues);
  const reset = useActivityRequestStore(state => state.reset);

  const { data } = useActivityRequests();
  const totalRecords = data?.metadata.totalRecords;
  const queryClient = useQueryClient();

  function handlePageChange(currentPage: number) {
    submitValues({
      page: currentPage
    });
  }

  function handleSizeChange(currentSize: number) {
    submitValues({
      size: currentSize,
      page: DEFAULT_PAGINATION.page
    });
  }

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: [ACTIVITY_REQUESTS_QUERY_KEY]
    });
  }

  function handleResetFilter() {
    reset();
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
          Total: {totalRecords} activities
        </Text>
        <Button variant={'ghost'} onClick={handleResetFilter}>
          Clear
        </Button>
      </div>
    </div>
  );
}
