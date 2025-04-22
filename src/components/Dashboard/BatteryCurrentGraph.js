import React from 'react';
import { Line } from 'react-chartjs-2';

export default function BatteryCurrentGraph() {
  const data = {
    labels: ['12:00', '13:00', '14:00', '15:00'],
    datasets: [{
      label: 'Current (A)',
      data: [2.3, 2.1, 2.4, 2.6],
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
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
      y: { title: { display: true, text: 'Amps', color: 'white' }, ticks: { color: 'white' }, grid: { color: '#444' } }
    }
  };

  return <Line data={data} options={options} />;
}