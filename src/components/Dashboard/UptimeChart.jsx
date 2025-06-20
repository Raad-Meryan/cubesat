import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Tooltip, Legend, TimeScale
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import "./UptimeChart.css";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  Tooltip, Legend, TimeScale
);

export default function UptimeChart({ cdhs = 0 }) {
  const [pts, setPts] = useState([]);           // {t, cdhs}

  /* keep a rolling 5-minute window */
  useEffect(() => {
    setPts(prev => [
      ...prev,
      { t: new Date(), cdhs }
    ].slice(-300));
  }, [cdhs]);

  const labels   = pts.map(p => p.t);
  const cdhsData = pts.map(p => p.cdhs);

  const chartData = {
    labels,
    datasets: [
      {
        label: "CDHS Uptime",
        data:  cdhsData,
        borderColor: "#00aaff",
        backgroundColor: "#00aaff"
      },
      ...["EPS","ADCS","COMM","Payload"].map(name => ({
        label: `${name} Uptime`,
        data:  Array(labels.length).fill(0),
        borderColor: "#777",
        backgroundColor: "#777",
        borderDash: [4,4],
        pointRadius: 0
      }))
    ]
  };

  const options = {
    maintainAspectRatio: false,      // let canvas fill the panel
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",          // <── moved from "right" to "bottom"
        labels: { color: "#fff" }
      },
      tooltip: { mode: "index", intersect: false },
      title:   { display: true, text: "Subsystem Uptime in Hours", color: "#fff" }
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      x: {
        type: "time",
        time: { unit: "minute", displayFormats: { minute: "HH:mm" } },
        ticks: { color: "#fff" }, grid: { color: "#333" }
      },
      y: {
        title: { display: true, text: "Hours", color: "#fff" },
        ticks: { color: "#fff" }, grid: { color: "#333" }
      }
    }
  };

  return (
    <div className="uptime-panel">
      <Line data={chartData} options={options} />
    </div>
  );
}