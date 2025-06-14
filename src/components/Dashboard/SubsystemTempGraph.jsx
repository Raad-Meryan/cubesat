import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function SubsystemTempGraph({
  cdhs, eps = 0, adcs = 0, comm = 0
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (cdhs == null) return;                 // skip until we have a reading
    setData(prev =>
      [
        ...prev,
        { t: new Date().toLocaleTimeString(),
          CDHS: cdhs,
          EPS:  eps,
          ADCS: adcs,
          COMM: comm
        }
      ].slice(-300)                           // keep ~5 min at 1 s samples
    );
  }, [cdhs, eps, adcs, comm]);

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="t" tick={{ fontSize: 10 }} />
          <YAxis unit="°C" domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="CDHS" stroke="#ff0000" dot={false} />
          <Line type="monotone" dataKey="EPS"  stroke="#00bfff" dot={false} />
          <Line type="monotone" dataKey="ADCS" stroke="#00ff00" dot={false} />
          <Line type="monotone" dataKey="COMM" stroke="#ffa500" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
