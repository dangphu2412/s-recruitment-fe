import React from 'react';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useTable } from 'react-table';
import { useQueryUsers } from '@modules/user/hooks/data/useQueryUsers';
import { useAdminColumns } from '@modules/user/hooks/table/useAdminColumns';
import { PaginationContainer } from '@modules/user/components/AdminTable/PaginationContainer/PaginationContainer';
import { TableHeaderContainer } from '@modules/user/components/AdminTable/TableHeader/TableHeaderContainer';
import { AdminContainer } from '@modules/user/containers/AdminContainer/AdminContainer';
import { FilterBar } from '@modules/user/components/AdminTable/FilterBar/FilterBar';
import { FullLoader } from '@modules/shared/components/Loader/Full/FullLoader';

export default function AdministratorPage(): React.ReactElement {
  const { data, isLoading } = useQueryUsers();
  const columns = useAdminColumns();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data?.items ?? [] });

  return (
    <AdminContainer>
      <FullLoader isLoading={isLoading} />

      <div className="px-6">
        <TableHeaderContainer />
        <FilterBar />
        <PaginationContainer totalRecords={data?.metadata.totalRecords} />
      </div>

      <TableContainer>
        <Table variant="simple" {...getTableProps()}>
          <TableCaption>Manage admin users</TableCaption>

          <Thead>
            {headerGroups.map(headerGroup => {
              const { key: headerKey, ...headerRowProps } =
                headerGroup.getHeaderGroupProps();

              return (
                <Tr key={headerKey} {...headerRowProps}>
                  {headerGroup.headers.map(column => {
                    const { key: headerGroupKey, ...colProps } =
                      column.getHeaderProps();

                    return (
                      <Th key={headerGroupKey} {...colProps}>
                        {column.render('Header')}
                      </Th>
                    );
                  })}
                </Tr>
              );
            })}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);

              const { key: rowKey, ...rowProps } = row.getRowProps();

              return (
                <Tr key={rowKey} {...rowProps}>
                  {row.cells.map(cell => {
                    const { key: keyCell, ...cellProps } = cell.getCellProps({
                      key: `cell_${cell.column.id}_${cell.row.original.id}`
                    });

                    return (
                      <Td key={keyCell} {...cellProps}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </AdminContainer>
  );
}
