import React from 'react';
import { NextPageWithLayout } from '../shared/next.types';
import { NoLayout } from '../shared/ui/NoLayout';

const MaintenancePage: NextPageWithLayout = (): React.ReactElement => (
  <>403: Abort access</>
);

MaintenancePage.getLayout = NoLayout;

export default MaintenancePage;
