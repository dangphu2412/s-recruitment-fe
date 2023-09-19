import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ContentLayout } from 'src/system/app/internal/components/Box';
import { ContentHeader } from 'src/system/app/internal/components/Header';
import { useQueryMyProfile } from 'src/user/app/hooks/data/useQueryUserDetail';
import { normalizeParam } from 'src/system/app/internal/utils/router.utils';
import { UserDetailSection } from 'src/user/app/components/UserDetailSection/UserDetailSection';

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
