import React, { PropsWithChildren } from 'react';
import {
  initialPaginationState,
  paginationReducer
} from './pagination.reducer';
import { ContextWithDispatcher } from '../../domain/clients/context.api';
import { noop } from './utils/noop';
import {
  PaginationAction,
  PaginationState
} from '../../domain/clients/pagination.api';

type PaginationContextProps = ContextWithDispatcher<
  PaginationState,
  PaginationAction
>;

export const PaginationContext = React.createContext<PaginationContextProps>({
  state: initialPaginationState,
  dispatch: noop
});

export function PaginationProvider({
  children
}: PropsWithChildren): React.ReactElement {
  const [state, dispatch] = React.useReducer(
    paginationReducer,
    initialPaginationState
  );
  return (
    <PaginationContext.Provider value={{ state, dispatch }}>
      {children}
    </PaginationContext.Provider>
  );
}
