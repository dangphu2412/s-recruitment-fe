import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const Footer = React.forwardRef((): React.ReactElement => {
  return (
    <Flex justifyContent="space-between" alignItems="center" className="p-6">
      <p>© 2022, made by Phu Dang for a better web.</p>

      <p className="space-x-4">
        <Text as={'a'} href="https://sgroupvn.org/ve-chung-toi">
          About Us
        </Text>
        <Link href="/contact">Contact Us</Link>
        <Link href="/license">License</Link>
      </p>
    </Flex>
  );
});
