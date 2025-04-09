export const dummyUptimeData = {
	timeLabels: [
		'2025-04-08T00:00:00Z',
		'2025-04-08T04:00:00Z',
		'2025-04-08T08:00:00Z',
		'2025-04-08T12:00:00Z',
		'2025-04-08T16:00:00Z',
		'2025-04-08T20:00:00Z'
	  ], 
	  datasets: [
		{
		  label: 'COMM Uptime',
		  data: [0.5, 1.1, 1.4, 1.8, 2.0, 2.3],
		  borderColor: 'rgb(105, 0, 23)',
		  backgroundColor: 'rgba(255, 99, 132, 0.2)',
		  tension: 0.4,
		  pointRadius: 3
		},
		{
		  label: 'CDHS Uptime',
		  data: [0.4, 1.0, 1.3, 1.6, 1.9, 2.2],
		  borderColor: 'rgb(0, 67, 112)',
		  backgroundColor: 'rgba(54, 162, 235, 0.2)',
		  tension: 0.4,
		  pointRadius: 3
		},
		{
		  label: 'EPS Uptime',
		  data: [0.6, 1.2, 1.5, 1.9, 2.1, 2.4],
		  borderColor: 'rgb(197, 113, 10)',
		  backgroundColor: 'rgba(255, 206, 86, 0.2)',
		  tension: 0.4,
		  pointRadius: 3
		},
		{
		  label: 'ADCS Uptime',
		  data: [0.3, 0.9, 1.2, 1.5, 1.8, 2.1],
		  borderColor: 'rgb(0, 137, 137)',
		  backgroundColor: 'rgba(75, 192, 192, 0.2)',
		  tension: 0.4,
		  pointRadius: 3
		},
		{
		  label: 'Payload Uptime',
		  data: [0.2, 0.8, 1.1, 1.4, 1.7, 2.0],
		  borderColor: 'rgb(109, 0, 136)',
		  backgroundColor: 'rgba(153, 102, 255, 0.2)',
		  tension: 0.4,
		  pointRadius: 3
		}
	  ]
	};
	