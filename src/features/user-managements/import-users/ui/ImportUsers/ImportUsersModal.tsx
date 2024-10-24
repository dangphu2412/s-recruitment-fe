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
  FormHelperText,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react';
import { UseDisclosureApi } from 'src/shared/models/disclosure.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, object, string } from 'yup';
import {
  QUERY_USERS_KEY,
  useMutateUploadUserByFile
} from '../../../../../entities/user/models';
import { useNotify } from '../../../../../shared/models/notify';
import { useQueryClient } from 'react-query';
import { usePeriods } from '../../../../../entities/master-data/useMasteData';
import { useQueryMonthlyMoneyConfigs } from '../../../../../entities/monthly-money/models';

export type Inputs = {
  file: FileList;
  periodId: string;
  monthlyConfigId?: string;
};

type ImportUserDrawerProps = Omit<UseDisclosureApi, 'onOpen'> & {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
};

const validationSchema = object({
  file: mixed().nullable().required(),
  periodId: string().required('Period is required'),
  monthlyConfigId: string().optional()
});

export function ImportUsersDrawer({
  isOpen,
  onClose,
  finalFocusRef
}: ImportUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });
  const { uploadUserByFile } = useMutateUploadUserByFile();
  const { monthlyMoneyConfigs } = useQueryMonthlyMoneyConfigs({
    isEnabled: true
  });
  const notify = useNotify();
  const queryClient = useQueryClient();

  const { data: periods } = usePeriods();

  const importUsers: SubmitHandler<Inputs> = inputs => {
    uploadUserByFile(
      {
        file: inputs.file[0],
        periodId: +inputs.periodId,
        monthlyConfigId: inputs.monthlyConfigId
          ? +inputs.monthlyConfigId
          : undefined
      },
      {
        onSuccess: () => {
          notify({
            title: 'Import successfully',
            status: 'success'
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_USERS_KEY]
          });
          reset();
          onClose();
        },
        onError: () => {
          notify({
            title: 'Import failed',
            description: 'Format should be: Họ và Tên, Email, Username',
            status: 'error'
          });
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

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Import new S-Group members</DrawerHeader>

        <DrawerBody className="space-y-4">
          <FormControl isInvalid={!!errors.periodId} isRequired>
            <FormLabel htmlFor="create-user-type">Period</FormLabel>

            <Select
              placeholder="Select config"
              {...register('periodId', {
                required: 'Period is required'
              })}
            >
              {periods?.map(period => {
                return (
                  <option key={period.id} value={period.id}>
                    {period.name}
                  </option>
                );
              })}
            </Select>

            {errors.periodId && (
              <FormErrorMessage>{errors.periodId?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.monthlyConfigId}>
            <FormLabel htmlFor="monthlyConfigId">Monthly Config</FormLabel>

            <Select
              placeholder="Select config"
              {...register('monthlyConfigId')}
            >
              {monthlyMoneyConfigs?.map(config => {
                return (
                  <option key={config.id} value={config.id}>
                    {config.amount} / {config.monthRange} months
                  </option>
                );
              })}
            </Select>

            <FormHelperText>
              Select money config if you want import users as members
            </FormHelperText>

            {errors.monthlyConfigId && (
              <FormErrorMessage>
                {errors.monthlyConfigId?.message}
              </FormErrorMessage>
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
          <Button colorScheme="blue" onClick={handleSubmit(importUsers)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
