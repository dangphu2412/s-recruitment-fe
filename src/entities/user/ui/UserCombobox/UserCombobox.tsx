import {
  ComboboxProps,
  MultipleCombobox
} from '../../../../shared/ui/Combobox/MultipleCombobox';
import React, { useMemo, useState } from 'react';
import { BoxItem } from '../../../../shared/models/combobox.api';
import { useQueryUsers } from '../../models';
import { useDebounceValue } from '../../../../shared/models/debounce';
import { DEFAULT_PAGINATION } from '../../../../shared/models';

type UserComboboxProps = Omit<ComboboxProps, 'items'>;

/**
 * @description Combobox for selecting users
 */
export function UserCombobox({ value = [], ...rest }: UserComboboxProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounceValue(query);
  const { data } = useQueryUsers({
    query: {
      ...DEFAULT_PAGINATION,
      search: debouncedQuery
    }
  });
  const items: BoxItem[] = useMemo(() => {
    if (!data) return [];

    return data.items.map(user => {
      return {
        text: user.username,
        value: user.id
      };
    });
  }, [data]);

  return (
    <MultipleCombobox
      {...rest}
      value={value}
      onQueryChange={setQuery}
      placeholder={'Search user by username'}
      items={items}
    />
  );
}
