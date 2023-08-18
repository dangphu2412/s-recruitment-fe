import { ReactElement } from 'react';
import { PaginationContainer } from 'src/user/components/AdminTable/PaginationContainer/PaginationContainer';
import { TableHeaderContainer } from 'src/user/components/AdminTable/TableHeader/TableHeaderContainer';
import { AdminContainer } from 'src/user/containers/AdminContainer/AdminContainer';
import { FilterBar } from 'src/user/components/AdminTable/FilterBar/FilterBar';
import { FullLoader } from 'src/system/app/internal/components/Loader/Full/FullLoader';
import { AdminTable } from 'src/user/components/AdminTable/AdminTable';
import { useUserOverview } from '../../src/user/hooks/data/useUserOverview';

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
