import { FC, Fragment, ReactElement, useState } from 'react';
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { Input } from '@chakra-ui/react';
import classes from './Combobox.module.scss';
import { ComboboxItem } from './ComboboxItem';
import { BoxItem } from '../../models/combobox.api';

type ItemProps = BoxItem;

type ComboboxProps = {
  name: string;
  items: BoxItem[];
  value: string;
  onChange: (value: string) => void;
  renderItem?: FC<ItemProps>;
  placeholder?: string;
};

export const Combobox = ({
  name,
  items,
  value,
  placeholder,
  onChange,
  renderItem: Item = ComboboxItem
}: ComboboxProps): ReactElement => {
  const [query, setQuery] = useState('');
  const filteredItems =
    query === ''
      ? items
      : items.filter(item => {
          return item.text.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <HeadlessCombobox name={name} value={value} onChange={e => onChange(e)}>
      <div className={'relative'}>
        <HeadlessCombobox.Input
          as={Input}
          onChange={event => setQuery(event.target.value)}
          placeholder={placeholder}
          displayValue={() =>
            filteredItems.find(item => item.value === value)?.text ?? ''
          }
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
