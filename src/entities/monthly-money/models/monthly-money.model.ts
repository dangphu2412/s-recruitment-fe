import { useMutation, useQuery } from 'react-query';
import { monthlyMoneyApiClient, UpdateUserPaidMoneyRequest } from '../api';
import { EMPTY_ARRAY } from '../../../shared/config/constants';

export function useUpdatePaidMoney() {
  const { mutate } = useMutation({
    mutationFn: (request: UpdateUserPaidMoneyRequest) =>
      monthlyMoneyApiClient.updatePaidMoney(request),
    mutationKey: 'MUTATION_UPDATE_PAID'
  });

  return { mutate };
}

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
