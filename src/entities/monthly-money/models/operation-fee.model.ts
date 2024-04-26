type MonthlyConfig = {
  id: string;
  amount: number;
  monthRange: number;
};

export type OperationFee = {
  id: number;
  paidMoney: number;
  userId: string;
  monthlyConfig: MonthlyConfig;
};
