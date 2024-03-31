import {
  MonthlyMoneyConfig,
  PatchUserPaidMoneyRequest
} from 'src/entities/monthly-money/models/monthly-money.types';
import {
  authorizedHttpClient,
  httpClient
} from '../../../shared/api/factories/http-client.factories';

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
