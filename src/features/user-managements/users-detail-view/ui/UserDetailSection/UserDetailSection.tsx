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
import React from 'react';
import NotFound from 'next/dist/client/components/not-found-error';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
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
} from '../../../../../entities/master-data/useMasteData';
import { useNotify } from '../../../../../shared/models/notify';
import { useQueryClient } from 'react-query';

type Props = {
  userId: string;
};

export function UserDetailSection({ userId }: Props) {
  const { userDetail, isLoading } = useQueryUserProfile(userId);
  const { push } = useRouter();
  const notify = useNotify();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditUserForm>({
    values: userDetail
      ? mapUserDetailToEditForm(userDetail)
      : ({} as EditUserForm)
  });
  const { data: domains } = useDepartments();
  const { data: periods } = usePeriods();
  const { updateUser } = useMutateUpdateUser();

  function handleNavigateToRoleSettings() {
    push(`/users/${userId}/role-settings`);
  }

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
          <ContentHeader
            main={`Profile of ${userDetail.fullName}`}
            brief={'User information'}
          />

          <HeaderActionGroup>
            <Button onClick={handleSubmit(handleEdit)}>Save</Button>
          </HeaderActionGroup>
        </ContentHeaderLayout>

        <div className={'grid grid-cols-2 gap-4'}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input readOnly {...register('username')} />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input readOnly {...register('email')} />
          </FormControl>

          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input {...register('fullName')} />
          </FormControl>

          <FormControl>
            <FormLabel>Birthday</FormLabel>
            <Input type={'date'} readOnly value={userDetail.birthday} />
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

          <FormControl>
            <FormLabel>Phone</FormLabel>

            <Input {...register('phoneNumber')} type={'number'} />
          </FormControl>

          <FormControl>
            <FormLabel>Birthday</FormLabel>
            <Input {...register('birthday')} type="date" />
          </FormControl>
        </div>
      </div>

      <div className={'space-y-4'}>
        <Heading size="sm">Role Information</Heading>

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

        <Button
          onClick={handleNavigateToRoleSettings}
          variant={'outline'}
          color={'primary'}
          disabled={userDetail.isProbation}
        >
          Go to role settings
        </Button>
      </div>
    </div>
  );
}
