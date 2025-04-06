import { useQuery } from 'react-query';
import { monthlyMoneyApiClient, MonthlyMoneyConfig } from '../api';
import { EMPTY_ARRAY } from '../../../shared/config/constants';

type QueryMonthlyMoneyConfigsProps = {
  isEnabled: boolean;
  onSuccess?: (data: MonthlyMoneyConfig[]) => void;
};

export function useQueryMonthlyMoneyConfigs({
  isEnabled = true,
  onSuccess
}: QueryMonthlyMoneyConfigsProps) {
  const { data, isLoading } = useQuery({
    queryFn: monthlyMoneyApiClient.getAllConfigs,
    queryKey: 'MONTHLY_MONEY_CONFIGS',
    retry: false,
    enabled: isEnabled,
    onSuccess
  });

  return {
    monthlyMoneyConfigs: data ?? EMPTY_ARRAY,
    isLoading
  };
}
