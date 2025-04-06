import {
  QUERY_USER_DETAIL_KEY,
  useMutateUpdateUser,
  useQueryUserProfile
} from '../../../../../entities/user/models';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Select,
  SkeletonCircle,
  SkeletonText,
  Tag
} from '@chakra-ui/react';
import { ContentHeader, FormLabel } from '../../../../../shared/ui';
import React, { useMemo } from 'react';
import NotFound from 'next/dist/client/components/not-found-error';
import { Controller, useForm } from 'react-hook-form';
import {
  EditUserForm,
  mapFormToEditUserDto,
  mapUserDetailToEditForm
} from '../../models/edit-user.model';
import { ContentHeaderLayout } from '../../../../../shared/ui/Header/ContentHeader/ContentHeaderLayout';
import { HeaderActionGroup } from '../../../../../shared/ui/Header/ContentHeader/HeaderActionGroup';
import {
  useDepartments,
  usePeriods
} from '../../../../../entities/user/models/user-master-data.model';
import { useNotify } from '../../../../../shared/models/notify';
import { useQueryClient } from 'react-query';
import { RoleSettingDrawer } from '../../../user-roles-setting/ui/RoleSettings/RoleSettingDrawer';
import { useTrackedUsers } from '../../../../../entities/activities/models/activity-master-data.model';
import { Combobox } from '../../../../../shared/ui/Combobox/Combobox';

type Props = {
  userId: string;
};

export function UserDetailSection({ userId }: Props) {
  const { userDetail, isLoading } = useQueryUserProfile(userId);
  const notify = useNotify();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<EditUserForm>({
    values: userDetail
      ? mapUserDetailToEditForm(userDetail)
      : ({} as EditUserForm)
  });
  const { data: departments } = useDepartments();
  const { data: periods } = usePeriods();
  const { data: trackedUsers } = useTrackedUsers();
  const { updateUser } = useMutateUpdateUser();

  const trackItems = useMemo(() => {
    return (
      trackedUsers?.map(user => {
        return {
          text: user.name,
          value: user.trackingId
        };
      }) ?? []
    );
  }, [trackedUsers]);

  function handleEdit(inputs: EditUserForm) {
    updateUser(mapFormToEditUserDto(userId, inputs), {
      onSuccess: () => {
        notify({
          title: 'User updated',
          status: 'success'
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_USER_DETAIL_KEY, userId]
        });
      }
    });
  }

  if (isLoading) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={8} spacing="4" skeletonHeight="2" />
      </Box>
    );
  }

  if (!userDetail) {
    return <NotFound />;
  }

  return (
    <div className={'space-y-4'}>
      <div className={'space-y-4'}>
        <ContentHeaderLayout>
          <ContentHeader main={`${userDetail.fullName}`} />

          <HeaderActionGroup>
            <Button onClick={handleSubmit(handleEdit)}>Save</Button>
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

              <Select placeholder="Select domain" {...register('department')}>
                {departments?.map(department => {
                  return (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  );
                })}
              </Select>

              {errors.department && (
                <FormErrorMessage>
                  {errors.department?.message}
                </FormErrorMessage>
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
          </div>

          <FormControl>
            <FormLabel>Phone</FormLabel>

            <Input {...register('phoneNumber')} type={'number'} />
          </FormControl>

          <FormControl>
            <FormLabel>Tracking ID</FormLabel>

            <Controller
              name="trackingId"
              control={control}
              render={({ field }) => {
                return (
                  <Combobox
                    {...field}
                    placeholder={'Search user by tracking ID'}
                    items={trackItems}
                  />
                );
              }}
            />
          </FormControl>
        </div>
      </div>

      <div className={'space-y-4'}>
        <Heading size="sm" className={'flex gap-2 items-center'}>
          <div>Role Information</div>

          <RoleSettingDrawer isDisabled={userDetail.isProbation} />
        </Heading>

        <div className={'space-x-2'}>
          {userDetail.roles.length ? (
            userDetail.roles.map(role => {
              return (
                <Tag
                  key={role.id}
                  colorScheme="teal"
                  variant="solid"
                  className={'w-fit'}
                >
                  {role.name}
                </Tag>
              );
            })
          ) : (
            <Tag>Not assigned</Tag>
          )}
        </div>
      </div>
    </div>
  );
}
