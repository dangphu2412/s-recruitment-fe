import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { UserCombobox } from '../UserCombobox/UserCombobox';
import { BoxItem } from '../../../../shared/models/combobox.api';

type Props = {
  name: string;
  value: BoxItem[];
  onChange: (value: BoxItem[]) => void;
};

export function UserFilterDropdown({ name, value, onChange }: Props) {
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
            {name} {value?.length ? `(${value.length})` : ''}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody>
            <UserCombobox value={value} name={name} onChange={onChange} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
