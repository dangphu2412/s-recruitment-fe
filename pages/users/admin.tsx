import { ReactElement } from 'react';
import { useUserOverview } from '../../src/entities/user/features/hooks/data/useUserOverview';
import { AdminContainer } from '../../src/entities/user/ui/containers/AdminContainer/AdminContainer';
import { FullLoader } from '../../src/shared/ui/Loader/Full/FullLoader';
import { TableHeaderContainer } from '../../src/entities/user/ui/components/AdminTable/TableHeader/TableHeaderContainer';
import { FilterBar } from '../../src/entities/user/ui/components/AdminTable/FilterBar/FilterBar';
import { PaginationContainer } from '../../src/entities/user/ui/components/AdminTable/PaginationContainer/PaginationContainer';
import { AdminTable } from '../../src/entities/user/ui/components/AdminTable/AdminTable';

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
