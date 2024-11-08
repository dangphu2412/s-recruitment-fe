import { Box as ChakraBox, BoxProps } from '@chakra-ui/react';
import { ReactElement, forwardRef } from 'react';
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
      className={classNames('shadow-highlight space-y-2', className)}
      {...rest}
      ref={ref}
    >
      {children}
    </ChakraBox>
  );
});
