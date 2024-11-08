import { Text, TextProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const TitleLabel = forwardRef<HTMLDivElement, TextProps>(
  ({ children, ...props }, ref) => {
    return (
      <Text fontSize="lg" fontWeight="semibold" {...props} ref={ref}>
        {children}
      </Text>
    );
  }
);
