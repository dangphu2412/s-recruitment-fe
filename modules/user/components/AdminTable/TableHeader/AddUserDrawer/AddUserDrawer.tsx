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
  Input,
  Select
} from '@chakra-ui/react';
import { CreateUserType } from '@modules/user/constants/admin-management.constants';
import { InputMultipleValues } from '@modules/shared/components/Input';
import { UseDisclosureApi } from '@modules/shared/clients/disclosure.api';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, boolean, mixed, object, string } from 'yup';
import { MonthlyMoneyConfig } from '@modules/monthly-money/clients/monthly-money.types';
import { FullLoader } from '@modules/shared/components/Loader/Full/FullLoader';

export type CreateUserInputs = {
  createType: CreateUserType;
  emails: Array<string>;
  monthlyConfigId?: string;
  isSilentCreate: boolean;
  excelFile?: File;
};

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
  emails: array().optional().of(string().email().required()),
  monthlyConfigId: string().optional().when('createType', {
    is: CreateUserType.NEW_MEMBERS,
    then: string().required()
  }),
  isSilentCreate: boolean().required(),
  excelFile: object().optional().when('createType', {
    is: CreateUserType.EXCEL,
    then: object().required()
  })
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
    formState: { errors, isValid }
  } = useForm<CreateUserInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      emails: [],
      createType: CreateUserType.NEWBIE,
      isSilentCreate: false,
      excelFile: undefined
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

  function handleUploadExcel(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    setValue('excelFile', file);
  }

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
        {!isValid && 'Invalid'}
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

          {createUserType !== CreateUserType.EXCEL && (
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
          )}

          <FormControl>
            <Checkbox {...register('isSilentCreate')}>
              Skip existed emails
            </Checkbox>
          </FormControl>

          {[CreateUserType.NEW_MEMBERS, CreateUserType.EXCEL].includes(
            createUserType
          ) && (
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

          {createUserType === CreateUserType.EXCEL && (
            <FormControl>
              <FormLabel borderWidth="0.5rem">
                Upload file
                <Input type="file" hidden={true} onChange={handleUploadExcel} />
              </FormLabel>
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
