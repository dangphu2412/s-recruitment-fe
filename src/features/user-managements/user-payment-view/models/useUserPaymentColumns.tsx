import { useMemo } from 'react';
import { Column } from 'react-table';

export type UseUserPaymentView = {
  paidAt: string;
  amount: number;
  note: string;
};

export function useUserPaymentColumns(): Column<UseUserPaymentView>[] {
  return useMemo(() => {
    return [
      { Header: 'Paid At', accessor: 'paidAt' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Note', accessor: 'note' }
    ];
  }, []);
}
