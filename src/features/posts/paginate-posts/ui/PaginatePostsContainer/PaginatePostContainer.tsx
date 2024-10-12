import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paginator } from '../../../../../shared/ui/Pagination/Paginator';
import {
  postActions,
  usePostOverview
} from '../../../../../entities/posts/models';
import { selectPagination } from '../../../../../entities/posts/models';

export function PaginatePostContainer(): React.ReactElement {
  const dispatch = useDispatch();
  const { page, size } = useSelector(selectPagination);
  const { data } = usePostOverview();
  const totalRecords = data?.metadata.totalRecords;

  function handlePageChange(currentPage: number) {
    dispatch(
      postActions.setPagination({
        page: currentPage
      })
    );
    dispatch(
      postActions.setFilter({
        query: ''
      })
    );
  }

  function handleSizeChange(currentSize: number) {
    dispatch(
      postActions.setPagination({
        size: currentSize
      })
    );
    dispatch(
      postActions.setFilter({
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
