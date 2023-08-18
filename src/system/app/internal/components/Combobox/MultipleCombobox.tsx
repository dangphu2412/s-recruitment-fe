import { FC, Fragment, ReactElement, useMemo, useState } from 'react';
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { Input, Tag } from '@chakra-ui/react';
import classes from './Combobox.module.scss';
import { ComboboxItem } from './ComboboxItem';
import { BoxItem } from '../../../../domain/clients/combobox.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

type ItemProps = BoxItem;

type ComboboxProps = {
  name: string;
  items: BoxItem[];
  value: string[];
  onChange: (value: string[]) => void;
  renderItem?: FC<ItemProps>;
  placeholder?: string;
};

export const MultipleCombobox = ({
  name,
  items,
  value,
  placeholder,
  onChange,
  renderItem: Item = ComboboxItem
}: ComboboxProps): ReactElement => {
  const [query, setQuery] = useState('');
  const selectedMap = useMemo(() => {
    return value.reduce<Record<string, boolean>>((map, curr) => {
      map[curr] = true;
      return map;
    }, {});
  }, [value]);

  function filter() {
    const cleanedQuery = query.trim().toLowerCase();
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

  const filteredItems = filter();

  function handleRemove(selectedItem: BoxItem) {
    return () => {
      onChange(value.filter(item => item !== selectedItem.value));
    };
  }

  return (
    <HeadlessCombobox name={name} value={value} onChange={onChange} multiple>
      <div className={'relative space-y-2'}>
        <div className="space-x-2">
          {value.map(item => {
            const valueItem = items.find(i => i.value === item) as BoxItem;

            return (
              <Tag key={valueItem.value} className="space-x-2">
                <span>{valueItem.text}</span>
                <FontAwesomeIcon
                  cursor={'pointer'}
                  icon={faCircleXmark}
                  onClick={handleRemove(valueItem)}
                />
              </Tag>
            );
          })}
        </div>

        <HeadlessCombobox.Input
          as={Input}
          onChange={event => setQuery(event.target.value)}
          placeholder={placeholder}
          displayValue={(item: BoxItem) => item.text}
        />

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <HeadlessCombobox.Options className={classes['option-container']}>
            {filteredItems.map(item => (
              <HeadlessCombobox.Option key={item.value} value={item.value}>
                <Item text={item.text} value={item.value} />
              </HeadlessCombobox.Option>
            ))}
          </HeadlessCombobox.Options>
        </Transition>
      </div>
    </HeadlessCombobox>
  );
};
