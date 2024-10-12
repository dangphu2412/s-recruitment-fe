import React from 'react';
import {
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { FilterDialog } from './FilterDialog/FilterDialog';
import { SearchInput } from './SearchInput/SearchInput';
import { userActions } from 'src/entities/user/models';

export function SearchUsersContainer(): React.ReactElement {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSubmitFilter() {
    dispatch(userActions.setIsSubmitted());
  }

  return (
    <Flex className="pb-2 space-x-2" justifyContent="space-between">
      <SearchInput />

      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <Button>
            <FontAwesomeIcon className="pr-2" icon={faFilter} />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <FilterDialog closePopoverCallback={onClose} />
        </PopoverContent>
      </Popover>

      <Button onClick={handleSubmitFilter}>Search</Button>
    </Flex>
  );
}
