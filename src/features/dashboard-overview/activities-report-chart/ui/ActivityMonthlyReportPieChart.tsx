import { Heading, Text, useTheme } from '@chakra-ui/react';
import { Chart } from 'react-chartjs-2';
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  Legend,
  PieController,
  Tooltip
} from 'chart.js';
import { useActivityLogAnalytic } from '../../../../entities/activities/models/activity-log.model';
import { subMonths } from 'date-fns';
import * as React from 'react';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, PieController);

export function ActivityMonthlyReportPieChart() {
  const theme = useTheme();
  const query = useMemo(() => {
    return {
      fromDate: subMonths(new Date(), 1).toISOString(),
      toDate: new Date().toISOString()
    };
  }, []);
  const { data } = useActivityLogAnalytic(query);
  const { lateCount = 0, notFinishedCount = 0, onTimeCount = 0 } = data ?? {};

  const chartData: ChartData<'pie'> = {
    labels: ['On Time', 'Late', 'Not Finished'],
    datasets: [
      {
        label: 'Total of activities',
        data: [onTimeCount ?? 0, lateCount ?? 0, notFinishedCount ?? 0],
        backgroundColor: [
          theme.colors['green']['500'],
          theme.colors['red']['500'],
          theme.colors['yellow']['500']
        ],
        hoverBackgroundColor: [
          theme.colors['green']['400'],
          theme.colors['red']['400'],
          theme.colors['yellow']['400']
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <section className={'space-y-8'}>
      <div>
        <Heading size={'md'}>Monthly report</Heading>
        <Text fontSize={'sm'}>Activity distribution for this month</Text>
      </div>

      <Chart type={'pie'} data={chartData} />
    </section>
  );
}
