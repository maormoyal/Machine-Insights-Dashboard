// src/components/FusionTrendGraph/FusionTrendGraph.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';
import styles from './FusionTrendGraph.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Chart.register(...registerables);

interface Insight {
  created_at: string;
  type: string;
  severity: 'healthy' | 'alarm' | 'critical';
}

interface FusionTrendGraphProps {
  insights: Insight[];
}

const FusionTrendGraph: React.FC<FusionTrendGraphProps> = ({ insights }) => {
  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date('2024-05-1')
  );
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  const filteredInsights = insights.filter((insight) => {
    const date = new Date(insight.created_at);
    return date >= (startDate || new Date()) && date <= (endDate || new Date());
  });

  const data: ChartData<'line'> = {
    labels: filteredInsights.map((insight) =>
      new Date(insight.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        label: 'Fusion trend',
        data: filteredInsights.map((insight) =>
          insight.severity === 'critical'
            ? 3
            : insight.severity === 'alarm'
            ? 2
            : 1
        ),
        borderColor: '#b1b9c3',
        borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: filteredInsights.map((insight) =>
          insight.severity === 'critical'
            ? '#EF4444'
            : insight.severity === 'alarm'
            ? '#F59E0B'
            : '#10B981'
        ),
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const insight = filteredInsights[context.dataIndex];
            return `${insight.type} - ${insight.severity}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawOnChartArea: true,
          color: '#b1b9c3', // Adjust grid line color
          lineWidth: 1,
        },
        border: {
          display: false,
          dash: [5, 5], // Dotted grid lines
        },
        ticks: {
          color: '#6b7280', // Adjust tick color
        },
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 7,
      },
      line: {
        borderWidth: 2,
        borderColor: '#b1b9c3', // Line color
      },
    },
  };

  return (
    <div className={styles.fusionTrendGraph}>
      <div className={styles.header}>
        <h2>Fusion trend</h2>
        <div className={styles.datePicker}>
          <span>From</span>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat='dd.MM.yyyy'
          />
          <span>to</span>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            dateFormat='dd.MM.yyyy'
          />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default FusionTrendGraph;
