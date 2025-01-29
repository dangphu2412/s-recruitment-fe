import { Heading, useTheme } from '@chakra-ui/react';
import { Chart } from 'react-chartjs-2';
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  Legend,
  Tooltip
} from 'chart.js';
import { useActivityLogAnalytic } from '../../../../entities/activities/models/activity-log.model';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ActivityReportChart() {
  const theme = useTheme();
  const { data } = useActivityLogAnalytic();
  const { lateCount = 0, notFinishedCount = 0, onTimeCount = 0 } = data ?? {};

  const chartData: ChartData<'pie'> = {
    labels: ['On Time', 'Late', 'Not Finished'],
    datasets: [
      {
        label: '# of Votes',
        data: [onTimeCount, lateCount, notFinishedCount],
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
      <Heading size={'md'}>Weekly report</Heading>

      <Chart type={'pie'} data={chartData} />
    </section>
  );
}
