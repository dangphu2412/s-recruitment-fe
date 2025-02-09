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
import {
  endOfDay,
  isSameDay,
  isToday,
  startOfDay,
  subMonths,
  subWeeks,
  subYears
} from 'date-fns';

type DropdownCalendarModel = {
  fromDate: Date | null;
  toDate: Date | null;
};

type Props = {
  title: ReactNode;
  showApplyButton?: boolean;
  fromDate: DropdownCalendarModel['fromDate'];
  toDate: DropdownCalendarModel['toDate'];
  onChange: (value: DropdownCalendarModel) => void;
  onApply?: () => void;
};

export function DropDownCalendarSelection({
  title,
  showApplyButton,
  onApply,
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
                colorScheme={
                  fromDate !== null && isToday(fromDate) ? 'teal' : undefined
                }
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
                colorScheme={
                  fromDate !== null &&
                  isSameDay(fromDate, subWeeks(new Date(), 1))
                    ? 'teal'
                    : undefined
                }
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
                colorScheme={
                  fromDate !== null &&
                  isSameDay(fromDate, subMonths(new Date(), 1))
                    ? 'teal'
                    : undefined
                }
                onClick={() => {
                  onChange({
                    fromDate: subMonths(new Date(), 1),
                    toDate: endOfDay(new Date())
                  });
                }}
              >
                1 month
              </Tag>

              <Tag
                colorScheme={
                  fromDate !== null &&
                  isSameDay(fromDate, subYears(new Date(), 1))
                    ? 'teal'
                    : undefined
                }
                onClick={() => {
                  onChange({
                    fromDate: subYears(new Date(), 1),
                    toDate: endOfDay(new Date())
                  });
                }}
              >
                1 year
              </Tag>
            </div>

            <div className={'flex flex-col gap-2'}>
              <div>
                <FormLabel>From date</FormLabel>
                <ReactDatePicker
                  placeholderText={'Select date'}
                  customInput={<Input />}
                  selected={fromDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={date => {
                    onChange({
                      fromDate: date,
                      toDate: toDate
                    });
                  }}
                />
              </div>

              <div>
                <FormLabel>To date</FormLabel>
                <ReactDatePicker
                  placeholderText={'Select date'}
                  customInput={<Input />}
                  selected={toDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={date => {
                    onChange({
                      fromDate: fromDate,
                      toDate: date
                    });
                  }}
                />
              </div>
            </div>
          </PopoverBody>

          <PopoverFooter className={'flex text-right justify-between'}>
            <Button
              onClick={() => {
                onChange({ fromDate: null, toDate: null });
              }}
            >
              Clear
            </Button>

            {showApplyButton && (
              <Button
                onClick={() => {
                  onApply?.();
                }}
              >
                Apply
              </Button>
            )}
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}
