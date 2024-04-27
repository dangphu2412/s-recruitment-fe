import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ContentHeader, ContentLayout } from '../../../shared/ui';
import { UserDetailSection } from '../../../features/user-managements/users-detail-view';
import { normalizeParam } from '../../../shared/models/utils/router.utils';

export default function UserProfile(): ReactElement {
  const {
    query: { userId }
  } = useRouter();

  return (
    <ContentLayout>
      <ContentHeader main={'Profile'} brief={'User information'} />

      <Link href={`/users/${userId}/role-settings`}>Go to role settings</Link>

      <UserDetailSection userId={normalizeParam(userId)} />
    </ContentLayout>
  );
}
