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
import React, { ReactNode } from 'react';

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

export function DropDownMultipleCheckboxSelection<T>({
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
            colorScheme={value.length ? 'teal' : undefined}
            variant="ghost"
            rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
          >
            {title} {value.length ? `(${value.length})` : ''}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody>
            <div className={'grid grid-cols-2 gap-1'}>
              {(options ?? []).map(option => {
                return (
                  <Checkbox
                    onChange={() => {
                      onSelect(option);
                    }}
                    isChecked={value.includes(option.id)}
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
