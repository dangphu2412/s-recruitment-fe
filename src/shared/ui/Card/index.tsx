import { Box as ChakraBox, BoxProps, forwardRef } from '@chakra-ui/react';
import { ReactElement } from 'react';
import classNames from 'classnames';

type Props = BoxProps;

export const Card = forwardRef(function ContentLayout(
  { className, children, ...rest }: Props,
  ref
): ReactElement {
  return (
    <ChakraBox
      backgroundColor="#ffffff"
      borderRadius="1rem"
      paddingY="2rem"
      paddingX="2rem"
      className={classNames('shadow-highlight', className)}
      {...rest}
      ref={ref}
    >
      {children}
    </ChakraBox>
  );
});
