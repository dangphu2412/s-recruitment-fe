import * as React from 'react';
import { Button, Input, Text } from '@chakra-ui/react';
import { RefreshButton } from '../../../../shared/ui/Button/RefreshButton';
import { Paginator } from '../../../../shared/ui/Pagination/Paginator';
import {
  ACTIVITY_LOGS_QUERY_KEY,
  useActivityLogListStore,
  useActivityLogsList
} from '../../../../entities/activities/models/activity-log.model';
import { DateRangeFilter } from './DateRangeFilter';
import { StatusFilterDialog } from './LogWorkStatusFilter';
import { UserFilter } from './UserFilter';
import { DEFAULT_PAGINATION } from '../../../../shared/pagination/offset-paging';
import { useQueryClient } from 'react-query';

export function SearchActivityLogsContainer() {
  const query = useActivityLogListStore(state => state.values.query);
  const page = useActivityLogListStore(state => state.values.page);
  const size = useActivityLogListStore(state => state.values.size);
  const setValue = useActivityLogListStore(state => state.setValue);
  const submitSearch = useActivityLogListStore(state => state.submitSearch);
  const submitValues = useActivityLogListStore(state => state.submitValues);
  const reset = useActivityLogListStore(state => state.reset);
  const { data } = useActivityLogsList();
  const queryClient = useQueryClient();

  function handleSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submitSearch();
    }
  }

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
      queryKey: [ACTIVITY_LOGS_QUERY_KEY]
    });
  }

  return (
    <>
      <div className={'flex flex-row gap-2'}>
        <Input
          placeholder={'Search start with username or fingerprint user name'}
          value={query}
          onChange={e => setValue('query', e.target.value)}
          onKeyDown={handleSearchPress}
          onBlur={submitSearch}
        />

        <DateRangeFilter />
        <StatusFilterDialog />
        <UserFilter />

        <div>
          <Button onClick={submitSearch}>Search</Button>
        </div>
      </div>

      <div className={'flex justify-between'}>
        <div className={'flex gap-2 items-center'}>
          <RefreshButton onClick={refresh} />
          <Paginator
            className="py-2"
            totalRecords={data?.metadata.totalRecords ?? 0}
            page={page}
            size={size}
            onPageChange={handlePageChange}
            onSizeChange={handleSizeChange}
          />
        </div>

        <div className={'flex gap-2 items-center'}>
          <Text fontSize={'sm'} fontWeight={'medium'}>
            Total: {data?.metadata.totalRecords ?? 0} items
          </Text>

          <Button variant={'ghost'} onClick={reset}>
            Clear
          </Button>
        </div>
      </div>
    </>
  );
}
