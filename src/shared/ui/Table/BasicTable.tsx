import { ReactElement } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from './Table';
import { BasicTableProps } from './models/table.model';

export function BasicTable<T extends object>({
  items = [],
  columns,
  ...rest
}: BasicTableProps<T>): ReactElement {
  const tableInstance = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    enableColumnPinning: false,
    enableHiding: false
  });

  return <Table table={tableInstance} items={items} {...rest} />;
}
