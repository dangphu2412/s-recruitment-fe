import { forwardRef, FormLabel as LibFormLabel } from '@chakra-ui/react';

export const FormLabel = forwardRef(({ children, ...props }, ref) => {
  return (
    <LibFormLabel
      fontSize="xs"
      fontWeight="bold"
      className={'text-dark'}
      marginLeft=".25rem"
      marginBottom=".5rem"
      {...props}
      ref={ref}
    >
      {children}
    </LibFormLabel>
  );
});
