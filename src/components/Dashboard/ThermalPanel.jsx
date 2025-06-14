import React from 'react';
import './ThermalPanel.css';

function ThermalPanel({ data }) {
  const { min, max, avg } = data || {};
  return (
    <div className="thermal-panel">
      <h4>Min Temp</h4>
      <p>{min != null ? min.toFixed(2) : '---'} °C</p>
      <h4>Avg Temp</h4>
      <p>{avg != null ? avg.toFixed(2) : '---'} °C</p>
      <h4>Max Temp</h4>
      <p>{max != null ? max.toFixed(2) : '---'} °C</p>
    </div>
  );
}

export default ThermalPanel;
