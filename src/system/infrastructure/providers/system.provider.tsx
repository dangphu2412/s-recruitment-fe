import { ReactElement, useState } from 'react';
import { Provider } from 'react-redux';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { chakraTheme } from 'src/system/infrastructure/config/chakra-ui.config';
import { getQueryClientConfig } from 'src/system/infrastructure/config/react-query.config';
import { SystemPropsAdapter } from 'src/system/infrastructure/adapters/system-props.adapter';
import { store } from 'src/system/infrastructure/config/redux.config';

export function SystemProvider({
  onError,
  children,
  pageProps
}: SystemPropsAdapter): ReactElement {
  const [queryClient] = useState(
    () =>
      new QueryClient(
        getQueryClientConfig({
          onError
        })
      )
  );

  return (
    <ChakraProvider theme={chakraTheme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>{children}</Provider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
