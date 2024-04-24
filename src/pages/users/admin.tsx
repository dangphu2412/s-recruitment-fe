import { ReactElement } from 'react';
import { useUserOverview } from '../../entities/user/features/hooks/data/useUserOverview';
import { AdminContainer } from '../../features/user-managements/ui/AdminContainer/AdminContainer';
import { FullLoader } from '../../shared/ui/Loader/Full/FullLoader';
import { AdminTable } from '../../features/user-managements/ui/AdminTable/AdminTable';
import { TableHeaderContainer } from '../../features/user-managements/ui/AdminTable/TableHeader/TableHeaderContainer';
import { FilterBar } from '../../features/user-managements/ui/AdminTable/FilterBar/FilterBar';
import { PaginationContainer } from '../../features/user-managements/ui/AdminTable/PaginationContainer/PaginationContainer';

export default function AdministratorPage(): ReactElement {
  const { data, isLoading } = useUserOverview();

  return (
    <AdminContainer>
      <FullLoader isLoading={isLoading} />

      <TableHeaderContainer />
      <FilterBar />
      <PaginationContainer totalRecords={data?.metadata.totalRecords} />

      <AdminTable data={data} />
    </AdminContainer>
  );
}
