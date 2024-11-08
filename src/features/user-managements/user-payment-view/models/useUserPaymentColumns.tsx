import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';

export type UseUserPaymentView = {
  paidAt: string;
  amount: number;
  note: string;
};

const columnHelper = createColumnHelper<UseUserPaymentView>();

export function useUserPaymentColumns() {
  return useMemo(() => {
    return [
      columnHelper.accessor('paidAt', {
        header: 'Paid At'
      }),
      columnHelper.accessor('amount', {
        header: 'Amount'
      }),
      columnHelper.accessor('note', {
        header: 'Note'
      })
    ];
  }, []);
}
