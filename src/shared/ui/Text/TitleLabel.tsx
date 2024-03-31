import { forwardRef, Text } from '@chakra-ui/react';

export const TitleLabel = forwardRef(({ children, ...props }, ref) => {
  return (
    <Text fontSize="lg" fontWeight="semibold" {...props} ref={ref}>
      {children}
    </Text>
  );
});
