import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { HeaderActions } from './HeaderActions';

export function TableHeaderContainer(): React.ReactElement {
  return (
    <Flex justifyContent="space-between" className="pb-2">
      <div>
        <Text fontSize="lg" fontWeight="semibold">
          Administrator management
        </Text>
        <Text fontSize="sm" fontWeight="light">
          Where you can create, update and change user active
        </Text>
      </div>

      <HeaderActions />
    </Flex>
  );
}
