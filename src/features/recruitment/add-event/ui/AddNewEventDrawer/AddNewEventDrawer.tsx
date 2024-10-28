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
  Textarea,
  Text
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
import { array, mixed, number, object, string } from 'yup';
import { CreateRecruitmentEventPayload } from '../../../../../entities/recruitment/api/recruitment.usecase';
import {
  CreateRecruitmentEventFormModal,
  RECRUITMENT_EVENT_QUERY_KEY,
  useCreateRecruitmentEventMutation
} from 'src/entities/recruitment/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQueryClient } from 'react-query';
import { useNotify } from 'src/shared/models/notify';
import { UserCombobox } from '../../../../../entities/user/ui/UserCombobox/UserCombobox';

type AddUserDrawerProps = Pick<UseDisclosureApi, 'onClose'>;
const defaultScoreStandard = {
  point: 0,
  standard: ''
};

const validationSchema = object({
  name: string().required('Name must not empty'),
  location: string()
    .required('Location must not empty')
    .max(50, 'Max 50 characters allowed'),
  recruitmentRange: object({
    fromDate: string().required('From date is required for this event'),
    toDate: string().required('To date is required for this event')
  }),
  examiners: array().min(1, 'At least 1 examiner must be selected'),
  scoreStandards: array(
    object({
      point: number()
        .typeError('Point must not be empty')
        .min(1, 'Min is 1')
        .required('Need to fill point'),
      standard: string().required('Standard is required')
    })
  ),
  passPoint: number()
    .typeError('Pass point must not be empty')
    .min(1, 'Min must be greater than 0')
    .test({
      name: 'passPoint',
      test: (value, context) => {
        const { scoreStandards } =
          context.parent as CreateRecruitmentEventFormModal;
        const maxPoint = scoreStandards.reduce((acc, item) => {
          return acc + item.point;
        }, 0);

        if (!value) {
          return true;
        }

        if (value <= maxPoint) {
          return true;
        }

        return context.createError({
          message: `Pass point must be less than or equal to the total point: ${maxPoint}`
        });
      }
    })
    .required('Pass point is required'),
  file: mixed().nullable().required()
});

export function AddNewEventDrawer({
  onClose
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset
  } = useForm<CreateRecruitmentEventFormModal>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
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

  const saveUser: SubmitHandler<
    CreateRecruitmentEventFormModal
  > = formInputs => {
    const payload: CreateRecruitmentEventPayload = {
      examinerIds: formInputs.examiners.map(item => item.value),
      recruitmentRange: {
        fromDate: formInputs.recruitmentRange.fromDate,
        toDate: formInputs.recruitmentRange.toDate
      },
      location: formInputs.location,
      name: formInputs.name,
      scoringStandards: formInputs.scoreStandards,
      file: formInputs.file[0],
      passPoint: +formInputs.passPoint
    };

    createRecruitmentEvent(payload, {
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
                  <div className="flex gap-2">
                    <FormControl
                      isRequired
                      isInvalid={!!errors.scoreStandards?.[index]?.point}
                      className="space-y-2"
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
                      className="space-y-2"
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
