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

export const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  size: 20
};
