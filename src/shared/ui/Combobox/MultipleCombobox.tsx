import { FC, Fragment, ReactElement, useMemo, useState } from 'react';
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { Input, Tag, Text } from '@chakra-ui/react';
import classes from './Combobox.module.scss';
import { ComboboxItem } from './ComboboxItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BoxItem } from '../../models/combobox.api';

type ItemProps = BoxItem;

export type ComboboxProps = {
  name: string;
  items: BoxItem[];
  value: BoxItem[];
  query?: string;
  onChange: (value: BoxItem[]) => void;
  onQueryChange?: (value: string) => void;
  renderItem?: FC<ItemProps>;
  placeholder?: string;
};

export const MultipleCombobox = ({
  name,
  items,
  value,
  placeholder,
  onChange,
  renderItem: Item = ComboboxItem,
  query,
  onQueryChange
}: ComboboxProps): ReactElement => {
  const [internalQuery, setInternalQuery] = useState('');
  const actualQuery = query !== undefined ? query : internalQuery;

  const selectedMap = useMemo(() => {
    return value.reduce<Record<string, boolean>>((map, curr) => {
      map[curr.value] = true;
      return map;
    }, {});
  }, [value]);

  function filter() {
    const cleanedQuery = actualQuery.trim().toLowerCase();

    if ('' === cleanedQuery) {
      return items.filter(item => !selectedMap[item.value]);
    }

    return items.filter(item => {
      return (
        item.text.toLowerCase().includes(cleanedQuery) &&
        !selectedMap[item.value]
      );
    });
  }

  function changeQuery(value: string) {
    if (onQueryChange) {
      onQueryChange(value);
      return;
    }

    setInternalQuery(value);
  }

  const filteredItems = filter();

  function handleRemove(selectedItem: BoxItem | undefined) {
    return () => {
      if (!selectedItem) return;

      onChange(value.filter(item => item.value !== selectedItem.value));
    };
  }

  return (
    <HeadlessCombobox name={name} value={value} onChange={onChange} multiple>
      <div className={'relative space-y-2'}>
        <div className=" space-y-1">
          {value.map(item => {
            return (
              <Tag key={item?.value} className="space-x-2">
                <span>{item?.text}</span>
                <FontAwesomeIcon
                  cursor={'pointer'}
                  icon={faCircleXmark}
                  onClick={handleRemove(item)}
                />
              </Tag>
            );
          })}
        </div>

        <HeadlessCombobox.Input
          as={Input}
          onChange={event => changeQuery(event.target.value)}
          placeholder={placeholder}
          displayValue={(item: BoxItem) => item.text}
          required={false}
        />

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setInternalQuery('')}
        >
          <HeadlessCombobox.Options className={classes['option-container']}>
            {filteredItems.map(item => (
              <HeadlessCombobox.Option
                key={item.value}
                value={item}
                as={Text}
                fontSize="md"
                fontWeight="semibold"
              >
                <Item text={item.text} value={item.value} />
              </HeadlessCombobox.Option>
            ))}
          </HeadlessCombobox.Options>
        </Transition>
      </div>
    </HeadlessCombobox>
  );
};
