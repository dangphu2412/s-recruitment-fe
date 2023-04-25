import { createContext } from '@chakra-ui/react-utils';
import { NumberProviderProps } from '@modules/ui-system/components/form/NumberInput/types';

export const [NumberInputProvider, useNumberInputProvider] =
  createContext<NumberProviderProps>({
    name: 'NumberInputProvider',
    errorMessage: 'Missing NumberInputProvider'
  });
