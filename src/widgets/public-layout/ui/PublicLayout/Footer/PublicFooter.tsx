import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
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
      <p>© 2024, made with by Phu Dang for a better web.</p>

      <div className="space-x-4 flex flex-row">
        <Text as={'a'} href="https://sgroupvn.org/ve-chung-toi">
          About Us
        </Text>
        <Text as={'a'} href="mailto:contact@sgroup.com" target={'_blank'}>
          Contact Us
        </Text>
        <Text>License</Text>
      </div>
    </Flex>
  );
}
