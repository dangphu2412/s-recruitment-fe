import { addMonths, format, getYear, startOfMonth, subMonths } from 'date-fns';
import React from 'react';
import { useMonthlyCalendar } from '@zach.codes/react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Button, Text } from '@chakra-ui/react';

export function UserActivitiesMonthlyNav() {
  const { locale, currentMonth, onCurrentMonthChange } = useMonthlyCalendar();

  return (
    <div className="flex justify-end items-center gap-4">
      <Button
        variant={'ghost'}
        onClick={() => onCurrentMonthChange(subMonths(currentMonth, 1))}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>

      <Text
        fontSize={'md'}
        className="font-bold text-center"
        title="Current Month"
      >
        {format(
          currentMonth,
          getYear(currentMonth) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy',
          { locale }
        )}
      </Text>

      <Button
        onClick={() => onCurrentMonthChange(addMonths(currentMonth, 1))}
        variant={'ghost'}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>

      <Button
        variant={'outline'}
        onClick={() => onCurrentMonthChange(startOfMonth(new Date()))}
      >
        Today
      </Button>
    </div>
  );
}
