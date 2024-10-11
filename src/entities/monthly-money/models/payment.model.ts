import { useMutation, useQuery, useQueryClient } from 'react-query';
import { paymentsApiClient } from '../api/payments-api.client';
import { QUERY_USERS_KEY } from '../../user/models';

const QUERY_USER_PAYMENTS_KEY = 'user-payments';

export function useUserPayments(userId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_USER_PAYMENTS_KEY, userId],
    queryFn: () => paymentsApiClient.getUserPayments(userId as string),
    enabled: !!userId
  });
}

export function usePayMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentsApiClient.payForUser,
    mutationKey: 'MUTATION_PAY',
    onSuccess() {
      queryClient.invalidateQueries(QUERY_USER_PAYMENTS_KEY);
      queryClient.invalidateQueries({ queryKey: [QUERY_USERS_KEY] });
    }
  });
}
