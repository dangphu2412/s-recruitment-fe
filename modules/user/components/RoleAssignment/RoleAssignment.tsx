import React, { ReactElement } from 'react';
import { FormLabel, Input, InputGroup, Text } from '@chakra-ui/react';

export function RoleAssignment(): ReactElement {
  return (
    <>
      <div className="px-6 pt-6">
        <Text fontSize="lg" fontWeight="semibold">
          Role Assignment management
        </Text>

        <Text fontSize="sm" fontWeight="light">
          Where you manipulate role assignments
        </Text>

        <InputGroup>
          <FormLabel>Search</FormLabel>
          <Input />
        </InputGroup>
      </div>
    </>
  );
}
