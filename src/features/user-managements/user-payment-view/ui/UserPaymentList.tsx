import { Input } from '@chakra-ui/react';
import { Table } from '../../../../shared/ui';
import React, { useMemo } from 'react';
import { AddButton } from '../../../../shared/ui/Button';
import {
  useUserPaymentColumns,
  UseUserPaymentView
} from '../models/useUserPaymentColumns';
import { useUserPayments } from '../../../../entities/monthly-money/models/payment.model';

type UserPaymentViewProps = {
  onAddClick: () => void;
  userId: string;
};

export function UserPaymentList({ onAddClick, userId }: UserPaymentViewProps) {
  const userPaymentCols = useUserPaymentColumns();
  const { data } = useUserPayments(userId);
  const rows = useMemo<UseUserPaymentView[]>(() => {
    if (!data) return [];

    return data.map(item => {
      return {
        amount: item.amount,
        note: item.note,
        paidAt: new Date(item.paidAt).toLocaleDateString()
      };
    });
  }, [data]);

  return (
    <div className={'space-y-4'}>
      <div className={'flex justify-end gap-2'}>
        <Input placeholder={'Search by date, note, amount ...'} />
        <AddButton onClick={onAddClick} />
      </div>

      <Table columns={userPaymentCols} items={rows} />
    </div>
  );
}
