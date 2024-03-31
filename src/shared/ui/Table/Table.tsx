import { ReactElement, ReactNode } from 'react';
import { Column, Row, useTable } from 'react-table';
import {
  Table as BaseTable,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { TableLoading } from './TableLoading';
import { NoData } from './NoData';

type Props<D extends object> = {
  caption?: ReactNode;
  items?: D[];
  columns: Column<D>[];
  isLoading?: boolean;
  onRowClick?: (row: Row<D>) => void;
};

export function Table<T extends object>({
  items = [],
  columns,
  isLoading = false,
  onRowClick,
  caption
}: Props<T>): ReactElement {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: items });

  function rowClickHandler(row: Row<T>) {
    return () => {
      onRowClick?.(row);
    };
  }

  return (
    <TableContainer
      position="relative"
      overflowY={'auto'}
      overflowX={'auto'}
      maxHeight="calc(100vh - 20rem)"
      maxWidth="calc(100vw - 20rem)"
      minHeight="300px"
      backgroundColor={'white'}
    >
      <BaseTable variant="simple" {...getTableProps()}>
        {caption && <TableCaption>{caption}</TableCaption>}

        <Thead position="sticky" top="0" zIndex="1">
          {headerGroups.map(headerGroup => {
            const { key: headerKey, ...headerRowProps } =
              headerGroup.getHeaderGroupProps();

            return (
              <Tr key={headerKey} {...headerRowProps}>
                {headerGroup.headers.map(column => {
                  const { key: headerGroupKey, ...colProps } =
                    column.getHeaderProps();

                  return (
                    <Th
                      key={headerGroupKey}
                      {...colProps}
                      color="grey"
                      backgroundColor={'white'}
                      className="shadow-md"
                    >
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
              <Tr
                key={rowKey}
                {...rowProps}
                backgroundColor={'white'}
                onClick={rowClickHandler(row)}
                cursor={onRowClick ? 'pointer' : 'auto'}
              >
                {row.cells.map(cell => {
                  const { key: keyCell, ...cellProps } = cell.getCellProps();
                  const cellInstance = cell.render('Cell');

                  return (
                    <Td key={keyCell} {...cellProps}>
                      {cellInstance ? (
                        cellInstance
                      ) : (
                        <Text fontSize="md" fontStyle="italic" color="gray.500">
                          No data
                        </Text>
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </BaseTable>

      {!isLoading && !items.length && <NoData />}
      {isLoading && <TableLoading />}
    </TableContainer>
  );
}
