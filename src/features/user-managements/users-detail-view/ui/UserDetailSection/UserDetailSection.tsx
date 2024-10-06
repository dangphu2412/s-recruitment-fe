import { useQueryUserProfile } from '../../../../../entities/user/models';
import {
  Box,
  FormControl,
  Input,
  SkeletonCircle,
  SkeletonText
} from '@chakra-ui/react';
import { FormLabel } from '../../../../../shared/ui';
import { formatDate } from '../../../../../shared/models/utils/date.utils';

type Props = {
  userId: string;
};

export function UserDetailSection({ userId }: Props) {
  const { userDetail } = useQueryUserProfile(userId);

  if (!userDetail) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={8} spacing="4" skeletonHeight="2" />
      </Box>
    );
  }

  return (
    <div className={'grid grid-cols-2 gap-4'}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input readOnly value={userDetail.username} />
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input readOnly value={userDetail.email} />
      </FormControl>

      <FormControl>
        <FormLabel>Domain</FormLabel>
        <Input
          readOnly
          value={userDetail.domain ? userDetail.domain?.name : 'No information'}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Period</FormLabel>
        <Input
          readOnly
          value={userDetail.period ? userDetail.period?.name : 'No information'}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Phone</FormLabel>
        <Input readOnly value={userDetail.phoneNumber ?? 'No information'} />
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
  );
}
