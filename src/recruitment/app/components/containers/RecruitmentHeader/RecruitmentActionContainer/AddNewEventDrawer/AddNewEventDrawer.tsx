import {
  Button,
  Drawer,
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
  Textarea
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo } from 'react';
import {
  SubmitHandler,
  useController,
  useFieldArray,
  useForm
} from 'react-hook-form';
import { FullLoader } from 'src/system/app/internal/components/Loader/Full/FullLoader';
import { BoxItem } from 'src/system/domain/clients/combobox.api';
import { UseDisclosureApi } from 'src/system/domain/clients/disclosure.api';
import { getInitialUserState } from 'src/user/internal/store/user.slice';
import { array, number, object, string } from 'yup';
import { MultipleCombobox } from '../../../../../../../system/app/internal/components/Combobox/MultipleCombobox';
import { useNotify } from '../../../../../../../system/app/internal/hooks/useNotify';
import { useQueryUsers } from '../../../../../../../user/app/hooks/data/useQueryUsers';
import { CreateRecruitmentEventPayload } from '../../../../../../domain/recruitment.usecase';
import { CreateRecruitmentEventFormModal } from '../../../../../app-models/recruitment-event.model';
import { useCreateRecruitmentEventMutation } from '../../../../../hooks/useCreateRecruitmentEventMutation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useQueryClient } from 'react-query';
import { RECRUITMENT_EVENT_QUERY_KEY } from '../../../../../hooks/useQueryRecruitmentEvents';

type AddUserDrawerProps = Omit<UseDisclosureApi, 'onOpen'> & {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
};
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
      point: number().required('Need to fill point'),
      standard: string().required('Standard is required')
    })
  )
});

export function AddNewEventDrawer({
  isOpen,
  isLoading,
  onClose,
  finalFocusRef
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<CreateRecruitmentEventFormModal>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      examiners: [],
      scoreStandards: [defaultScoreStandard]
    }
  });
  const { fields, append } = useFieldArray({
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

  const { data } = useQueryUsers({
    ...getInitialUserState()
  });

  const examinerItems: BoxItem[] = useMemo(() => {
    if (!data) return [];

    return data.items.map(user => {
      return {
        text: user.username,
        value: user.id
      };
    });
  }, [data]);

  const saveUser: SubmitHandler<
    CreateRecruitmentEventFormModal
  > = formInputs => {
    const payload: CreateRecruitmentEventPayload = {
      examinerIds: formInputs.examiners,
      recruitmentRange: {
        fromDate: formInputs.recruitmentRange.fromDate,
        toDate: formInputs.recruitmentRange.toDate
      },
      location: formInputs.location,
      name: formInputs.name,
      scoringStandards: formInputs.scoreStandards
    };

    createRecruitmentEvent(payload, {
      onSuccess: () => {
        notify({
          title: 'Create event success'
        });
        queryClient.refetchQueries(RECRUITMENT_EVENT_QUERY_KEY);
      }
    });
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      size="lg"
    >
      <DrawerOverlay />
      <FullLoader isLoading={isLoading} />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create new S-Group Recruitment Event</DrawerHeader>

        <DrawerBody className="space-y-4">
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
            <MultipleCombobox
              placeholder="Start entering in the ticket or company name ..."
              items={examinerItems}
              {...examinersProps}
            />

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

          <Button onClick={() => append(defaultScoreStandard)}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <Grid templateColumns="repeat(6, 1fr)">
                  <GridItem colSpan={1}>
                    <FormControl
                      isRequired
                      isInvalid={!!errors.scoreStandards?.[index]?.point}
                    >
                      <FormLabel>Point</FormLabel>
                      <Input
                        placeholder={'Input your location organizing ...'}
                        type="number"
                        {...register(`scoreStandards.${index}.point`)}
                      />

                      {errors.scoreStandards?.[index]?.point && (
                        <FormErrorMessage>
                          {errors.scoreStandards?.[index]?.point?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={5}>
                    <FormControl
                      isRequired
                      isInvalid={!!errors.scoreStandards?.[index]?.standard}
                    >
                      <FormLabel>Standard</FormLabel>
                      <Textarea
                        placeholder={'Input your location organizing ...'}
                        rows={1}
                        {...register(`scoreStandards.${index}.standard`)}
                      />

                      {errors.scoreStandards?.[index]?.standard && (
                        <FormErrorMessage>
                          {errors.scoreStandards?.[index]?.standard?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </GridItem>
                </Grid>
              </div>
            );
          })}
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
    </Drawer>
  );
}
