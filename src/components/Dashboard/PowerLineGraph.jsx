// PowerLineGraph.jsx  ────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const WINDOW_SEC = 180;              // 3-min history (180 samples)

export default function PowerLineGraph({
  value,                 // current reading from parent
  colour    = "#00cc66", // line colour
  yUnit     = "",        // "W", "V", "A", …
  yMax      = 100,       // top of Y axis
  label     = ""         // tooltip label
}) {
  const [data, setData] = useState([]);

  /* ring-buffer: keep at most 180 points (1 per second × 3 min) */
  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => {
        const next = [
          ...prev,
          { t: new Date().toLocaleTimeString(), p: value ?? 0 }
        ];
        return next.slice(-WINDOW_SEC);
      });
    }, 1000);                 /* sample every second */

    return () => clearInterval(id);
  }, [value]);

  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="t" tick={{ fontSize: 10, fill: "#bbb" }} />
          <YAxis
            unit={yUnit}
            domain={[0, yMax]}
            tick={{ fill: "#bbb" }}
            axisLine={{ stroke: "#555" }}
            tickLine={{ stroke: "#555" }}
          />
          <Tooltip
            formatter={p => [`${p} ${yUnit}`, label]}
            labelStyle={{ color: "#ddd" }}
            contentStyle={{ fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="p"
            stroke={colour}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
