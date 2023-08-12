import { Pagination } from '../../../domain/clients';

export function parsePagination(page: number, size: number): Pagination {
  return {
    page,
    size
  };
}
