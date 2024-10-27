import { useQueryUserProfile } from '../../../../../entities/user/models';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  SkeletonCircle,
  SkeletonText,
  Tag
} from '@chakra-ui/react';
import { FormLabel } from '../../../../../shared/ui';
import { formatDate } from '../../../../../shared/models/utils/date.utils';
import React from 'react';
import NotFound from 'next/dist/client/components/not-found-error';
import { useRouter } from 'next/router';

type Props = {
  userId: string;
};

export function UserDetailSection({ userId }: Props) {
  const { userDetail, isLoading } = useQueryUserProfile(userId);
  const { push } = useRouter();

  function handleNavigateToRoleSettings() {
    push(`/users/${userId}/role-settings`);
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
        <Heading size="sm">User Information</Heading>

        <div className={'grid grid-cols-2 gap-4'}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input readOnly value={userDetail.username} />
          </FormControl>

          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input readOnly value={userDetail.fullName} />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input readOnly value={userDetail.email} />
          </FormControl>

          <FormControl>
            <FormLabel>Birthday</FormLabel>
            <Input type={'date'} readOnly value={userDetail.birthday} />
          </FormControl>

          <FormControl>
            <FormLabel>Domain</FormLabel>
            <Input
              readOnly
              value={
                userDetail.domain ? userDetail.domain?.name : 'No information'
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Period</FormLabel>
            <Input
              readOnly
              value={
                userDetail.period ? userDetail.period?.name : 'No information'
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              readOnly
              value={userDetail.phoneNumber ?? 'No information'}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Birthday</FormLabel>
            <Input
              readOnly
              value={
                userDetail.birthday
                  ? formatDate(new Date(userDetail.birthday))
                  : 'No information'
              }
            />
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
