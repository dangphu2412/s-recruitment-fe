import { MonthlyConfig } from 'src/monthly-money/types/monthly-config.types';

export type OperationFee = {
  id: number;
  paidMoney: number;
  userId: string;
  monthlyConfig: MonthlyConfig;
};
