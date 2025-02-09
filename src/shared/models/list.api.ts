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

export type ProbationQuery = {
  pagination: Pagination;
  filters: FilterQuery;
};

export const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  size: 20
};

export const paginator = <T>(
  data: Array<T>,
  { page, size }: Pagination
): T[] => {
  return data.slice((page - 1) * size, page * size);
};
