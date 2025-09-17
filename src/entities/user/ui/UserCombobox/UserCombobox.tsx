import { ComboboxProps } from '../../../../shared/ui/Combobox/MultipleCombobox';
import React, { useMemo, useState } from 'react';
import { BoxItem } from '../../../../shared/models/combobox.api';
import { useQueryUsers } from '../../models';
import { useDebounceValue } from '../../../../shared/models/debounce';
import { DEFAULT_PAGINATION } from '../../../../shared/models';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

type UserComboboxProps = Omit<ComboboxProps, 'items'>;

/**
 * @description Combobox for selecting users
 */
export function UserCombobox({
  value = [],
  ...rest
}: Readonly<UserComboboxProps>) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounceValue(query);
  const { data } = useQueryUsers({
    query: {
      ...DEFAULT_PAGINATION,
      search: debouncedQuery
    }
  });

  const items = useMemo(() => {
    const selectedMap = new Map<string, BoxItem>(
      value.map(item => [item.value, item])
    );

    if (!data) {
      return [];
    }

    return data.items
      .map(user => {
        return {
          text: user.fullName,
          value: user.id,
          helperText: user.email,
          isSelected: selectedMap.has(user.id)
        };
      })
      .sort((a, b) => {
        if (a.isSelected && b.isSelected) {
          return 0;
        }

        if (a.isSelected) {
          return -1;
        }

        return 1;
      });
  }, [data, value]);

  function handleRemove(selectedItem: BoxItem | undefined) {
    return () => {
      if (!selectedItem) {
        return;
      }

      rest.onChange(value.filter(item => item.value !== selectedItem.value));
    };
  }

  function handleAdd(selectedItem: BoxItem | undefined) {
    return () => {
      if (!selectedItem) {
        return;
      }

      rest.onChange([...value, selectedItem]);
    };
  }

  return (
    <div className={'max-h-96 flex flex-col gap-2'}>
      <Text fontWeight={'medium'}>Filter by user</Text>

      <Input
        className={'h-full'}
        id={'search-user'}
        name={'search-user'}
        placeholder={'Search by email or full name'}
        onChange={e => setQuery(e.target.value)}
      />

      <div className={'space-y-2 overflow-y-auto max-h-64'}>
        {items.map(item => {
          return (
            <div
              key={item.value}
              className={classNames(
                'flex gap-1 px-2 py-1 items-center w-full justify-between hover:bg-slate-200 rounded',
                item.isSelected && 'bg-slate-200 '
              )}
            >
              <Box className={'flex flex-col gap-1'} onClick={handleAdd(item)}>
                <Text fontWeight={'medium'} fontSize={'sm'}>
                  {item.text}
                </Text>
                {item.helperText && (
                  <Text fontWeight={'light'} fontSize={'sm'}>
                    {item.helperText}
                  </Text>
                )}
              </Box>

              {item.isSelected && (
                <FontAwesomeIcon
                  cursor={'pointer'}
                  icon={faCircleXmark}
                  onClick={handleRemove(item)}
                />
              )}
            </div>
          );
        })}
      </div>

      <div>
        <Button
          onClick={() => {
            rest.onChange([]);
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
