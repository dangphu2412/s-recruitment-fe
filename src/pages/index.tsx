import * as React from 'react';
import type { NextPage } from 'next';
import { Card, ContentHeader } from '../shared/ui';
import {
  DefaultMonthlyEventItem,
  MonthlyBody,
  MonthlyCalendar,
  MonthlyDay,
  MonthlyNav
} from '@zach.codes/react-calendar';
import { format, startOfMonth, subHours } from 'date-fns';
import { useState } from 'react';
import { Text } from '@chakra-ui/react';

const Home: NextPage = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  return (
    <Card>
      <ContentHeader
        main={'Main Dashboard'}
        brief={'Where Phu test features'}
      />

      <Text variant="h1">Register your office working hours</Text>

      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={date => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody
          events={[
            { title: 'Call John', date: subHours(new Date(), 2) },
            { title: 'Call John', date: subHours(new Date(), 1) },
            { title: 'Meeting with Bob', date: new Date() }
          ]}
        >
          <MonthlyDay<{ title: string; date: Date }>
            renderDay={data =>
              data.map((item, index) => (
                <DefaultMonthlyEventItem
                  key={index}
                  title={item.title}
                  // Format the date here to be in the format you prefer
                  date={format(item.date, 'k:mm')}
                />
              ))
            }
          />
        </MonthlyBody>
      </MonthlyCalendar>
    </Card>
  );
};

export default Home;
