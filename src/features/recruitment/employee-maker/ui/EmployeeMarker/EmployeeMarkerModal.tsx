import React, { ReactElement } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  FormControl,
  FormErrorMessage,
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
import { ScoringStandard } from '../../../../../entities/recruitment/api/recruitment.usecase';
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
import { number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  id: string;
  standards: ScoringStandard[];
  eventId: number;
  myVotedPoint: number;
  myNote: string;
  onClose: () => void;
  [key: string]: unknown;
};

type FormInputs = {
  point: number;
  maxPoint: number;
  note: string;
};

const formValidation = object({
  maxPoint: number(),
  point: number()
    .typeError('Point must not be empty')
    .min(1, 'Min is 1')
    .required('Point must not be empty')
    .test({
      name: 'point',
      test: (value, context) => {
        const { maxPoint } = context.parent as FormInputs;

        if (!value) {
          return false;
        }

        if (value <= maxPoint) {
          return true;
        }

        return context.createError({
          message: `Point must not exceed the max point ${maxPoint}`
        });
      }
    }),
  note: string().optional()
});

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      point: myVotedPoint ? myVotedPoint : 0,
      note: (myNote as string) ?? '',
      maxPoint: standards.reduce((res, curr) => {
        return res + curr.point;
      }, 0)
    },
    resolver: yupResolver(formValidation)
  });

  async function handleMark(data: FormInputs) {
    markEmployee(
      {
        eventId,
        employeeId: id as string,
        point: data.point,
        note: data.note
      },
      {
        onSuccess: () => {
          notify({
            title: 'Mark success',
            status: 'success'
          });
          queryClient.invalidateQueries({
            queryKey: [RECRUITMENT_EVENT_DETAIL_QUERY_KEY]
          });
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
              <AccordionButton>
                <span className={'flex-1 text-left'}>View detail</span>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  {Object.keys(data as Record<string, unknown>).map(prop => {
                    return (
                      <div key={prop}>
                        <TitleLabel>{prop}</TitleLabel>
                        <div>
                          {(
                            (data as Record<string, string>)[prop] as string
                          ).toString()}
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
                    <Text fontSize={'lg'} fontWeight={'medium'}>
                      Point {standard.point}
                    </Text>

                    <Text fontSize={'md'} className={'col-span-2'}>
                      {standard.standard}
                    </Text>

                    <Text fontSize={'sm'} className={'col-span-2'}>
                      {standard.description}
                    </Text>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <FormControl isInvalid={!!errors.point}>
              <FormLabel>Employee Point</FormLabel>
              <Input
                {...register('point')}
                type={'number'}
                min={0}
                max={maxPoint}
              />

              {errors.point && (
                <FormErrorMessage>{errors.point.message}</FormErrorMessage>
              )}
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
