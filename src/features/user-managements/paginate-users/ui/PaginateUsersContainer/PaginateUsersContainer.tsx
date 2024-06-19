import React from 'react';
import { useDispatch } from 'react-redux';
import {
  userActions,
  useUserOverview
} from '../../../../../entities/user/models';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';

export function PaginateUsersContainer(): React.ReactElement {
  const dispatch = useDispatch();
  const { data } = useUserOverview();
  const totalRecords = data?.metadata.totalRecords;

  function handlePaginationChange(
    currentPage: number,
    currentPageSize: number
  ) {
    dispatch(
      userActions.setPagination({
        page: currentPage,
        size: currentPageSize
      })
    );
  }

  return (
    <Paginator
      className="py-2"
      totalRecords={totalRecords ?? 0}
      onPaginationChange={handlePaginationChange}
    />
  );
}
