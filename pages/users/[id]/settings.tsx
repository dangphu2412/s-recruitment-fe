import React, { ReactElement } from 'react';
import { ContentLayout } from '@modules/shared/components/Box';
import { Text } from '@chakra-ui/react';

export default function UserSettingPage(): ReactElement {
  return (
    <ContentLayout>
      <div className="px-6 pt-6">
        <Text fontSize="lg" fontWeight="semibold">
          User settings
        </Text>

        <Text fontSize="sm" fontWeight="light">
          Where admin setting for users
        </Text>
      </div>
    </ContentLayout>
  );
}
