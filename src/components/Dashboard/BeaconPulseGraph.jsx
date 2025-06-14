/*  BeaconPulseScope.jsx  – square-wave beacon oscilloscope with live clock  */
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Scatter
} from "recharts";

import {
  BEACON_PERIOD_MS,     // 5 000 ms right now
  BEACON_WINDOW_MIN     // 3 min history to display
} from "./beacon-constants";

const DUTY = 0.70;                           // high-time inside each slot
const WINDOW_MS   = BEACON_WINDOW_MIN * 60_000;
//const POINTS_PER_PULSE = 3;                  // leading edge · plateau · drop

export default function BeaconPulseScope() {
  const [wave, setWave] = useState([]);      // square-wave segments
  const [dots, setDots] = useState([]);      // baseline grey ticks
  const [now,  setNow]  = useState(Date.now());

  /* ─── poll /beacon every BEACON_PERIOD_MS ─────────────────────────── */
  useEffect(() => {
    const append = ok => {
      const t0     = Date.now();               // current UNIX ms
      const colour = ok ? "#00ff00" : "#ff3333";
      const tHigh  = t0 + DUTY * BEACON_PERIOD_MS;

      setWave(prev => [
        ...prev,
        { x: t0,    y: ok ? 1 : 0, stroke: colour },
        { x: tHigh, y: ok ? 1 : 0, stroke: colour },
        { x: tHigh, y: 0,           stroke: colour }
      ].filter(p => p.x >= t0 - WINDOW_MS));   // keep window only

      setDots(prev => [
        ...prev,
        { x: t0, y: 0 }
      ].filter(p => p.x >= t0 - WINDOW_MS));
    };

    const query = () =>
      fetch(`${process.env.REACT_APP_API_URL}/beacon`, { cache: "no-store" })
        .then(r => (r.ok ? r.json() : null))
        .then(j => append(!!j))
        .catch(() => append(false));

    query();                                   // first shot
    const id = setInterval(query, BEACON_PERIOD_MS);
    return () => clearInterval(id);
  }, []);

  /* ─── 1-s timer to keep “now” moving so X-axis scrolls smoothly ──── */
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  /* ─── render ─────────────────────────────────────────────────────── */
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={wave}>
          {/* TIME axis (scrolls with `now`) */}
          <XAxis
            type="number"
            dataKey="x"
            domain={[now - WINDOW_MS, now]}
            tickFormatter={ts =>
              new Date(ts).toLocaleTimeString([], { hour12:false,
                                                    minute:"2-digit",
                                                    second:"2-digit" })}
            tick={{ fill:"#bbb", fontSize:12 }}
            axisLine={{ stroke:"#555" }}
            tickLine={{ stroke:"#555" }}
          />
          {/* keep the Y-axis hidden except for the zero baseline margin */}
          <YAxis hide domain={[-0.2, 1]} />

          <Tooltip
            formatter={(_, __, { payload }) =>
              payload?.stroke === "#00ff00" ? "packet OK" : "packet missed"}
            labelFormatter={ts =>
              new Date(ts).toLocaleTimeString([], { hour12:false,
                                                    minute:"2-digit",
                                                    second:"2-digit" })}
            contentStyle={{ fontSize:12 }}
          />

          {/* grey baseline dots (one per second) */}
          <Scatter
            data={dots}
            shape="circle"
            fill="#666"
            isAnimationActive={false}
          />

          {/* the square-wave trace */}
          <Line
            type="stepAfter"
            dataKey="y"
            stroke="#00ff00"                   // default – overridden below
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            segment={p => ({ stroke: p.payload.stroke })}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
