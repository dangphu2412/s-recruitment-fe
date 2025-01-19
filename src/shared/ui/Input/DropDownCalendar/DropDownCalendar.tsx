import {
  Button,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Tag,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { ReactNode } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { endOfDay, startOfDay, subMonths, subWeeks } from 'date-fns';

type DropdownCalendarModel = {
  fromDate: Date | null;
  toDate: Date | null;
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
  const isChanged = fromDate !== null || toDate !== null;

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
            {title}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody className={'space-y-2'}>
            <FormLabel>Date range</FormLabel>

            <div className={'flex gap-1 cursor-pointer'}>
              <Tag
                onClick={() => {
                  onChange({
                    fromDate: startOfDay(new Date()),
                    toDate: endOfDay(new Date())
                  });
                }}
              >
                Today
              </Tag>
              <Tag
                onClick={() => {
                  onChange({
                    fromDate: subWeeks(new Date(), 1),
                    toDate: endOfDay(new Date())
                  });
                }}
              >
                1 week
              </Tag>
              <Tag
                onClick={() => {
                  onChange({
                    fromDate: subMonths(new Date(), 1),
                    toDate: endOfDay(new Date())
                  });
                }}
              >
                1 month
              </Tag>
            </div>

            <div className={'flex flex-col gap-2'}>
              <ReactDatePicker
                placeholderText={'Select date'}
                customInput={<Input />}
                selectsRange
                startDate={fromDate}
                endDate={toDate}
                dateFormat="dd/MM/yyyy"
                onChange={dates => {
                  onChange({
                    fromDate: dates[0],
                    toDate: dates[1]
                  });
                }}
              />
            </div>
          </PopoverBody>

          <PopoverFooter className={'text-right'}>
            <Button
              onClick={() => {
                onChange({ fromDate: null, toDate: null });
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
