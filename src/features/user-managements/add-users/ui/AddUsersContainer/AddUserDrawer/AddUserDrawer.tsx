import React from 'react';
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
  Input,
  Select
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { FullLoader } from '../../../../../../shared/ui/Loader/Full/FullLoader';
import { useMutateCreateUser } from '../../../../../../entities/user/models';
import {
  useDepartments,
  usePeriods
} from '../../../../../../entities/master-data/useMasteData';

export type CreateUserInputs = {
  email: string;
  fullName: string;
  domain: string;
  period: string;
  birthday?: string;
  monthlyConfigId?: string;
};

type AddUserDrawerProps = Pick<UseDisclosureApi, 'onClose'>;

const validationSchema = object({
  domain: string().required(),
  period: string().required(),
  email: string().email('Incorrect email format').required('Email is required'),
  fullName: string().optional(),
  birthday: string().optional()
});

export function AddUserDrawer({
  onClose
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<CreateUserInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      fullName: '',
      birthday: ''
    }
  });

  const { mutate: dispatchCreateUser, isLoading } = useMutateCreateUser();
  const { data: domains } = useDepartments();
  const { data: periods } = usePeriods();

  const saveUser: SubmitHandler<CreateUserInputs> = createUserInputs => {
    dispatchCreateUser(
      {
        email: createUserInputs.email,
        fullName: createUserInputs.fullName,
        birthday: createUserInputs.birthday,
        domainId: createUserInputs.domain,
        periodId: createUserInputs.period
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
    <>
      <DrawerOverlay />
      <FullLoader isLoading={isLoading} />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create new S-Group members</DrawerHeader>

        <DrawerBody className="space-y-4">
          <FormControl isInvalid={!!errors.domain}>
            <FormLabel htmlFor="create-user-type">Domain</FormLabel>

            <Select placeholder="Select domain" {...register('domain')}>
              {domains?.map(domain => {
                return (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                );
              })}
            </Select>

            {errors.domain && (
              <FormErrorMessage>{errors.domain?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.period}>
            <FormLabel htmlFor="create-user-type">Period</FormLabel>

            <Select placeholder="Select period" {...register('period')}>
              {periods?.map(period => {
                return (
                  <option key={period.id} value={period.id}>
                    {period.name}
                  </option>
                );
              })}
            </Select>

            {errors.period && (
              <FormErrorMessage>{errors.period?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>Email</FormLabel>

            <Input type={'email'} {...register('email')} />

            {errors.email && (
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.fullName}>
            <FormLabel>Full name</FormLabel>

            <Input {...register('fullName')} />

            {errors.fullName && (
              <FormErrorMessage>{errors.fullName.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.birthday}>
            <FormLabel>Birth day</FormLabel>
            <Input
              placeholder={'Recruit from date'}
              {...register('birthday')}
              type="date"
            />

            {errors.birthday && (
              <FormErrorMessage>{errors.birthday.message}</FormErrorMessage>
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
