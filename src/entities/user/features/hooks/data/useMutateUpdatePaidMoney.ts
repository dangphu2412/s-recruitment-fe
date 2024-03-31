import { useMutation } from 'react-query';
import { monthlyMoneyApiClient } from 'src/entities/monthly-money/api';
import { PatchUserPaidMoneyRequest } from 'src/entities/monthly-money/models/monthly-money.types';

export function useMutateUpdatePaidMoney() {
  const { mutate } = useMutation({
    mutationFn: (request: PatchUserPaidMoneyRequest) =>
      monthlyMoneyApiClient.updatePaidMoney(request),
    mutationKey: 'MUTATION_UPDATE_PAID'
  });

  return { mutate };
}
