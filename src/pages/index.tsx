import * as React from 'react';
import type { NextPage } from 'next';
import { MyMonthlyCalendar } from '../features/money-control/money-control-list/ui/MoneyControlList';
import { Card, ContentHeader } from '../shared/ui';

const Home: NextPage = () => {
  return (
    <Card>
      <ContentHeader
        main={'Main Dashboard'}
        brief={'Where Phu test features'}
      />
      <MyMonthlyCalendar />
    </Card>
  );
};

export default Home;
