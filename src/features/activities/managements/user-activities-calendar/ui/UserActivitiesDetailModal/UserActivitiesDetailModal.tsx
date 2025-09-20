import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
import { RequestDayText } from '../../../../../../entities/activities/ui/RequestDayText/RequestDayText';
import * as React from 'react';
import { Fragment, useMemo } from 'react';
import {
  CalendarItem,
  groupCalendarItemsByRequestType
} from '../../models/user-activities-calendar.model';

type Props = {
  selectedDays: CalendarItem[] | null;
  onClose: () => void;
};

export function UserActivitiesDetailModal({ selectedDays, onClose }: Props) {
  const groupedItems = useMemo(
    () => (selectedDays ? groupCalendarItemsByRequestType(selectedDays) : {}),
    [selectedDays]
  );

  return (
    <Modal isOpen={selectedDays !== null} onClose={onClose} size={'3xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registered detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion defaultIndex={[0]} allowMultiple>
            {Object.keys(groupedItems).map(requestType => {
              return (
                <AccordionItem key={requestType}>
                  <AccordionButton className="flex flex-row justify-between font-bold">
                    <p>{requestType}</p>
                    <AccordionIcon />
                  </AccordionButton>

                  <GroupItems items={groupedItems[requestType]} />
                </AccordionItem>
              );
            })}
          </Accordion>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

type GroupItemProps = {
  items: CalendarItem[];
};

function GroupItems({ items }: GroupItemProps) {
  return (
    <>
      {items.map(item => {
        return (
          <AccordionPanel pb={4}>
            <Text fontSize={'lg'}>
              {item?.author?.fullName} - {item?.author?.email}
            </Text>
            <RequestDayText
              {...item}
              dayOfWeekName={item.dayOfWeek?.name}
              timeOfDayName={item.timeOfDay?.name}
            />
          </AccordionPanel>
        );
      })}
    </>
  );
}
