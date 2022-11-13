import { MonthlyMoneyApiClient } from '@modules/monthly-money/services';
import { useQuery } from 'react-query';

export function useQueryMonthlyMoneyConfigs() {
  return useQuery({
    queryFn: MonthlyMoneyApiClient.getAllConfigs,
    queryKey: 'MONTHLY_MONEY_CONFIGS',
    retry: false
  });
}
