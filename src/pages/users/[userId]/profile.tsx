import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { normalizeParam } from '../../../shared/models/utils/router.utils';
import { ContentLayout } from '../../../shared/ui/Box';
import { ContentHeader } from '../../../shared/ui/Header';
import { UserDetailSection } from '../../../entities/user/ui/components/UserDetailSection/UserDetailSection';
import { useQueryMyProfile } from '../../../entities/user/features/hooks/data/useQueryUserDetail';

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
