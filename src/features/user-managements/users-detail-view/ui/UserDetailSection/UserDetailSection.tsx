import { useQueryUserProfile } from '../../../../../entities/user/models';

type Props = {
  userId: string;
};

export function UserDetailSection({ userId }: Props) {
  const { userDetail } = useQueryUserProfile(userId);

  return <>{userDetail?.username ?? 'No information'}</>;
}
