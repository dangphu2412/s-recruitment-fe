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
import { MoneyOption } from '../../../../../entities/monthly-money/ui/MoneyOption/MoneyOption';
import { createUserFileExample } from '../../../../../entities/user/models/create-user-file-example';

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
        onSuccess: response => {
          if (Array.isArray(response)) {
            const dupEmails = response
              .map(user => user.duplicatedEmails)
              .flat()
              .join(', ');
            notify({
              title: 'Duplicated Emails',
              status: 'warning',
              description: `Please remove emails: ${dupEmails}`,
              duration: null
            });
            return;
          }
          notify({
            title: 'Import successfully',
            status: 'success'
          });
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

        <DrawerHeader>Import S-Group users</DrawerHeader>

        <DrawerBody className="space-y-4">
          <FormControl isInvalid={!!errors.periodId} isRequired>
            <FormLabel htmlFor="create-user-type">Period</FormLabel>

            <Select
              placeholder="Select period"
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
              placeholder="Select money config"
              {...register('monthlyConfigId')}
            >
              {monthlyMoneyConfigs?.map(config => {
                return <MoneyOption key={config.id} {...config} />;
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

          <Button onClick={createUserFileExample}>Download Example</Button>
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
