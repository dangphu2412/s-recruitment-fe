import { Spinner, SpinnerProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const TableLoading = forwardRef<HTMLDivElement, SpinnerProps>(
  function TableLoading(props, ref) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner size={'lg'} {...props} ref={ref} />
      </div>
    );
  }
);
