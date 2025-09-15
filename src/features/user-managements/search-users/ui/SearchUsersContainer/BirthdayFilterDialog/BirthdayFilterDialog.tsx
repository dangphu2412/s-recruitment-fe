import React from 'react';
import { useUserStore } from '../../../../../../entities/user/models';
import { useTranslate } from '../../../../../../shared/translations/translation';
import {
  Button,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function BirthdayFilterDialog() {
  const value = useUserStore(user => user.overview.filters.birthday);
  const { formatMessage } = useTranslate();
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
            colorScheme={!!value ? 'teal' : undefined}
            variant="ghost"
            rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
          >
            {formatMessage({ id: 'user.birthDay' })}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody className={'space-y-2'}>
            <FormLabel htmlFor={'birthday'}>Birthday</FormLabel>
            <Input
              id={'birthday'}
              type={'month'}
              value={value ?? ''}
              onChange={event => {
                useUserStore.getState().setFilter({
                  birthday: event.target.value
                });
              }}
            />
          </PopoverBody>

          <PopoverFooter className={'flex text-right justify-between'}>
            <Button
              onClick={event => {
                event.preventDefault();
                useUserStore.getState().setFilter({
                  birthday: ''
                });
              }}
            >
              Clear
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}
