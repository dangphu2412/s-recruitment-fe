import * as React from 'react';
import type { NextPage } from 'next';
import { UserActivitiesCalendar } from '../features/activities/user-activities-calendar/ui/UserActivitiesCalendar/UserActivitiesCalendar';
import { Card, ContentHeader } from '../shared/ui';

const Home: NextPage = () => {
  return (
    <Card>
      <ContentHeader
        main={'Overview Dashboard'}
        brief={'Overall members activities'}
      />
      <UserActivitiesCalendar />;
    </Card>
  );
};

export default Home;
