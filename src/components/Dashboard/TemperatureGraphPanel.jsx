import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function TemperatureGraphPanel({ minTemp, maxTemp }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (minTemp == null || maxTemp == null) return;
    setData(prev =>
      [...prev, { time: new Date().toLocaleTimeString(), min: minTemp, max: maxTemp }].slice(-120)
    );
  }, [minTemp, maxTemp]);

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis unit="°C" domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="min" stroke="#00bfff" dot={false} name="Min" />
          <Line type="monotone" dataKey="max" stroke="#ff0000" dot={false} name="Max" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureGraphPanel;
