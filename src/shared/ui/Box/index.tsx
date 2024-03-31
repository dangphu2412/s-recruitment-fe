import { Box as ChakraBox, BoxProps, forwardRef } from '@chakra-ui/react';
import { ReactElement } from 'react';

type Props = BoxProps;

export const ContentLayout = forwardRef(function ContentLayout(
  { children, ...rest }: Props,
  ref
): ReactElement {
  return (
    <ChakraBox
      backgroundColor="#ffffff"
      borderRadius="1rem"
      paddingY="2rem"
      paddingX="2rem"
      {...rest}
      ref={ref}
    >
      {children}
    </ChakraBox>
  );
});
