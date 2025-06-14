/*  IMUDataPanel.jsx  */
import React from "react";
import "./IMUDataPanel.css";

/* ---------- helper: use “--” on missing items ----------------- */
const fmt = n => (typeof n === "number" ? n.toFixed(2) : "--");

function formatVector(v) {
  /* v may be  null / undefined / shorter than 3 */
  if (!Array.isArray(v)) return "--, --, --";
  const [x, y, z] = v;
  return `${fmt(x)}, ${fmt(y)}, ${fmt(z)}`;
}

export default function IMUDataPanel({
  gyro = [],            // default empty arrays keep the code safe
  accel = [],
  mag = []
}) {
  return (
    <div className="imu-panel">
      <h4>IMU Sensor Data</h4>

      <p><span className="imu-label">Gyroscope:</span> {formatVector(gyro)} °/s</p>
      <p><span className="imu-label">Accelerometer:</span> {formatVector(accel)} m/s²</p>
      <p><span className="imu-label">Magnetometer:</span> {formatVector(mag)} µT</p>
    </div>
  );
}
