import * as React from 'react';
import { useMemo, useState } from 'react';
import { Button, Heading, Text } from '@chakra-ui/react';
import { Chart } from 'react-chartjs-2';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  type ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Title
} from 'chart.js';
import {
  formatDate,
  formatMonth
} from '../../../../shared/models/utils/date.utils';
import { useDashboardMyActivityTrend } from '../../../../entities/dashboard/models/dashboard.model';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  BarElement,
  BarController
);

enum GroupType {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}
const groupOptions = [
  {
    label: 'Weekly',
    value: GroupType.WEEKLY
  },
  {
    label: 'Monthly',
    value: GroupType.MONTHLY
  },
  {
    label: 'Yearly',
    value: GroupType.YEARLY
  }
];

export function MyActivitiesTrendsBarChart() {
  const [groupType, setGroupType] = useState(GroupType.WEEKLY);
  const { data } = useDashboardMyActivityTrend(groupType);

  const options: ChartOptions<'bar'> = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    };
  }, []);

  const chartData: ChartData<'bar'> = useMemo(() => {
    function getLabels() {
      if (!data) {
        return [];
      }

      const formatter = {
        [GroupType.WEEKLY]: formatDate,
        [GroupType.MONTHLY]: formatDate,
        [GroupType.YEARLY]: formatMonth
      }[groupType];

      return data.items.map(item => formatter(item.date));
    }

    function getDataSet() {
      const late = {
        label: 'Late',
        data: [] as number[],
        backgroundColor: '#f87171'
      };
      const onTime = {
        label: 'Correct',
        data: [] as number[],
        backgroundColor: '#4ade80'
      };
      const unChecked = {
        label: 'Unchecked',
        data: [] as number[],
        backgroundColor: '#facc15'
      };

      if (!data) {
        return [late, onTime, unChecked];
      }

      data.items.forEach(item => {
        late.data.push(+item.lateCount);
        onTime.data.push(+item.onTimeCount);
        unChecked.data.push(+item.notFinishedCount);
      });

      return [late, onTime, unChecked];
    }

    return {
      labels: getLabels(),
      datasets: getDataSet()
    };
  }, [data, groupType]);

  const totalActivities =
    data?.items?.reduce((acc, item) => {
      return acc + +item.onTimeCount + +item.notFinishedCount + +item.lateCount;
    }, 0) ?? 0;

  return (
    <section className={'space-y-8'}>
      <div className={'grid grid-cols-3'}>
        <div className={'col-span-2'}>
          <Heading size={'md'}>My Daily Activity</Heading>
          <Text fontSize={'sm'}>Your activity count this week</Text>
        </div>

        <div className={'grid grid-cols-3 gap-2'}>
          {groupOptions.map(option => (
            <Button
              colorScheme={groupType === option.value ? 'pink' : undefined}
              onClick={() => setGroupType(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <Chart type={'bar'} data={chartData} options={options} />
      <p>Total: {totalActivities} activities</p>
    </section>
  );
}
