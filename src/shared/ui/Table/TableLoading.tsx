import { forwardRef, Spinner, SpinnerProps } from '@chakra-ui/react';

export const TableLoading = forwardRef<SpinnerProps, 'div'>(
  function TableLoading(props, ref) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner size={'lg'} {...props} ref={ref} />
      </div>
    );
  }
);
