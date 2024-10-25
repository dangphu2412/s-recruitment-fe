import {
  ComboboxProps,
  MultipleCombobox
} from '../../../../shared/ui/Combobox/MultipleCombobox';
import React, { useMemo, useState } from 'react';
import { BoxItem } from '../../../../shared/models/combobox.api';
import { useQueryUsers } from '../../models';
import { useDebounceValue } from '../../../../shared/models/debounce';
import { FilterKey } from '../../../../shared/config';
import { DEFAULT_PAGINATION } from '../../../../shared/models';

type UserComboboxProps = Omit<ComboboxProps, 'items'>;

/**
 * @description Combobox for selecting users
 */
export function UserCombobox({ value = [], ...rest }: UserComboboxProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounceValue(query);
  const { data } = useQueryUsers({
    filters: {
      query: {
        type: FilterKey.LIKE,
        value: debouncedQuery
      },
      userStatus: {
        type: FilterKey.EXACT,
        value: []
      },
      joinedIn: {
        type: FilterKey.RANGE,
        value: {
          fromDate: null,
          toDate: null
        }
      }
    },
    pagination: DEFAULT_PAGINATION
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
