import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart } from 'chart.js';

Chart.register(ArcElement);

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [90, 12, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }
  ]
};

export function ActivityReportChart() {
  return (
    <div className={'w-72'}>
      <Pie data={data} />
    </div>
  );
}
