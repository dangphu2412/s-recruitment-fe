import { ApiClient } from 'src/system/app/internal/services';
import {
  MonthlyMoneyConfig,
  PatchUserPaidMoneyRequest
} from 'src/monthly-money/clients/monthly-money.types';

export const monthlyMoneyApiClient = {
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
