import { useQuery } from 'react-query';
import { useErrorHandler } from '@modules/error-handling/useErrorHandler';
import { MonthlyMoneyApiClient } from '@modules/monthly-money/services';

export function useQueryMonthlyMoneyConfigs() {
  const { handle } = useErrorHandler();

  return useQuery({
    queryFn: MonthlyMoneyApiClient.getAllConfigs,
    queryKey: 'MONTHLY_MONEY_CONFIGS',
    retry: false,
    onError: handle
  });
}
