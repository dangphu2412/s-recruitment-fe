import React from 'react';
import { NextPageWithLayout } from '../shared/models/next.types';
import { NoLayout } from '../shared/ui/NoLayout';

const MaintenancePage: NextPageWithLayout = (): React.ReactElement => (
  <>System maintenance</>
);

MaintenancePage.getLayout = NoLayout;

export default MaintenancePage;
