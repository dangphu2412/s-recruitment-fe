import { FieldLabel, FieldLabelProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const FormLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <FieldLabel
        fontSize="xs"
        fontWeight="bold"
        className={'text-dark'}
        marginLeft=".25rem"
        marginBottom=".5rem"
        {...props}
        ref={ref}
      >
        {children}
      </FieldLabel>
    );
  }
);
