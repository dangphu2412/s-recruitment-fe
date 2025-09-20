import {
  QUERY_MY_PROFILE,
  useMutateUpdateMyProfile,
  useQueryMyProfile
} from '../../../../../entities/user/models';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  SkeletonCircle,
  SkeletonText
} from '@chakra-ui/react';
import { ContentHeader, FormLabel } from '../../../../../shared/ui';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  EditUserForm,
  fromFormToEditMyProfileDto,
  fromMyProfileToEditForm
} from '../../models/edit-user.model';
import { ContentHeaderLayout } from '../../../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import { useNotify } from '../../../../../shared/notify';
import { useQueryClient } from 'react-query';
import { ChangePasswordContainer } from './ChangePasswordModal/ChangePasswordModal';

export function MyProfile() {
  const { profile, isLoading } = useQueryMyProfile();
  const notify = useNotify();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditUserForm>({
    values: profile ? fromMyProfileToEditForm(profile) : ({} as EditUserForm)
  });
  const { updateMyProfile } = useMutateUpdateMyProfile();

  function handleEdit(inputs: EditUserForm) {
    updateMyProfile(fromFormToEditMyProfileDto(inputs), {
      onSuccess: () => {
        notify({
          title: 'Update profile successfully',
          status: 'success'
        });
        queryClient.invalidateQueries([QUERY_MY_PROFILE]);
      }
    });
  }

  if (!profile || isLoading) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={8} spacing="4" skeletonHeight="2" />
      </Box>
    );
  }

  return (
    <div className={'space-y-4'}>
      <div className={'space-y-4'}>
        <ContentHeaderLayout>
          <ContentHeader main={`${profile.fullName}`} />

          <HeaderActionGroup>
            <Button onClick={handleSubmit(handleEdit)}>Save</Button>
            <ChangePasswordContainer />
          </HeaderActionGroup>
        </ContentHeaderLayout>

        <Heading size="sm" className={'flex gap-2 items-center'}>
          Basic information
        </Heading>
        <div className={'grid grid-cols-2 gap-4'}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input readOnly {...register('username')} />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input readOnly {...register('email')} />
          </FormControl>

          <div className={'grid grid-cols-2 gap-4'}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input {...register('fullName')} />
            </FormControl>

            <FormControl>
              <FormLabel>Birthday</FormLabel>
              <Input {...register('birthday')} type="date" />
            </FormControl>
          </div>

          <div className={'grid grid-cols-2 gap-4'}>
            <FormControl isInvalid={!!errors.department}>
              <FormLabel htmlFor="create-user-type">Department</FormLabel>

              <Input {...register('department')} readOnly />

              {errors.department && (
                <FormErrorMessage>
                  {errors.department?.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.period}>
              <FormLabel htmlFor="create-user-type">Period</FormLabel>

              <Input {...register('period')} readOnly />

              {errors.period && (
                <FormErrorMessage>{errors.period?.message}</FormErrorMessage>
              )}
            </FormControl>
          </div>

          <div className={'grid grid-cols-2 gap-4'}>
            <FormControl>
              <FormLabel>Phone</FormLabel>

              <Input {...register('phoneNumber')} type={'number'} />
            </FormControl>

            <FormControl>
              <FormLabel>Join At</FormLabel>

              <Input {...register('joinedAt')} type={'date'} readOnly />
            </FormControl>
          </div>

          <FormControl>
            <FormLabel>Tracking ID</FormLabel>

            <Input {...register('trackingId')} readOnly />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
