import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import {
  SubmitHandler,
  useController,
  useFieldArray,
  useForm
} from 'react-hook-form';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import {
  RECRUITMENT_EVENT_QUERY_KEY,
  useCreateRecruitmentEventMutation
} from 'src/entities/recruitment/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQueryClient } from 'react-query';
import { useNotify } from 'src/shared/models/notify';
import { UserCombobox } from 'src/entities/user/ui/UserCombobox/UserCombobox';
import {
  mapFormToApiRequest,
  newEventValidationSchema,
  NewRecruitmentEventFormModal
} from '../../models/new-event.model';

type AddUserDrawerProps = Pick<UseDisclosureApi, 'onClose'>;
const defaultScoreStandard = {
  point: 0,
  standard: '',
  description: ''
};

export function AddNewEventDrawer({
  onClose
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset
  } = useForm<NewRecruitmentEventFormModal>({
    mode: 'onChange',
    resolver: yupResolver(newEventValidationSchema),
    defaultValues: {
      name: '',
      examiners: [],
      scoreStandards: [defaultScoreStandard]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'scoreStandards'
  });
  const notify = useNotify();
  const queryClient = useQueryClient();
  const { createRecruitmentEvent } = useCreateRecruitmentEventMutation();

  const { field: examinersProps } = useController({
    name: 'examiners',
    control
  });

  const saveUser: SubmitHandler<NewRecruitmentEventFormModal> = formInputs => {
    createRecruitmentEvent(mapFormToApiRequest(formInputs), {
      onSuccess: () => {
        notify({
          title: 'Create event success',
          status: 'success'
        });
        queryClient.refetchQueries(RECRUITMENT_EVENT_QUERY_KEY);
        reset();
        onClose();
      }
    });
  };

  return (
    <>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create new S-Group Recruitment Event</DrawerHeader>

        <DrawerBody className="space-y-6">
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder={'Start create new events ...'}
              {...register('name')}
            />

            {errors.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.examiners}>
            <FormLabel>Examiners</FormLabel>
            <UserCombobox {...examinersProps} />

            {errors.examiners && (
              <FormErrorMessage>{errors.examiners.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.location}>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder={'Input your location organizing ...'}
              {...register('location')}
            />

            {errors.location && (
              <FormErrorMessage>{errors.location.message}</FormErrorMessage>
            )}
          </FormControl>

          <Grid templateColumns={'repeat(2, 1fr)'} gap={4}>
            <GridItem>
              <FormControl
                isRequired
                isInvalid={!!errors.recruitmentRange?.fromDate}
              >
                <FormLabel>From date</FormLabel>
                <Input
                  placeholder={'Recruit from date'}
                  {...register('recruitmentRange.fromDate')}
                  type="date"
                />

                {errors.recruitmentRange?.fromDate && (
                  <FormErrorMessage>
                    {errors.recruitmentRange?.fromDate?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl
                isRequired
                isInvalid={!!errors.recruitmentRange?.toDate}
              >
                <FormLabel>To Date</FormLabel>
                <Input
                  placeholder={'Input your location organizing ...'}
                  {...register('recruitmentRange.toDate')}
                  type="date"
                />

                {errors.recruitmentRange?.toDate && (
                  <FormErrorMessage>
                    {errors.recruitmentRange?.toDate?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl isRequired className={'space-y-2'}>
            <div className={'flex justify-between'}>
              <FormLabel>Standard</FormLabel>

              <Button
                colorScheme={'pink'}
                onClick={() => append(defaultScoreStandard)}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </Button>
            </div>

            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <div className="grid grid-cols-3 gap-2">
                    <FormControl
                      isRequired
                      isInvalid={!!errors.scoreStandards?.[index]?.point}
                      className="col-span-1 space-y-2"
                    >
                      <Text fontSize={'sm'}>Point</Text>
                      <Input
                        className={'max-w-12'}
                        placeholder={'Input your point ...'}
                        type="number"
                        {...register(`scoreStandards.${index}.point`)}
                      />

                      {errors.scoreStandards?.[index]?.point && (
                        <FormErrorMessage>
                          {errors.scoreStandards?.[index]?.point?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={!!errors.scoreStandards?.[index]?.standard}
                      className="col-span-2 space-y-2"
                    >
                      <Text fontSize={'sm'}>Standard</Text>

                      <Textarea
                        placeholder={'Input your standard ...'}
                        rows={1}
                        {...register(`scoreStandards.${index}.standard`)}
                      />

                      {errors.scoreStandards?.[index]?.standard && (
                        <FormErrorMessage>
                          {errors.scoreStandards?.[index]?.standard?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={!!errors.scoreStandards?.[index]?.description}
                      className="col-span-3 space-y-2"
                    >
                      <Text fontSize={'sm'}>Description</Text>

                      <Textarea
                        placeholder={'Input your description ...'}
                        rows={1}
                        {...register(`scoreStandards.${index}.description`)}
                      />

                      {errors.scoreStandards?.[index]?.description && (
                        <FormErrorMessage>
                          {errors.scoreStandards?.[index]?.description?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <div className={'flex items-end'}>
                      <Button
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.passPoint}>
            <FormLabel>Pass point</FormLabel>
            <Input
              placeholder={'Input your pass point ...'}
              type={'number'}
              {...register('passPoint')}
            />

            {errors.passPoint && (
              <FormErrorMessage>{errors.passPoint.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.file}>
            <FormLabel htmlFor="file">File</FormLabel>

            <Input type={'file'} {...register('file')} />

            {errors.file && (
              <FormErrorMessage>{errors.file?.message}</FormErrorMessage>
            )}
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(saveUser)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}
