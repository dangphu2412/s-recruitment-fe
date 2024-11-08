import { ReactElement, ReactNode } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable
} from '@tanstack/react-table';
import {
  Table as BaseTable,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { TableLoading } from './TableLoading';
import { NoData } from './NoData';
import classNames from 'classnames';
import classes from './Table.module.scss';

type Props<D extends object> = {
  caption?: ReactNode;
  items?: D[];
  columns: ColumnDef<D>[];
  isLoading?: boolean;
  onRowClick?: (row: Row<D>) => void;
  className?: string;
};

export function Table<T extends object>({
  items = [],
  columns,
  isLoading = false,
  onRowClick,
  caption,
  className
}: Props<T>): ReactElement {
  const tableInstance = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel()
  });

  function rowClickHandler(row: Row<T>) {
    return () => {
      onRowClick?.(row);
    };
  }

  function renderBody() {
    if (isLoading) {
      return null;
    }

    return (
      <Tbody>
        {tableInstance.getRowModel().rows.map(row => {
          return (
            <Tr
              key={row.id}
              backgroundColor={'white'}
              _hover={{ backgroundColor: 'gray.200' }}
              onClick={rowClickHandler(row)}
              cursor={onRowClick ? 'pointer' : 'auto'}
            >
              {row.getAllCells().map(cell => {
                const cellId = `${row.id}-${cell.column.id}`;
                // <Text fontSize="md" fontStyle="italic" color="gray.500">
                //   No data
                // </Text>
                return (
                  <Td key={cellId}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    );
  }

  return (
    <TableContainer
      whiteSpace={'normal'}
      className={classNames(classes['table-container'], className)}
    >
      <BaseTable variant="simple" className={'w-full overflow-auto'}>
        {caption && <TableCaption>{caption}</TableCaption>}

        <Thead>
          {tableInstance.getHeaderGroups().map(headerGroup => {
            return (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      color="grey"
                      backgroundColor={'white'}
                      className="shadow-md sticky top-0"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>

        {renderBody()}
      </BaseTable>

      {!isLoading && !items.length && <NoData />}
      {isLoading && <TableLoading />}
    </TableContainer>
  );
}
