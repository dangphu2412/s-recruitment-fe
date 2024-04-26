import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../../entities/user/models/store/user.slice';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';
import { useUserOverview } from '../../../../../entities/user/features/hooks/data/useUserOverview';

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
