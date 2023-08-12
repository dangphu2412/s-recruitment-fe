import '../styles/globals.scss';
import '../styles/typography.module.scss';
import { SystemProvider } from 'src/system/infrastructure/providers/system.provider';
import { AppPropsWithLayout } from 'src/system/infrastructure/next.types';
import { useHandleError } from '../src/system/app/internal/hooks/useHandleError';
import { AdminLayout } from '../src/system/app/internal/components/AdminLayout/AdminLayout';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const handleError = useHandleError();

  const renderLayout =
    Component.getLayout ?? (page => <AdminLayout>{page}</AdminLayout>);

  return (
    <SystemProvider onError={handleError} pageProps={pageProps}>
      {renderLayout(<Component {...pageProps} />)}
    </SystemProvider>
  );
}

export default MyApp;
