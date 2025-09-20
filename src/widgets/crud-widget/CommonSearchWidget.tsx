import React from 'react';
import { Button, Input, Text } from '@chakra-ui/react';
import { Paginator } from 'src/shared/ui/Pagination/Paginator';
import { RefreshButton } from '../../shared/ui/Button/RefreshButton';
import { DEFAULT_PAGINATION } from 'src/shared/pagination/offset-paging';
import { useCommonCRUDContext, useQueryResource } from './CommonCRUDContext';
import { useQueryClient } from 'react-query';

type Props = {
  filterSlot?: React.ReactNode;
  placeholder?: string;
};

export function CommonSearchWidget({
  filterSlot,
  placeholder = 'Search anything ...'
}: Props): React.ReactElement {
  const query = useCommonCRUDContext(state => state.values.query);
  const page = useCommonCRUDContext(state => state.values.page);
  const size = useCommonCRUDContext(state => state.values.size);
  const submitSearch = useCommonCRUDContext(state => state.submitSearch);
  const submitValues = useCommonCRUDContext(state => state.submitValues);
  const setValue = useCommonCRUDContext(state => state.setValue);
  const reset = useCommonCRUDContext(state => state.reset);
  const resource = useCommonCRUDContext(state => state.resource);

  const { data } = useQueryResource();
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

  function handleSearchPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submitSearch();
    }
  }

  function refresh() {
    queryClient.invalidateQueries([resource]);
  }

  return (
    <>
      <div className={'flex flex-row gap-2'}>
        <Input
          placeholder={placeholder}
          value={query}
          onChange={e => setValue('query', e.target.value)}
          onKeyDown={handleSearchPress}
          onBlur={submitSearch}
        />

        {filterSlot}

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
