import { useCommonCRUDContext, useQueryResource } from './CommonCRUDContext';
import { BasicTable } from '../../shared/ui';
import { EMPTY_ARRAY } from '../../shared/config';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

type Props<E> = {
  columns: ColumnDef<E, any>[];
};

export function CommonViewEntityTable<E>({ columns }: Props<E>) {
  const query = useCommonCRUDContext(state => state.searchValues.query);
  const { data, isFetching } = useQueryResource();
  const items = useMemo(() => {
    if (query && data?.items) {
      return data.items.filter(item => {
        for (const key in item) {
          if (
            item[key]?.toString().toLowerCase().includes(query.toLowerCase())
          ) {
            return true;
          }
        }

        return false;
      });
    }

    return data?.items ?? EMPTY_ARRAY;
  }, [data, query]);

  return <BasicTable columns={columns} items={items} isLoading={isFetching} />;
}
