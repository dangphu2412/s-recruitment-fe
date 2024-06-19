import { PropsWithChildren } from 'react';
import { AppProps } from 'next/app';
import { ErrorHandler } from '../../shared/models/error';

export type SystemPropsAdapter = PropsWithChildren<{
  onError: ErrorHandler;
}> & {
  pageProps: AppProps['pageProps'];
};
