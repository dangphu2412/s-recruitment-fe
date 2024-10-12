import { httpClient } from '../../../shared/api/factories/http-client.factories';

export type MonthlyMoneyConfig = {
  id: number;
  amount: number;
  monthRange: number;
};

export const monthlyMoneyApiClient = {
  getAllConfigs(): Promise<MonthlyMoneyConfig[]> {
    return httpClient.request({
      method: 'get',
      url: '/monthly-money-configs'
    });
  }
};
