import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Card, ContentHeader } from '../../../shared/ui';
import { UserDetailSection } from '../../../features/user-managements/users-detail-view';
import { normalizeParam } from '../../../shared/models/utils/router.utils';
import { BackButton } from '../../../shared/ui/Button/BackButton';

export default function UserProfile(): ReactElement {
  const {
    query: { userId }
  } = useRouter();

  return (
    <Card className={'space-y-4'}>
      <BackButton />
      <ContentHeader main={'Profile'} brief={'User information'} />
      <UserDetailSection userId={normalizeParam(userId)} />
    </Card>
  );
}
