import { ReactElement, useState } from 'react';
import { Provider } from 'react-redux';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { getQueryClientConfig } from 'src/config/react-query.config';
import { SystemPropsAdapter } from 'src/config/system-provider/system-props.adapter';
import { store } from 'src/config/redux.config';

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
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>{children}</Provider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
