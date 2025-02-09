import * as React from 'react';
import type { NextPage } from 'next';
import { ActivityReportCards } from '../features/dashboard-overview/activities-reports-card/ui/ActivityReportCards';
import { LateView } from '../features/dashboard-overview/late-view/ui/LateView';
import { Card } from '../shared/ui';
import { ActivityReportChart } from '../features/dashboard-overview/activities-report-chart/ui/ActivityReportChart';

// https://dribbble.com/shots/21931587-Cotton-HR-Management-Dashboard
const Home: NextPage = () => {
  return (
    <div className={'py-8 pr-4'}>
      <div className={'space-y-4'}>
        <ActivityReportCards />

        <div className={'grid grid-cols-4 gap-x-4'}>
          <Card className={'col-span-3'}>
            <LateView />
          </Card>
          <Card>
            <ActivityReportChart />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
