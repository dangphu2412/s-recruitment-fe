import { MonthlyMoneyApiClient } from '@modules/monthly-money/services';
import { useAppQuery } from '@modules/shared/hooks/useAppQuery';

export function useQueryMonthlyMoneyConfigs() {
  return useAppQuery({
    queryFn: MonthlyMoneyApiClient.getAllConfigs,
    queryKey: 'MONTHLY_MONEY_CONFIGS',
    retry: false
  });
}
