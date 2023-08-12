import { ApiClient } from 'src/shared/services';
import {
  MonthlyMoneyConfig,
  PatchUserPaidMoneyRequest
} from 'src/monthly-money/clients/monthly-money.types';

export const MonthlyMoneyApiClient = {
  getAllConfigs(): Promise<MonthlyMoneyConfig[]> {
    return ApiClient.get<MonthlyMoneyConfig[]>('/monthly-money-configs');
  },
  updatePaidMoney(paidMoneyRequest: PatchUserPaidMoneyRequest): Promise<void> {
    return ApiClient.patch<void, PatchUserPaidMoneyRequest>(
      `/users/${paidMoneyRequest.userId}/monthly-moneys`,
      paidMoneyRequest
    );
  }
};
