import React, { useEffect, useState, useRef } from "react";
import "./TemperatureStatsPanel.css";   // simple styling below

export default function TemperatureStatsPanel({ value }) {
  const bufferRef = useRef([]);           // keeps last 5-min readings
  const [stats, setStats] = useState({ cur: "--", min: "--", max: "--" });

  useEffect(() => {
    if (value == null) return;

    // 1) push new reading
    bufferRef.current.push(value);

    // 2) keep only last 5-min worth (300 s / 250 ms ≈ 1200)
    if (bufferRef.current.length > 1200) bufferRef.current.shift();

    // 3) compute stats
    const vals = bufferRef.current;
    const cur  = value.toFixed(2);
    const min  = Math.min(...vals).toFixed(2);
    const max  = Math.max(...vals).toFixed(2);

    setStats({ cur, min, max });
  }, [value]);

  return (
    <div className="temp-stats">
      <div className="temp-block">
        <span className="label">Current</span>
        <span className="value">{stats.cur} °C</span>
      </div>
      <div className="temp-block">
        <span className="label">5-min Min</span>
        <span className="value">{stats.min} °C</span>
      </div>
      <div className="temp-block">
        <span className="label">5-min Max</span>
        <span className="value">{stats.max} °C</span>
      </div>
    </div>
  );
}
