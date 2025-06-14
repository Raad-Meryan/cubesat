import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

function ThermalGraphPanel({ avg, min, max }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (avg == null || min == null || max == null) return;

    setData(prev => {
      const next = [...prev, {
        time: new Date().toLocaleTimeString(),
        avg,
        min,
        max
      }];
      return next.slice(-60);
    });
  }, [avg, min, max]);

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avg" stroke="#ff7300" dot={false} name="Avg" />
          <Line type="monotone" dataKey="min" stroke="#00bfff" dot={false} name="Min" />
          <Line type="monotone" dataKey="max" stroke="#ff0000" dot={false} name="Max" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThermalGraphPanel;
