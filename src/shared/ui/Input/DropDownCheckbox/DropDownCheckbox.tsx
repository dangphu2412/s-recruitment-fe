import {
  Button,
  Checkbox,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { ReactNode, Key } from 'react';

type DropdownCheckBoxModel<ID> = {
  id: ID;
  name: string;
};

type Props<ID> = {
  title: ReactNode;
  value: DropdownCheckBoxModel<ID>['id'][];
  options: DropdownCheckBoxModel<ID>[];
  onSelect: (value: DropdownCheckBoxModel<ID>) => void;
};

export function DropDownMultipleCheckboxSelection<T extends Key>({
  title,
  value,
  options,
  onSelect
}: Props<T>): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <Button
            colorScheme={value?.length ? 'teal' : undefined}
            variant="ghost"
            rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
          >
            {title} {value?.length ? `(${value.length})` : ''}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody>
            <div className={'flex flex-col gap-2'}>
              {(options ?? []).map(option => {
                return (
                  <Checkbox
                    key={option.id}
                    onChange={() => {
                      onSelect(option);
                    }}
                    isChecked={value?.includes(option.id)}
                    className={'px-2 py-1 hover:bg-slate-100'}
                  >
                    {option.name}
                  </Checkbox>
                );
              })}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
