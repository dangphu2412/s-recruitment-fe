import { useQuery } from 'react-query';
import { dashboardApiClient } from '../api/dashboard-api.client';

export function useDashboardKPI() {
  return useQuery({
    queryKey: ['dashboard-kpi'],
    queryFn: dashboardApiClient.getKPI
  });
}
