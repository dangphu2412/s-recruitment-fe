import { create, useStore } from 'zustand/react';
import { createContext, PropsWithChildren, useContext, useRef } from 'react';
import {
  DEFAULT_PAGINATION,
  Page
} from '../../shared/pagination/offset-paging';
import { useQuery } from 'react-query';

type BaseSchema = Record<
  string,
  {
    type: 'text' | 'select' | 'textarea' | 'date' | 'time';
    label: string;
    placeholder: string;
    options?: Array<{ value: string; label: string }>;
    required?: boolean;
  }
>;

type FeatureConfig = {
  enableInlineSearch?: boolean;
};

type Values = {
  query?: string;
  page: number;
  size: number;
  [key: string]: any;
};
type Plugin = {
  values: {
    [key: string]: any;
  };
};

type PluginRegister = () => Plugin;

type CommonCRUDState = {
  resource: string;
  featureConfig?: FeatureConfig;
  schema?: BaseSchema;
  mutation?: (data: any) => Promise<void>;
  fetcher: (queries: Values) => Promise<Page<any>>;
  initialValues?: Values;
  values: Values;
  searchValues: Values;
  setValues: (values: Partial<Values>) => void;
  toggleValue: (key: string, value: any) => void;
  setValue: (key: string, value: any) => void;
  reset: () => void;
  submitSearch: () => void;
  submitValues: (values: Partial<Values>) => void;
};

const INITIAL_VALUES = {
  query: '',
  ...DEFAULT_PAGINATION
};

function createCommonCRUDStore({ registerPlugin, ...initProps }: InitProps) {
  const initValues: Values = initProps.initialValues
    ? initProps.initialValues
    : INITIAL_VALUES;

  const plugin = registerPlugin ? registerPlugin() : null;

  return create<CommonCRUDState>(set => {
    return {
      ...initProps,
      initialValues: initValues,
      values: {
        ...initValues,
        ...(plugin?.values ?? {})
      },
      searchValues: {
        ...initValues,
        ...(plugin?.values ?? {})
      },
      setValues: values => {
        set(state => {
          return {
            ...state,
            values: {
              ...state.values,
              ...values
            }
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
      toggleValue: (key, value) => {
        // Add or remove value from array of values of key
        set(state => {
          const values = state.values[key] || [];
          const newValues = values.includes(value)
            ? values.filter((v: string) => v !== value)
            : [...values, value];
          return {
            ...state,
            values: {
              ...state.values,
              [key]: newValues
            }
          };
        });
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
  | 'mutation'
  | 'fetcher'
  | 'schema'
  | 'resource'
  | 'initialValues'
  | 'featureConfig'
> & {
  registerPlugin?: PluginRegister;
};

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
  const featureConfig = useCommonCRUDContext(state => state.featureConfig);
  const searchValues = useCommonCRUDContext(state => state.searchValues);
  const fetcher = useCommonCRUDContext(state => state.fetcher);

  function getSearchValues() {
    const { query, ...rest } = searchValues;

    return featureConfig?.enableInlineSearch
      ? rest
      : {
          query,
          ...rest
        };
  }

  return useQuery({
    queryKey: [resource, getSearchValues()],
    queryFn: () => {
      return fetcher(getSearchValues());
    }
  });
}
