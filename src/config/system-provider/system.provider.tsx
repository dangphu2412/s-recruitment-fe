import { ReactElement, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { getQueryClientConfig } from 'src/config/react-query.config';
import { SystemPropsAdapter } from 'src/config/system-provider/system-props.adapter';

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
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
