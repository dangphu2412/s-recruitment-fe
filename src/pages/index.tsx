import * as React from 'react';
import type { NextPage } from 'next';
import { ActivityReportCards } from '../features/dashboard-overview/activities-reports-card/ui/ActivityReportCards';
import { UserActivitiesTrendsBarChart } from '../features/dashboard-overview/activity-trends/ui/UserActivitiesTrendsBarChart';
import { ActivityMonthlyReportPieChart } from '../features/dashboard-overview/activities-report-chart/ui/ActivityMonthlyReportPieChart';
import { Card, CardBody, Heading, Text } from '@chakra-ui/react';

// https://dribbble.com/shots/21931587-Cotton-HR-Management-Dashboard
const Home: NextPage = () => {
  return (
    <div className={'py-8 pr-4 space-y-4'}>
      <Heading size={'lg'}>Activity Dashboard</Heading>

      <Text fontSize="md">
        Overview of all your activities and performance metrics
      </Text>

      <div className={'grid grid-cols-4 gap-6'}>
        <ActivityReportCards />

        <Card className={'col-span-3'}>
          <CardBody>
            <UserActivitiesTrendsBarChart />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <ActivityMonthlyReportPieChart />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Home;
