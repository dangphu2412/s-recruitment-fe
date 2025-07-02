import * as React from 'react';
import type { NextPage } from 'next';
import { ActivityReportCards } from '../features/dashboard-overview/activities-reports-card/ui/ActivityReportCards';
import { UserActivitiesTrendsBarChart } from '../features/dashboard-overview/activity-trends/ui/UserActivitiesTrendsBarChart';
import { ActivityMonthlyReportPieChart } from '../features/dashboard-overview/activities-report-chart/ui/ActivityMonthlyReportPieChart';
import { Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { useQueryMyRoles, useUserStore } from '../entities/user/models';
import { FullLoader } from '../shared/ui/Loader/Full/FullLoader';
import { UserActivitiesCard } from '../features/dashboard-overview/user-activities-card/ui/UserActivitiesCard';
import { MyActivitiesTrendsBarChart } from '../features/dashboard-overview/my-activity-trends/ui/MyActivitiesTrendsBarChart';
import { MyPendingTasks } from '../features/dashboard-overview/my-pending-tasks/ui/MyPendingTasks';

// https://dribbble.com/shots/21931587-Cotton-HR-Management-Dashboard
const Home: NextPage = () => {
  const { myRoles, isLoading } = useQueryMyRoles();

  if (isLoading) {
    return <FullLoader />;
  }

  const isMember = myRoles?.find(role => role.name === 'Member');

  return isMember ? <UserDashboard /> : <AdminDashboard />;
};

export default Home;

function AdminDashboard() {
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
}

function UserDashboard() {
  const currentUser = useUserStore(state => state.currentUser);

  return (
    <div className={'py-8 pr-4 space-y-4'}>
      <Heading size={'lg'}>Welcome back, {currentUser?.fullName}! 👋</Heading>

      <Text fontSize="md">You're on fire! 🔥</Text>

      <div className={'grid grid-cols-4 gap-6'}>
        <UserActivitiesCard />

        <Card className={'col-span-2'}>
          <CardBody>
            <MyActivitiesTrendsBarChart />
          </CardBody>
        </Card>

        <Card className={'col-span-2'}>
          <CardBody>
            <MyPendingTasks />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
