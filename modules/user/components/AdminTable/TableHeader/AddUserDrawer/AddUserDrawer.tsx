import React, { useEffect } from 'react';
import {
  Button,
  Checkbox,
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
  Select
} from '@chakra-ui/react';
import { CreateUserType } from '@modules/user/constants/admin-management.constants';
import { InputMultipleValues } from '@modules/shared/components/Input';
import { UseDisclosureApi } from '@modules/shared/clients/disclosure.api';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserInputs } from '@modules/user/components/AdminTable/TableHeader/HeaderActions';
import { array, boolean, mixed, object, string } from 'yup';
import { MonthlyMoneyConfig } from '@modules/monthly-money/clients/monthly-money.types';
import { FullLoader } from '@modules/shared/components/Loader/Full/FullLoader';

type AddUserDrawerProps = Omit<UseDisclosureApi, 'onOpen'> & {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  monthlyMoneyConfigs: MonthlyMoneyConfig[];
  isLoading: boolean;
  onAddNewUser(createUserInputs: CreateUserInputs): void;
};

const validationSchema = object({
  createType: mixed<CreateUserType>()
    .oneOf(Object.values(CreateUserType))
    .required(),
  emails: array().of(string().email().required()),
  monthlyConfigId: string().optional().when('createType', {
    is: CreateUserType.NEW_MEMBERS,
    then: string().required()
  }),
  isSilentCreate: boolean().required()
});

export function AddUserDrawer({
  isOpen,
  isLoading,
  onClose,
  finalFocusRef,
  onAddNewUser,
  monthlyMoneyConfigs
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CreateUserInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      emails: [],
      createType: CreateUserType.NEWBIE,
      isSilentCreate: false
    }
  });
  const {
    field: {
      onChange: onEmailsChange,
      name: emailsInputName,
      value: currentEmails
    }
  } = useController({
    control,
    name: 'emails'
  });
  const createUserType = watch('createType');

  const saveUser: SubmitHandler<CreateUserInputs> = inputs => {
    onAddNewUser(inputs);
  };

  useEffect(() => {
    setValue('createType', CreateUserType.NEWBIE);
  }, [setValue]);

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

        <DrawerHeader>Create new S-Group members</DrawerHeader>

        <DrawerBody className="space-y-2">
          <FormControl>
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
          </FormControl>

          <FormControl isInvalid={!!errors.emails} pt="1rem">
            <FormLabel htmlFor={emailsInputName}>Email</FormLabel>

            <InputMultipleValues
              onAddChange={onEmailsChange}
              onDeleteChange={onEmailsChange}
              placeholder="Please enter emails"
              name={emailsInputName}
              inputValues={currentEmails}
            />

            {errors.emails && (
              <FormErrorMessage>Incorrect email format</FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <Checkbox {...register('isSilentCreate')}>
              Skip existed emails
            </Checkbox>
          </FormControl>

          {createUserType === CreateUserType.NEW_MEMBERS && (
            <FormControl pt="1rem">
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
