import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { normalizeParam } from '../../../src/shared/models/utils/router.utils';
import { ContentLayout } from '../../../src/shared/ui/Box';
import { ContentHeader } from '../../../src/shared/ui/Header';
import { UserDetailSection } from '../../../src/entities/user/ui/components/UserDetailSection/UserDetailSection';
import { useQueryMyProfile } from '../../../src/entities/user/features/hooks/data/useQueryUserDetail';

export default function UserProfile(): ReactElement {
  const {
    query: { userId }
  } = useRouter();

  const { userDetail } = useQueryMyProfile(normalizeParam(userId));

  return (
    <ContentLayout>
      <ContentHeader main={'Profile'} brief={'User information'} />

      <Link href={`/users/${userId}/role-settings`}>Go to role settings</Link>

      <UserDetailSection />
    </ContentLayout>
  );
}
