import React, { ReactElement } from 'react';
import { ContentLayout } from '@modules/shared/components/Box';
import { Text } from '@chakra-ui/react';
import { AccessControlList } from '@modules/user/components/AccessControlList/AccessControlList';

export default function AccessControlPage(): ReactElement {
  return (
    <ContentLayout>
      <div className="px-6 pt-6">
        <Text fontSize="lg" fontWeight="semibold">
          Access Rights management
        </Text>

        <Text fontSize="sm" fontWeight="light">
          Where you manipulate application access rights
        </Text>
      </div>

      <AccessControlList />
    </ContentLayout>
  );
}
