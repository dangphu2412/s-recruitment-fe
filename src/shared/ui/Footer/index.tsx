import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const Footer = React.forwardRef((): React.ReactElement => {
  return (
    <Flex justifyContent="space-between" alignItems="center" className="p-6">
      <p>© 2024, made by S-Group for a better future.</p>

      <p className="space-x-4">
        <Text as={'a'} href="https://sgroupvn.org/ve-chung-toi">
          About Us
        </Text>
        <Link href="/contact">Contact Us</Link>
      </p>
    </Flex>
  );
});
