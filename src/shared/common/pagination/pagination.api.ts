import { Action } from 'src/shared/clients';

export type PaginationState = {
  page: number;
  pageSize: number;
};

export type PaginationAction = Action<'SET_PAGINATION', PaginationState>;
