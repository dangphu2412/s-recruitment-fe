import React, { ReactElement } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea
} from '@chakra-ui/react';
import { TitleLabel } from '../../../../../system/app/internal/components/Text/TitleLabel';
import { TextContent } from '../../../../../system/app/internal/components/Text/TextContent';
import { ScoringStandard } from '../../../../domain/recruitment.usecase';
import { useMarkEmployeeMutation } from '../../../hooks/useMarkEmployeeMutation';
import { useNotify } from '../../../../../system/app/internal/hooks/useNotify';
import { useQueryClient } from 'react-query';
import { RECRUITMENT_EVENT_DETAIL_QUERY_KEY } from '../../../hooks/useQueryRecruitmentEventDetail';
import { useForm } from 'react-hook-form';

type Props = {
  employeeData: Record<string, unknown>;
  standards: ScoringStandard[];
  eventId: number;
  onClose: () => void;
};

type Data = {
  point: string;
  note: string;
};

export function EmployeeMarkerModal({
  onClose,
  employeeData,
  standards = [],
  eventId
}: Props): ReactElement {
  const { markEmployee } = useMarkEmployeeMutation();
  const notify = useNotify();
  const queryClient = useQueryClient();
  const maxPoint = standards.reduce((res, curr) => {
    return res + curr.point;
  }, 0);
  const { register, handleSubmit } = useForm<Data>({
    defaultValues: {
      point: employeeData.myVotedPoint
        ? String(employeeData.myVotedPoint)
        : '0',
      note: (employeeData?.myNote as string) ?? ''
    }
  });

  async function handleMark(data: Data) {
    if (+data.point > maxPoint) {
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
        point: +data.point,
        note: data.note
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
                <Grid
                  key={standard.standard.slice(0, 5)}
                  templateColumns="repeat(6, 1fr)"
                  gap={2}
                >
                  <GridItem colSpan={1}>
                    <TextContent>Point - {standard.point}: </TextContent>
                  </GridItem>

                  <GridItem colSpan={5}>
                    <Text>{standard.standard}</Text>
                  </GridItem>
                </Grid>
              );
            })}
          </div>

          <div className="space-y-4">
            <FormControl>
              <FormLabel>Input your point:</FormLabel>
              <Input
                {...register('point')}
                type={'number'}
                min={0}
                max={maxPoint}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Note down:</FormLabel>
              <Textarea {...register('note')} cols={4} />
            </FormControl>
          </div>
        </ModalBody>

        <ModalFooter className="space-x-2">
          <Button onClick={onClose}>Close</Button>
          <Button colorScheme="pink" onClick={handleSubmit(handleMark)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
