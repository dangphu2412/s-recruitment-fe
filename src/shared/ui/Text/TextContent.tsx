import { forwardRef, Text } from '@chakra-ui/react';

export const TextContent = forwardRef(({ children, ...props }, ref) => {
  return (
    <Text fontSize="sm" fontWeight="light" {...props} ref={ref}>
      {children}
    </Text>
  );
});
