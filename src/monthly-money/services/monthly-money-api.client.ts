import {
  MonthlyMoneyConfig,
  PatchUserPaidMoneyRequest
} from 'src/monthly-money/clients/monthly-money.types';
import {
  authorizedHttpClient,
  httpClient
} from '../../system/infrastructure/factories/http-client.factories';

export const monthlyMoneyApiClient = {
  getAllConfigs(): Promise<MonthlyMoneyConfig[]> {
    return httpClient.request({
      method: 'get',
      url: '/monthly-money-configs'
    });
  },
  updatePaidMoney(paidMoneyRequest: PatchUserPaidMoneyRequest): Promise<void> {
    return authorizedHttpClient.request({
      method: 'patch',
      url: `/users/${paidMoneyRequest.userId}/monthly-moneys`,
      data: paidMoneyRequest
    });
  }
};
