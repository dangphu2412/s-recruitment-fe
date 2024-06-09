import React from 'react';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import classNames from 'classnames';
import { ComponentProps } from 'react';

export function PublicFooter({ className }: ComponentProps<'footer'>) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      className={classNames('m-6 pb-6', className)}
      as={'footer'}
    >
      <p>© 2022, made with by Phu Dang for a better web.</p>

      <p className="space-x-4">
        <Link href="/about-us">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/license">License</Link>
      </p>
    </Flex>
  );
}
