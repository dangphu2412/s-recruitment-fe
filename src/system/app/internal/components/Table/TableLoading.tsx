import { ReactElement } from 'react';

export function TableLoading(): ReactElement {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <div className="w-6 h-6 border-2 border-green-300 border-t-[transparent] rounded-full animate-spin"></div>
    </div>
  );
}
