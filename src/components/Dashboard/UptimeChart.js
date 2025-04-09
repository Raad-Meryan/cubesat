import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { dummyUptimeData } from '../../services/subsystemData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const chartData = {
  labels: dummyUptimeData.timeLabels,
  datasets: dummyUptimeData.datasets
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: 'white'
      }
    },
    title: {
      display: true,
      text: 'Subsystem Uptime in Days',
      color: 'white'
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'hour',
        displayFormats: {
          hour: 'HH:mm'
        }
      },
      ticks: {
        color: 'white'
      },
      grid: {
        color: '#333'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Days',
        color: 'white'
      },
      ticks: {
        color: 'white'
      },
      grid: {
        color: '#333'
      }
    }
  }
};

function UptimeChart() {
  return (
    <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '5px', height: '350px' }}>
    <Line data={chartData} options={options} />
  </div>
  
  );
}

export default UptimeChart;
