import React from 'react';
import { Line } from 'react-chartjs-2';

export default function SolarPanelPowerGraph() {
  const data = {
    labels: ['12:00', '13:00', '14:00', '15:00'],
    datasets: [{
      label: 'Power (W)',
      data: [120, 135, 150, 145],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
      y: { title: { display: true, text: 'Watts', color: 'white' }, ticks: { color: 'white' }, grid: { color: '#444' } }
    }
  };

  return <Line data={data} options={options} />;
}
