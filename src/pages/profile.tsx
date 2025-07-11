import React, { ReactElement } from 'react';
import { useUserStore } from '../entities/user/models';
import { Card } from 'src/shared/ui';
import { BackButton } from '../shared/ui/Button/BackButton';
import { FullLoader } from '../shared/ui/Loader/Full/FullLoader';
import { MyProfile } from '../features/user-managements/users-detail-view/ui/MyProfile/MyProfile';

export default function MyProfilePage(): ReactElement {
  const id = useUserStore(state => state?.currentUser?.id);

  if (!id) {
    return <FullLoader />;
  }

  return (
    <Card className={'space-y-4'}>
      <BackButton />
      <MyProfile />
    </Card>
  );
}
