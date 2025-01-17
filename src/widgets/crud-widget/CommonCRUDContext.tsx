import { create, useStore } from 'zustand/react';
import { createContext, PropsWithChildren, useContext, useRef } from 'react';
import { DEFAULT_PAGINATION, Page } from '../../shared/models';
import { useQuery } from 'react-query';

type BaseSchema = Record<
  string,
  {
    type: 'text' | 'select' | 'textarea';
    label: string;
    placeholder: string;
    options?: Array<{ value: string; label: string }>;
    required?: boolean;
  }
>;

type Values = {
  query: string;
  page: number;
  size: number;
};
type CommonCRUDState = {
  resource: string;
  schema?: BaseSchema;
  mutation?: (data: any) => Promise<void>;
  fetcher: (queries: Values) => Promise<Page<any>>;
  initialValues?: Values;
  values: Values;
  searchValues: Values;
  setValues: (values: Partial<Values>) => void;
  setValue: (key: string, value: any) => void;
  reset: () => void;
  submitSearch: () => void;
  submitValues: (values: Partial<Values>) => void;
};

const INITIAL_VALUES = {
  query: '',
  ...DEFAULT_PAGINATION
};

function createCommonCRUDStore(initProps: InitProps) {
  const initValues: Values = initProps.initialValues
    ? initProps.initialValues
    : INITIAL_VALUES;
  return create<CommonCRUDState>(set => {
    return {
      ...initProps,
      initialValues: initValues,
      values: {
        ...initValues
      },
      searchValues: {
        ...initValues
      },
      setValues: values => {
        set(state => {
          return {
            ...state,
            ...values
          };
        });
      },
      setValue: (key, value) => {
        set(state => ({
          ...state,
          values: {
            ...state.values,
            [key]: value
          }
        }));
      },
      submitValues: values => {
        set(state => {
          return {
            ...state,
            values: {
              ...state.values,
              ...values
            },
            searchValues: {
              ...state.values,
              ...values
            }
          };
        });
      },
      submitSearch: () => {
        set(state => {
          return {
            ...state,
            searchValues: {
              ...state.values
            }
          };
        });
      },
      reset: () => {
        set(state => ({
          ...state,
          values: initValues,
          searchValues: initValues
        }));
      }
    };
  });
}

type CommonCRUDStore = ReturnType<typeof createCommonCRUDStore>;
export const CommonCRUDContext = createContext<CommonCRUDStore | null>(null);

type InitProps = Pick<
  CommonCRUDState,
  'mutation' | 'fetcher' | 'schema' | 'resource' | 'initialValues'
>;

export function CommonCRUDProvider({
  children,
  ...props
}: PropsWithChildren<InitProps>) {
  const storeRef = useRef<CommonCRUDStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createCommonCRUDStore(props);
  }
  return (
    <CommonCRUDContext.Provider value={storeRef.current}>
      {children}
    </CommonCRUDContext.Provider>
  );
}

export function useCommonCRUDContext<T>(
  selector: (state: CommonCRUDState) => T
): T {
  const store = useContext(CommonCRUDContext);
  if (!store) throw new Error('Missing CommonCRUDContext.Provider in the tree');
  return useStore(store, selector);
}

export function useQueryResource() {
  const resource = useCommonCRUDContext(state => state.resource);
  const searchValues = useCommonCRUDContext(state => state.searchValues);
  const fetcher = useCommonCRUDContext(state => state.fetcher);

  return useQuery({
    queryKey: [resource, searchValues],
    queryFn: () => {
      return fetcher(searchValues);
    }
  });
}
