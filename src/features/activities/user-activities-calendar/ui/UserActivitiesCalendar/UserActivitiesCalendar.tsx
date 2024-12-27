import * as React from 'react';
import { useMemo, useState } from 'react';
import { endOfMonth, startOfMonth } from 'date-fns';
import {
  MonthlyBody,
  MonthlyCalendar,
  MonthlyDay,
  MonthlyNav
} from '@zach.codes/react-calendar';
import {
  useActivityQuery,
  useActivityStore
} from '../../../../../entities/activities/models/activity.model';
import {
  accumulateTotalActivities,
  CalendarItem,
  mapToCalendarItems
} from '../../models/user-activities-calendar.model';
import { Tag, Text } from '@chakra-ui/react';
import { UserActivitiesDetailModal } from '../UserActivitiesDetailModal/UserActivitiesDetailModal';
import classNames from 'classnames';

export function UserActivitiesCalendar() {
  const fromDate = useActivityStore(state => state.fromDate);
  const currentMonth = startOfMonth(fromDate);

  const [selectedDays, setSelectedDays] = useState<CalendarItem[] | null>(null);

  const { data } = useActivityQuery();
  const events = useMemo(
    () => mapToCalendarItems(data, currentMonth),
    [data, currentMonth]
  );

  const submitValues = useActivityStore(state => state.submitValues);

  function handleChangeMonth(date: Date) {
    submitValues({
      fromDate: startOfMonth(date),
      toDate: endOfMonth(date)
    });
  }

  return (
    <>
      <Text variant="h1">Registered working hours</Text>

      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={handleChangeMonth}
      >
        <MonthlyNav />

        <MonthlyBody events={events}>
          <MonthlyDay<CalendarItem>
            renderDay={items => {
              const { absence, late, working } =
                accumulateTotalActivities(items);

              function renderTag(
                value: number,
                text: string,
                colorScheme: string
              ) {
                if (!value) {
                  return null;
                }

                return (
                  <Tag colorScheme={colorScheme} className={'space-x-2'}>
                    <strong>{value}</strong>
                    <span>{text}</span>
                  </Tag>
                );
              }

              return (
                <div
                  className={classNames(
                    'cursor-pointer flex flex-col gap-2 py-2'
                  )}
                  onClick={() => setSelectedDays(items)}
                >
                  {renderTag(working, 'workings', 'green')}
                  {renderTag(late, 'late', 'red')}
                  {renderTag(absence, 'absence', 'yellow')}
                </div>
              );
            }}
          />
        </MonthlyBody>
      </MonthlyCalendar>

      <UserActivitiesDetailModal
        selectedDays={selectedDays}
        onClose={() => setSelectedDays(null)}
      />
    </>
  );
}
