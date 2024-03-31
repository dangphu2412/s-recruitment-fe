import React from 'react';
import { NextPageWithLayout } from '../src/shared/models/next.types';
import { NoLayout } from '../src/shared/ui/NoLayout';

const MaintenancePage: NextPageWithLayout = (): React.ReactElement => (
  <>System maintenance</>
);

MaintenancePage.getLayout = NoLayout;

export default MaintenancePage;
