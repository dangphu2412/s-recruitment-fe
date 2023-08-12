import { monthlyMoneyApiClient } from 'src/monthly-money/services';
import { useQuery } from 'react-query';

type Props = {
  isEnabled: boolean;
};

export function useQueryMonthlyMoneyConfigs({ isEnabled = true }: Props) {
  return useQuery({
    queryFn: monthlyMoneyApiClient.getAllConfigs,
    queryKey: 'MONTHLY_MONEY_CONFIGS',
    retry: false,
    enabled: isEnabled
  });
}
