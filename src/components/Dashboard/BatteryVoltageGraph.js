import React from 'react';
import { Line } from 'react-chartjs-2';

export default function BatteryVoltageGraph() {
  const data = {
    labels: ['12:00', '13:00', '14:00', '15:00'],
    datasets: [{
      label: 'Voltage (V)',
      data: [14.8, 14.6, 14.9, 15.1],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } }
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: '#444' } },
      y: { title: { display: true, text: 'Volts', color: 'white' }, ticks: { color: 'white' }, grid: { color: '#444' } }
    }
  };

  return <Line data={data} options={options} />;
}