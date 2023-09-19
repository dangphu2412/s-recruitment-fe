import React from 'react';
import { Paginator } from 'src/system/app/internal/components/Pagination/Paginator';
import { useDispatch } from 'react-redux';
import { userActions } from 'src/user/internal/store/user.slice';

type Props = {
  totalRecords?: number;
};

export function PaginationContainer({
  totalRecords
}: Props): React.ReactElement {
  const dispatch = useDispatch();

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
