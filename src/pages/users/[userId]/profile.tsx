import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ContentHeader, Card } from '../../../shared/ui';
import { UserDetailSection } from '../../../features/user-managements/users-detail-view';
import { normalizeParam } from '../../../shared/models/utils/router.utils';
import { BackButton } from '../../../shared/ui/Button/BackButton';
import { Button } from '@chakra-ui/react';

export default function UserProfile(): ReactElement {
  const {
    query: { userId }
  } = useRouter();

  return (
    <Card className={'space-y-4'}>
      <BackButton />
      <ContentHeader main={'Profile'} brief={'User information'} />
      <Button
        as={Link}
        href={`/users/${userId}/role-settings`}
        variant={'outline'}
        color={'primary'}
      >
        Go to role settings
      </Button>

      <UserDetailSection userId={normalizeParam(userId)} />
    </Card>
  );
}
