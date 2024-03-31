import '../styles/globals.scss';
import '../styles/typography.module.scss';
import { SystemProvider } from 'src/shared/models/system-provider/system.provider';
import { AppPropsWithLayout } from 'src/shared/models/next.types';
import { AdminLayout } from '../src/shared/ui/AdminLayout/AdminLayout';
import { useHandleError } from '../src/shared/models/error/useHandleError';

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
