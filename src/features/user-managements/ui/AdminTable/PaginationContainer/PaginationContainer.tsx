import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../../entities/user/models/store/user.slice';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';

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
