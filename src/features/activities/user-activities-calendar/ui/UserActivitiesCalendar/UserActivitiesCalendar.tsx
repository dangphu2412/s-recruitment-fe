import * as React from 'react';
import { useMemo, useState } from 'react';
import { endOfDay, startOfMonth } from 'date-fns';
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
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { RequestDayText } from '../../../../../entities/activities/ui/RequestDayText/RequestDayText';

export function UserActivitiesCalendar() {
  const fromDate = useActivityStore(state => state.fromDate);
  const submitValues = useActivityStore(state => state.submitValues);
  const currentMonth = startOfMonth(fromDate);
  const [selectedDays, setSelectedDays] = useState<CalendarItem[] | null>(null);

  const { data } = useActivityQuery();
  const events = useMemo(
    () => mapToCalendarItems(data, currentMonth),
    [data, currentMonth]
  );

  function handleChangeMonth(date: Date) {
    submitValues({
      fromDate: date,
      toDate: endOfDay(date)
    });
  }

  function handleClose() {
    setSelectedDays(null);
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

              return (
                <div
                  className={'cursor-pointer'}
                  onClick={() => setSelectedDays(items)}
                >
                  <hr />
                  <p>{working ? <strong>{working}</strong> : 0} workings</p>
                  <p>{late ? <strong>{late}</strong> : 0} late</p>
                  <p>{absence ? <strong>{absence}</strong> : 0} absence</p>
                </div>
              );
            }}
          />
        </MonthlyBody>
      </MonthlyCalendar>

      <Modal isOpen={selectedDays !== null} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registered detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul>
              {selectedDays?.map((item, index) => {
                return (
                  <li key={index}>
                    <p>
                      {item.requestType} - {item?.author?.email}
                    </p>
                    <RequestDayText
                      {...item}
                      dayOfWeekName={item.dayOfWeek?.name}
                      timeOfDayName={item.timeOfDay?.name}
                    />
                  </li>
                );
              })}
            </ul>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
