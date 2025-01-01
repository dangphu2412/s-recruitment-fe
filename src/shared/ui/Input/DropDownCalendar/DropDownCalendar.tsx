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
import React, { ReactNode } from 'react';

type DropdownCalendarModel = {
  fromDate: string | '';
  toDate: string | '';
};

type Props = {
  title: ReactNode;
  fromDate: DropdownCalendarModel['fromDate'];
  toDate: DropdownCalendarModel['toDate'];
  onChange: (value: DropdownCalendarModel) => void;
};

export function DropDownCalendarSelection({
  title,
  fromDate,
  toDate,
  onChange
}: Props): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isChanged = fromDate !== '' || toDate !== '';

  function renderTitle() {
    if (fromDate === '' && toDate === '') {
      return title;
    }

    if (!fromDate) {
      return `${title} (Until ${toDate})`;
    }

    if (!toDate) {
      return `${title} (From ${fromDate})`;
    }

    return `${title} (${fromDate} ~ ${toDate})`;
  }

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
            colorScheme={isChanged ? 'teal' : undefined}
            variant="ghost"
            rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
          >
            {renderTitle()}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody>
            <FormLabel>Between</FormLabel>
            <div className={'flex flex-col gap-2'}>
              <Input
                type="date"
                value={fromDate}
                max={toDate}
                onChange={e => {
                  onChange({ fromDate: e.target.value, toDate });
                }}
              />
              And
              <Input
                type="date"
                value={toDate}
                min={fromDate}
                onChange={e => {
                  onChange({ fromDate, toDate: e.target.value });
                }}
              />
            </div>
          </PopoverBody>

          <PopoverFooter className={'text-right'}>
            <Button
              onClick={() => {
                onChange({ fromDate: '', toDate: '' });
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
