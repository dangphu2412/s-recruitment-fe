import React, { Fragment, ReactElement, useRef } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  FormLabel,
  Grid,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { TitleLabel } from '../../../../../system/app/internal/components/Text/TitleLabel';
import { TextContent } from '../../../../../system/app/internal/components/Text/TextContent';
import { ScoringStandard } from '../../../../domain/recruitment.usecase';
import { useMarkEmployeeMutation } from '../../../hooks/useMarkEmployeeMutation';
import { useNotify } from '../../../../../system/app/internal/hooks/useNotify';
import { useQueryClient } from 'react-query';
import { RECRUITMENT_EVENT_DETAIL_QUERY_KEY } from '../../../hooks/useQueryRecruitmentEventDetail';

type Props = {
  employeeData: Record<string, unknown>;
  standards: ScoringStandard[];
  eventId: number;
  onClose: () => void;
};

export function EmployeeMarkerModal({
  onClose,
  employeeData,
  standards = [],
  eventId
}: Props): ReactElement {
  const markPointRef = useRef<HTMLInputElement | null>(null);
  const { markEmployee } = useMarkEmployeeMutation();
  const notify = useNotify();
  const queryClient = useQueryClient();
  const maxPoint = standards.reduce((res, curr) => {
    return res + curr.point;
  }, 0);

  async function handleMark() {
    const value = markPointRef.current?.value as string;

    if (!value) {
      notify({
        title: 'Not allow to input empty',
        status: 'error'
      });
      return;
    }

    if (+value > maxPoint) {
      notify({
        title: `Your point exceed the max ${maxPoint}`,
        status: 'error'
      });
      return;
    }

    markEmployee(
      {
        eventId,
        employeeId: employeeData.id as string,
        point: +value
      },
      {
        onSuccess: () => {
          notify({
            title: 'Mark success',
            status: 'success'
          });
          queryClient.refetchQueries([
            RECRUITMENT_EVENT_DETAIL_QUERY_KEY,
            eventId
          ]);
          onClose();
        },
        onError: () => {
          notify({
            title: 'Mark fail',
            status: 'error'
          });
          onClose();
        }
      }
    );
  }

  return (
    <Modal isOpen={true} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mark point for your employee</ModalHeader>

        <ModalBody className="space-y-4">
          <TitleLabel>Employee information</TitleLabel>

          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>Click to view detail</AccordionButton>
              <AccordionPanel pb={4}>
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  {Object.keys(employeeData).map(prop => {
                    return (
                      <div key={prop}>
                        <TitleLabel>{prop}</TitleLabel>
                        <div>{employeeData[prop] as string}</div>
                      </div>
                    );
                  })}
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <div>
            <TitleLabel>This recruitment standard</TitleLabel>

            {standards.map(standard => {
              return (
                <Fragment key={standard.point}>
                  <HStack>
                    <TextContent className={'w-[5rem]'}>
                      Point - {standard.point}:{' '}
                    </TextContent>
                    <Text>{standard.standard}</Text>
                  </HStack>
                </Fragment>
              );
            })}
          </div>

          <div>
            <FormLabel>Input your point:</FormLabel>
            <Input
              ref={markPointRef}
              type={'number'}
              min={0}
              max={maxPoint}
              defaultValue={
                employeeData.myVotedPoint
                  ? String(employeeData.myVotedPoint)
                  : '0'
              }
            />
          </div>
        </ModalBody>

        <ModalFooter className="space-x-2">
          <Button onClick={onClose}>Close</Button>
          <Button colorScheme="pink" onClick={handleMark}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
