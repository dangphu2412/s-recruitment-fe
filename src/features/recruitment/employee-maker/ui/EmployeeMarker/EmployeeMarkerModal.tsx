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
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import {
  Employee,
  ScoringStandard
} from '../../../../../entities/recruitment/api/recruitment.usecase';
import { useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNotify } from '../../../../../shared/models/notify';
import { TitleLabel } from '../../../../../shared/ui/Text/TitleLabel';
import {
  RECRUITMENT_EVENT_DETAIL_QUERY_KEY,
  useMarkEmployeeMutation
} from '../../../../../entities/recruitment/models';
import { TextEditor } from '../../../../../widgets/text-editor/TextEditor';
import {
  getLastEdit,
  saveLastEdit
} from '../../../../../entities/recruitment/models/local-editor';
import { useUserSession } from '../../../../../entities/user/models';

type Props = Employee & {
  standards: ScoringStandard[];
  eventId: number;
  onClose: () => void;
};

type FormInputs = {
  point: string;
  note: string;
};

export function EmployeeMarkerModal({
  onClose,
  data,
  myVotedPoint,
  myNote,
  id,
  standards = [],
  eventId
}: Props): ReactElement {
  const { markEmployee } = useMarkEmployeeMutation();
  const { user } = useUserSession();
  const notify = useNotify();
  const queryClient = useQueryClient();
  const maxPoint = standards.reduce((res, curr) => {
    return res + curr.point;
  }, 0);
  const { register, handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      point: myVotedPoint ? String(myVotedPoint) : '0',
      note: (myNote as string) ?? ''
    }
  });

  async function handleMark(data: FormInputs) {
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
        employeeId: id as string,
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
    <Modal isOpen={true} onClose={onClose} size="full">
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
                  {Object.keys(data).map(prop => {
                    return (
                      <div key={prop}>
                        <TitleLabel>{prop}</TitleLabel>
                        <div>
                          {(data as Record<string, string>)[prop] as string}
                        </div>
                      </div>
                    );
                  })}
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <div className={'space-y-2'}>
            <TitleLabel>Standards</TitleLabel>

            <div className={'grid grid-cols-2 gap-2'}>
              {standards.map(standard => {
                return (
                  <div key={standard.standard.slice(0, 5)}>
                    <Text fontSize={'md'} fontWeight={'medium'}>
                      Point {standard.point}
                    </Text>

                    <Text fontSize={'sm'} className={'col-span-2'}>
                      {standard.standard}
                    </Text>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <FormControl>
              <FormLabel>Employee Point</FormLabel>
              <Input
                {...register('point')}
                type={'number'}
                min={0}
                max={maxPoint}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Remark</FormLabel>
              <Controller
                control={control}
                render={({ field }) => {
                  return (
                    <TextEditor
                      defaultValue={
                        getLastEdit({
                          employId: id,
                          userId: user?.id as string
                        }) ?? myNote
                      }
                      onChange={value => {
                        field.onChange(value);
                        saveLastEdit(
                          {
                            employId: id,
                            userId: user?.id as string
                          },
                          value
                        );
                      }}
                    />
                  );
                }}
                name={'note'}
              />
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
