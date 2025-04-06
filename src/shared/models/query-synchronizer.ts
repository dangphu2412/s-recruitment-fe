import { useRouter } from 'next/router';
import { useEffectOnce } from 'react-use';
import { decodeMultiQueryParams } from './pagination';

export type QuerySynchronizeSchema<M> = {
  [key: string]: {
    target: keyof M;
    type: typeof Date | typeof String;
    isArray?: boolean;
  };
};

type Props<M> = {
  schema: QuerySynchronizeSchema<M>;
  updater: (values: Partial<M>) => void;
};

export function useQuerySynchronizer<M>({ schema, updater }: Props<M>) {
  const { query } = useRouter();

  useEffectOnce(() => {
    const state = Object.entries(schema).reduce((result, [key, mapping]) => {
      const urlValue = query[key];

      if (undefined === urlValue) {
        return result;
      }

      const parsedValue = Array.isArray(urlValue) ? urlValue[0] : urlValue;

      if (Date === mapping.type) {
        const dateValue = new Date(parsedValue);

        if (isNaN(dateValue.getTime())) {
          return result;
        }

        return {
          ...result,
          [mapping.target]: dateValue
        };
      }

      return {
        ...result,
        [mapping.target]: mapping.isArray
          ? decodeMultiQueryParams(parsedValue)
          : urlValue
      };
    }, {});

    updater(state);
  });
}
