import '../../styles/globals.scss';
import '../../styles/typography.module.scss';
import { SystemProvider } from 'src/config/system-provider/system.provider';
import { AppPropsWithLayout } from 'src/shared/models/next.types';
import { AdminLayout } from '../widgets/admin-layout';
import { useHandleError } from '../shared/models/error/useHandleError';

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
