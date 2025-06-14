import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

function SolarPowerGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const next = [...prev, {
          time: new Date().toLocaleTimeString(),
          power: 0  // placeholder value
        }];
        return next.slice(-60);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis unit="W" domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="power" stroke="#00cc66" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SolarPowerGraph;
