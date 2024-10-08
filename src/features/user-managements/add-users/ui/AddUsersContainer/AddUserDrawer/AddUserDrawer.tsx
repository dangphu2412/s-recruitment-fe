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
  Select
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, object, string } from 'yup';
import { CreateUserType } from 'src/entities/user/config/admin-management.constants';
import { FullLoader } from '../../../../../../shared/ui/Loader/Full/FullLoader';
import { useQueryMonthlyMoneyConfigs } from 'src/entities/monthly-money/models';
import { useMutateCreateUser } from '../../../../../../entities/user/models';
import {
  useDomains,
  usePeriods
} from '../../../../../../entities/master-data/useMasteData';

export type CreateUserInputs = {
  createType: CreateUserType;
  email: string;
  fullName: string;
  domain: string;
  period: string;
  birthday?: string;
  monthlyConfigId?: string;
};

type AddUserDrawerProps = Omit<UseDisclosureApi, 'onOpen'> & {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
};

const validationSchema = object({
  createType: mixed<CreateUserType>()
    .oneOf(Object.values(CreateUserType))
    .required('Please select create type'),
  domain: string().required(),
  period: string().required(),
  email: string().email('Incorrect email format').required('Email is required'),
  fullName: string().optional(),
  birthday: string().optional(),
  monthlyConfigId: string()
    .optional()
    .when('createType', {
      is: CreateUserType.NEW_MEMBERS,
      then: string().required('Please provide monthly money config option')
    })
});

export function AddUserDrawer({
  isOpen,
  onClose,
  finalFocusRef
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset
  } = useForm<CreateUserInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      fullName: '',
      birthday: '',
      createType: CreateUserType.NEWBIE
    }
  });

  const createUserType = watch('createType');

  const { monthlyMoneyConfigs } = useQueryMonthlyMoneyConfigs({
    isEnabled: isOpen
  });

  const { mutate: dispatchCreateUser, isLoading } = useMutateCreateUser();
  const { data: domains } = useDomains();
  const { data: periods } = usePeriods();

  const saveUser: SubmitHandler<CreateUserInputs> = createUserInputs => {
    dispatchCreateUser(
      {
        createUserType: createUserInputs.createType,
        email: createUserInputs.email,
        fullName: createUserInputs.fullName,
        birthday: createUserInputs.birthday,
        monthlyConfigId: createUserInputs.monthlyConfigId,
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

        <DrawerHeader>Create new S-Group members</DrawerHeader>

        <DrawerBody className="space-y-4">
          <FormControl isInvalid={!!errors.createType}>
            <FormLabel htmlFor="create-user-type">Create type</FormLabel>

            <Select placeholder="Select option" {...register('createType')}>
              {Object.values(CreateUserType).map(type => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </Select>

            {errors.createType && (
              <FormErrorMessage>{errors.createType?.message}</FormErrorMessage>
            )}
          </FormControl>

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

          {[CreateUserType.NEW_MEMBERS].includes(createUserType) && (
            <FormControl>
              <FormLabel htmlFor="monthly-configs">Monthly paid</FormLabel>

              <Select
                placeholder="Select option"
                {...register('monthlyConfigId')}
              >
                {monthlyMoneyConfigs.map(config => {
                  return (
                    <option value={config.id} key={config.id}>
                      {`${config.amount}K / ${config.monthRange} month`}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          )}
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
