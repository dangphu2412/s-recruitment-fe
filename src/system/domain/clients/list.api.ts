import { FilterQuery } from './filter.api';

export type Pagination = {
  page: number;
  size: number;
};

export type PaginationMetadata = Pagination & {
  totalPages: number;
  totalRecords: number;
};

export type Page<T> = {
  items: T[];
  metadata: PaginationMetadata;
};

export type GetManyParams = {
  pagination: Pagination;
  filters: FilterQuery;
};
