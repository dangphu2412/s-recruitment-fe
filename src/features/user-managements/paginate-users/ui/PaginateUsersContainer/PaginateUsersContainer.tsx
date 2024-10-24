import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  QUERY_USERS_KEY,
  selectPagination,
  userActions,
  useUserOverview
} from '../../../../../entities/user/models';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';
import { Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useQueryClient } from 'react-query';

export function PaginateUsersContainer(): React.ReactElement {
  const dispatch = useDispatch();
  const { page, size } = useSelector(selectPagination);
  const { data } = useUserOverview();
  const totalRecords = data?.metadata.totalRecords;
  const queryClient = useQueryClient();

  function handlePageChange(currentPage: number) {
    dispatch(
      userActions.setPagination({
        page: currentPage
      })
    );
    dispatch(
      userActions.submitWithFilter({
        query: ''
      })
    );
  }

  function handleSizeChange(currentSize: number) {
    dispatch(
      userActions.setPagination({
        size: currentSize
      })
    );
    dispatch(
      userActions.submitWithFilter({
        query: ''
      })
    );
  }

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: [QUERY_USERS_KEY]
    });
  }

  return (
    <div className={'flex justify-between'}>
      <div className={'flex gap-2 items-center'}>
        <FontAwesomeIcon
          className={'p-1 rounded border cursor-pointer'}
          icon={faRefresh}
          onClick={refresh}
        />
        <Paginator
          className="py-2"
          totalRecords={totalRecords ?? 0}
          page={page}
          size={size}
          onPageChange={handlePageChange}
          onSizeChange={handleSizeChange}
        />
      </div>

      <Text fontSize={'sm'} fontWeight={'medium'}>
        Total: {totalRecords} users
      </Text>
    </div>
  );
}
