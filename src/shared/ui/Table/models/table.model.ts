import { ReactNode } from 'react';
import type {
  ColumnDef,
  Row,
  Table as ReactTable
} from '@tanstack/react-table';

export type BaseTableProps<D extends object> = {
  caption?: ReactNode;
  isLoading?: boolean;
  onRowClick?: (row: Row<D>) => void;
  className?: string;
  table: ReactTable<D>;
  items?: D[];
  id?: string;
};

export type BasicTableProps<D extends object> = Omit<
  BaseTableProps<D>,
  'table'
> & {
  columns: ColumnDef<D, any>[];
};

export const ActionColumnIds = {
  SELECT: 'Select',
  ACTIONS: 'Actions'
};
