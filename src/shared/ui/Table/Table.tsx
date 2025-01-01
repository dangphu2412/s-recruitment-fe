import { ReactElement } from 'react';
import { flexRender } from '@tanstack/react-table';
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
import { ActionColumnIds, BaseTableProps } from './models/table.model';
import { SortIcon } from './SortIcon';
import { MoreAction } from './MoreAction';
import { getPinStyle } from './models/pin.model';

export function Table<T extends object>({
  items = [],
  isLoading = false,
  onRowClick,
  caption,
  className,
  table
}: BaseTableProps<T>): ReactElement {
  function renderHeader() {
    return (
      <Thead className={'sticky top-0 z-[3] shadow'}>
        {table.getHeaderGroups().map(headerGroup => {
          return (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    color="grey"
                    backgroundColor={'white'}
                    className={classNames('shadow-md')}
                    style={getPinStyle(header.column)}
                  >
                    <div className={'flex flex-row  items-center'}>
                      <span>
                        {header.isPlaceholder
                          ? ''
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>

                      {header.column.getCanSort() && (
                        <SortIcon column={header.column} />
                      )}

                      {!ActionColumnIds[
                        header.id
                          .toString()
                          .toUpperCase() as keyof typeof ActionColumnIds
                      ] && <MoreAction column={header.column} />}
                    </div>
                  </Th>
                );
              })}
            </Tr>
          );
        })}
      </Thead>
    );
  }

  function renderBody() {
    if (isLoading) {
      return null;
    }

    return (
      <Tbody className={'relative'}>
        {table.getRowModel().rows.map(row => {
          return (
            <Tr
              key={row.id}
              backgroundColor={'white'}
              _hover={{ backgroundColor: 'gray.200' }}
              onClick={() => {
                onRowClick?.(row);
              }}
              cursor={onRowClick ? 'pointer' : 'auto'}
            >
              {row.getVisibleCells().map(cell => {
                const cellId = `${row.id}-${cell.column.id}`;

                return (
                  <Td
                    key={cellId}
                    className={classNames('bg-white')}
                    style={getPinStyle(cell.column)}
                  >
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
      overflow={'auto'}
      overflowY={'auto'}
      maxWidth={'auto'}
      className={classNames(classes['table-container'], className)}
    >
      <BaseTable variant="simple" className={'w-full'}>
        {caption && <TableCaption>{caption}</TableCaption>}

        {renderHeader()}
        {renderBody()}
      </BaseTable>

      {!isLoading && !items.length && <NoData />}
      {isLoading && <TableLoading />}
    </TableContainer>
  );
}
