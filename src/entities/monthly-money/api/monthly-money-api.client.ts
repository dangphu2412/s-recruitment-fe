import {
  authorizedHttpClient,
  httpClient
} from '../../../shared/api/factories/http-client.factories';

export type MonthlyMoneyConfig = {
  id: number;
  amount: number;
  monthRange: number;
};

export type UpdateUserPaidMoneyRequest = {
  userId: string;
  operationFeeId: number;
  newPaid: number;
};

export const monthlyMoneyApiClient = {
  getAllConfigs(): Promise<MonthlyMoneyConfig[]> {
    return httpClient.request({
      method: 'get',
      url: '/monthly-money-configs'
    });
  },
  updatePaidMoney(paidMoneyRequest: UpdateUserPaidMoneyRequest): Promise<void> {
    return authorizedHttpClient.request({
      method: 'patch',
      url: `/users/${paidMoneyRequest.userId}/monthly-moneys`,
      data: paidMoneyRequest
    });
  }
};
