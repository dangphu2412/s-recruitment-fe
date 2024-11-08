import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';

export type PostOverviewView = {
  id: string;
  title: string;
  slug: string;
  content: string;
};
const columnHelper = createColumnHelper<PostOverviewView>();

export function usePostOverviewColumns() {
  return useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Id'
      }),
      columnHelper.accessor('title', {
        header: 'Title'
      }),
      columnHelper.accessor('slug', {
        header: 'Slug'
      })
    ],
    []
  );
}
