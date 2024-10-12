import { useQuery } from 'react-query';
import { monthlyMoneyApiClient } from '../api';
import { EMPTY_ARRAY } from '../../../shared/config/constants';

type QueryMonthlyMoneyConfigsProps = {
  isEnabled: boolean;
};

export function useQueryMonthlyMoneyConfigs({
  isEnabled = true
}: QueryMonthlyMoneyConfigsProps) {
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
