import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPagination,
  userActions,
  useUserOverview
} from '../../../../../entities/user/models';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';

export function PaginateUsersContainer(): React.ReactElement {
  const dispatch = useDispatch();
  const { page, size } = useSelector(selectPagination);
  const { data } = useUserOverview();
  const totalRecords = data?.metadata.totalRecords;

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

  return (
    <Paginator
      className="py-2"
      totalRecords={totalRecords ?? 0}
      page={page}
      size={size}
      onPageChange={handlePageChange}
      onSizeChange={handleSizeChange}
    />
  );
}
