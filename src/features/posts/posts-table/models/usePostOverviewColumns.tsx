import { Column } from 'react-table';
import { useMemo } from 'react';

export type PostOverviewView = {
  id: string;
  title: string;
  slug: string;
  content: string;
};

export function usePostOverviewColumns(): Column<PostOverviewView>[] {
  return useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Slug',
        accessor: 'slug'
      }
    ],
    []
  );
}
