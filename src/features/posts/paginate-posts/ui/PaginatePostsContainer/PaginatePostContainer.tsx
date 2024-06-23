import React from 'react';
import { useDispatch } from 'react-redux';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';
import {
  postActions,
  usePostOverview
} from '../../../../../entities/posts/models';

export function PaginatePostContainer(): React.ReactElement {
  const dispatch = useDispatch();
  const { data } = usePostOverview();
  const totalRecords = data?.metadata.totalRecords;

  function handlePaginationChange(
    currentPage: number,
    currentPageSize: number
  ) {
    dispatch(
      postActions.setPagination({
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
