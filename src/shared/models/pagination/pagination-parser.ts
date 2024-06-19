import { Pagination } from '../index';

export function parsePagination(page: number, size: number): Pagination {
  return {
    page,
    size
  };
}
