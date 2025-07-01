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
import * as React from 'react';
import { useMemo } from 'react';
import { useDashboardUserActivityTrend } from '../../../../entities/dashboard/models/dashboard.model';
import { GroupType } from '../../../../entities/dashboard/config/dashboard.constants';

ChartJS.register(ArcElement, Tooltip, Legend, PieController);

export function ActivityMonthlyReportPieChart() {
  const theme = useTheme();
  const { data } = useDashboardUserActivityTrend(GroupType.MONTHLY);

  const computed = useMemo(() => {
    if (!data) {
      return {
        onTimeCount: 0,
        lateCount: 0,
        notFinishedCount: 0
      };
    }

    return data.items.reduce(
      (result, current) => {
        return {
          onTimeCount: result.onTimeCount + +current.onTimeCount,
          lateCount: result.lateCount + +current.lateCount,
          notFinishedCount: result.notFinishedCount + +current.notFinishedCount
        };
      },
      { onTimeCount: 0, lateCount: 0, notFinishedCount: 0 }
    );
  }, [data]);

  const chartData: ChartData<'pie'> = {
    labels: ['On Time', 'Late', 'Not Finished'],
    datasets: [
      {
        label: 'Total of activities',
        data: [
          computed.onTimeCount,
          computed.lateCount,
          computed.notFinishedCount
        ],
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
