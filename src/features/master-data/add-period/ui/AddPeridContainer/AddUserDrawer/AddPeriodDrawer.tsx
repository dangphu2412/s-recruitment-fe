import React from 'react';
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
  Input,
  Textarea
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { FullLoader } from 'src/shared/ui/Loader/Full/FullLoader';
import { useMutatePeriod } from 'src/entities/master-data/useMasteData';

export type CreatePeriodInputs = {
  name: string;
  description: string;
};

type AddUserDrawerProps = Omit<UseDisclosureApi, 'onOpen'> & {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
};

const validationSchema = object({
  name: string().required(),
  description: string().required()
});

export function AddPeriodDrawer({
  isOpen,
  onClose,
  finalFocusRef
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<CreatePeriodInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const { mutate: savePeriod, isLoading } = useMutatePeriod();

  const saveUser: SubmitHandler<CreatePeriodInputs> = createUserInputs => {
    savePeriod(
      {
        name: createUserInputs.name,
        description: createUserInputs.description
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        }
      }
    );
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      size="xl"
    >
      <DrawerOverlay />
      <FullLoader isLoading={isLoading} />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create new S-Group Period</DrawerHeader>

        <DrawerBody className="space-y-4">
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>Period name</FormLabel>

            <Input type={'text'} {...register('name')} />

            {errors.name && (
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.description} isRequired>
            <FormLabel>Description</FormLabel>

            <Textarea {...register('description')} />

            {errors.description && (
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
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
    </Drawer>
  );
}
