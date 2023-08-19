import React from 'react';
import { NoLayout } from 'src/system/app/internal/components/NoLayout';
import { NextPageWithLayout } from '../src/system/infrastructure/next.types';

const MaintenancePage: NextPageWithLayout = (): React.ReactElement => (
  <>403: Abort access</>
);

MaintenancePage.getLayout = NoLayout;

export default MaintenancePage;
