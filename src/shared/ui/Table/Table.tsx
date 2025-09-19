import { ReactElement } from 'react';
import { Cell, flexRender, Row } from '@tanstack/react-table';
import { Box, Text } from '@chakra-ui/react';
import { TableLoading } from './TableLoading';
import { NoData } from './NoData';
import classNames from 'classnames';
import { ActionColumnIds, BaseTableProps } from './models/table.model';
import { SortIcon } from './SortIcon';
import { MoreAction } from './MoreAction';
import { getPinStyle } from './models/pin.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

export function Table<T extends object>({
  items = [],
  isLoading = false,
  onRowClick,
  caption,
  className,
  table,
  ...rest
}: Readonly<BaseTableProps<T>>): ReactElement {
  function renderHeader() {
    return (
      <thead>
        {table.getHeaderGroups().map(headerGroup => {
          return (
            <tr
              key={headerGroup.id}
              className={'border-b border-gray-200 shadow-sm sticky top-0 z-10'}
            >
              {headerGroup.headers.map(header => {
                return (
                  <Box
                    as={'th'}
                    fontSize="xs"
                    fontWeight={'semibold'}
                    key={header.id}
                    colSpan={header.colSpan}
                    color="grey"
                    className={classNames(
                      'shadow-md bg-white px-3 py-2 uppercase'
                    )}
                    style={getPinStyle(header.column)}
                  >
                    <div className={'flex flex-row items-center'}>
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
                  </Box>
                );
              })}
            </tr>
          );
        })}
      </thead>
    );
  }

  function renderBody() {
    if (isLoading) {
      return null;
    }

    function renderCell(row: Row<T>, cell: Cell<T, unknown>) {
      if (cell.getIsGrouped()) {
        return (
          <Text
            fontSize={'sm'}
            fontWeight={'medium'}
            style={getPinStyle(cell.column)}
            onClick={row.getToggleExpandedHandler()}
            className={classNames(
              row.getCanExpand() ? 'cursor-pointer' : 'cursor-default',
              'flex items-center bg-white'
            )}
          >
            <FontAwesomeIcon
              icon={row.getIsExpanded() ? faChevronDown : faChevronRight}
            />{' '}
            {flexRender(cell.column.columnDef.cell, cell.getContext())} (
            {row.subRows.length})
          </Text>
        );
      }

      if (cell.getIsAggregated()) {
        return flexRender(
          cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
          cell.getContext()
        );
      }

      if (cell.getIsPlaceholder()) {
        return null;
      }

      return flexRender(cell.column.columnDef.cell, cell.getContext());
    }

    return (
      <tbody>
        {table.getRowModel().rows.map(row => {
          return (
            <Box
              as={'tr'}
              key={row.id}
              className={classNames(
                'bg-white border-b border-gray-200 ',
                onRowClick ? 'pointer' : 'auto'
              )}
              onClick={() => {
                onRowClick?.(row);
              }}
            >
              {row.getVisibleCells().map(cell => {
                const cellId = `${row.id}-${cell.column.id}`;

                return (
                  <Text
                    as={'td'}
                    fontSize={'sm'}
                    key={cellId}
                    className={classNames('bg-white px-4 py-3')}
                    style={getPinStyle(cell.column)}
                  >
                    {renderCell(row, cell)}
                  </Text>
                );
              })}
            </Box>
          );
        })}
      </tbody>
    );
  }

  return (
    <div
      className={classNames('h-[500px] overflow-auto bg-white relative')}
      {...rest}
    >
      <table className={'w-max min-w-full absolute'}>
        {caption && <caption>{caption}</caption>}

        {renderHeader()}
        {renderBody()}
      </table>

      {!isLoading && !items.length && <NoData />}
      {isLoading && <TableLoading />}
    </div>
  );
}
