export type MonthlyMoneyConfig = {
  id: number;
  amount: number;
  monthRange: number;
};

export type PatchUserPaidMoneyRequest = {
  userId: string;
  newPaid: number;
};
