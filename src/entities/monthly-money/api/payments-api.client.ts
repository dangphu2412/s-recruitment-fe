import { authorizedHttpClient } from '../../../shared/api';

type Payment = {
  id: string;
  userId: string;
  amount: number;
  paidAt: string;
  note: string;
};

type PaymentRequest = {
  amount: number;
  paidAt: Date;
  userId: string;
  note: string;
};

export const paymentsApiClient = {
  getUserPayments: (userId: string) => {
    return authorizedHttpClient.request<Payment[]>({
      method: 'get',
      url: `users/${userId}/payments`
    });
  },
  payForUser: (payload: PaymentRequest) => {
    return authorizedHttpClient.request({
      method: 'post',
      url: `users/${payload.userId}/payments`,
      data: payload
    });
  }
};
