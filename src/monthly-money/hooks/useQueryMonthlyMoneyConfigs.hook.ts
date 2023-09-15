import { monthlyMoneyApiClient } from 'src/monthly-money/services';
import { useQuery } from 'react-query';
import { EMPTY_ARRAY } from '../../system/domain/constants';

type Props = {
  isEnabled: boolean;
};

export function useQueryMonthlyMoneyConfigs({ isEnabled = true }: Props) {
  const { data, isLoading } = useQuery({
    queryFn: monthlyMoneyApiClient.getAllConfigs,
    queryKey: 'MONTHLY_MONEY_CONFIGS',
    retry: false,
    enabled: isEnabled
  });

  return {
    monthlyMoneyConfigs: data ?? EMPTY_ARRAY,
    isLoading
  };
}
