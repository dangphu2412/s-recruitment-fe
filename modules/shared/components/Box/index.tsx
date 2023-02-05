import React, { PropsWithChildren } from 'react';
import { Box as ChakraBox } from '@chakra-ui/react';

type Props = PropsWithChildren<{}>;

export function ContentLayout({
  children,
  ...rest
}: Props): React.ReactElement {
  return (
    <ChakraBox borderRadius="1rem" backgroundColor="#ffffff" {...rest}>
      {children}
    </ChakraBox>
  );
}
