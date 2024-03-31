import { MonthlyConfig } from 'src/entities/monthly-money/models/monthly-config.types';

export type OperationFee = {
  id: number;
  paidMoney: number;
  userId: string;
  monthlyConfig: MonthlyConfig;
};
