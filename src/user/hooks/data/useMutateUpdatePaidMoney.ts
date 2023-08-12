import { useMutation } from 'react-query';
import { MonthlyMoneyApiClient } from 'src/monthly-money/services';
import { PatchUserPaidMoneyRequest } from 'src/monthly-money/clients/monthly-money.types';

export function useMutateUpdatePaidMoney() {
  const { mutate } = useMutation({
    mutationFn: (request: PatchUserPaidMoneyRequest) =>
      MonthlyMoneyApiClient.updatePaidMoney(request),
    mutationKey: 'MUTATION_UPDATE_PAID'
  });

  return { mutate };
}
