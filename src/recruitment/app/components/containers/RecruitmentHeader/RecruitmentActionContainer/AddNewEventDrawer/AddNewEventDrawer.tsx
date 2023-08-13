import React, { useMemo } from 'react';
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
  Input
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/system/domain/clients/disclosure.api';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from 'yup';
import { FullLoader } from 'src/system/app/internal/components/Loader/Full/FullLoader';
import { CreateRecruitmentEventFormModal } from '../../../../../app-models/recruitment-event.model';
import { MultipleCombobox } from '../../../../../../../system/app/internal/components/Combobox/MultipleCombobox';

type AddUserDrawerProps = Omit<UseDisclosureApi, 'onOpen'> & {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
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
  examiners: array().min(1, 'At least 1 examiner must be selected')
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
      examiners: []
    }
  });

  const { field: examinersProps } = useController({
    name: 'examiners',
    control
  });

  const examinerItems = useMemo(
    () => [
      { text: 'Some text', value: 'Value1' },
      { text: 'Another tedx', value: 'aasd' }
    ],
    []
  );

  const saveUser: SubmitHandler<CreateRecruitmentEventFormModal> = inputs => {
    console.log('Log', inputs);
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
