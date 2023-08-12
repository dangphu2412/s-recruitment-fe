import React from 'react';
import { NoLayout } from 'src/system/app/internal/components/NoLayout';
import { NextPageWithLayout } from './_app';

const MaintenancePage: NextPageWithLayout = (): React.ReactElement => (
  <>System maintenance</>
);

MaintenancePage.getLayout = NoLayout;

export default MaintenancePage;
