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
import {
  QUERY_USERS_KEY,
  useMutateCreateUser
} from '../../../../../../entities/user/models';
import {
  useDepartments,
  usePeriods
} from '../../../../../../entities/user/models/user-master-data.model';
import { useQueryClient } from 'react-query';

export type CreateUserInputs = {
  email: string;
  fullName: string;
  department: string;
  period: string;
  birthday?: string;
  monthlyConfigId?: string;
};

type AddUserDrawerProps = Pick<UseDisclosureApi, 'onClose'>;

const validationSchema = object({
  department: string().required(),
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
  const { data: departments } = useDepartments();
  const { data: periods } = usePeriods();
  const queryClient = useQueryClient();

  const saveUser: SubmitHandler<CreateUserInputs> = createUserInputs => {
    dispatchCreateUser(
      {
        email: createUserInputs.email,
        fullName: createUserInputs.fullName,
        birthday: createUserInputs.birthday,
        departmentId: createUserInputs.department,
        periodId: createUserInputs.period
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_USERS_KEY]
          });
          reset();
          onClose();
        }
      }
    );
  };

  return (
    <>
      <DrawerOverlay />
      {isLoading && <FullLoader />}

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create new S-Group members</DrawerHeader>

        <DrawerBody className="space-y-4">
          <FormControl isInvalid={!!errors.department}>
            <FormLabel htmlFor="create-user-type">Domain</FormLabel>

            <Select placeholder="Select department" {...register('department')}>
              {departments?.map(department => {
                return (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                );
              })}
            </Select>

            {errors.department && (
              <FormErrorMessage>{errors.department?.message}</FormErrorMessage>
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
