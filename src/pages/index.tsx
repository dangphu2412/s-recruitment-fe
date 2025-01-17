import * as React from 'react';
import type { NextPage } from 'next';
import { Card, ContentHeader } from '../shared/ui';
import { ActivityReportChart } from '../features/dashboard-overview/activities-reports-chart/ui/ActivityReportChart';

const Home: NextPage = () => {
  return (
    <Card>
      <ContentHeader
        main={'Overview Dashboard'}
        brief={'Overall members activities'}
      />
      <ActivityReportChart />
    </Card>
  );
};

export default Home;
