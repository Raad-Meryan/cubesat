import React from 'react';
import './EnvironmentPanel.css';

function EnvironmentPanel({ temperature, pressure }) {
  return (
    <div className="env-panel">
      <h4>Temperature</h4>
      <p>{temperature ? temperature.toFixed(2) : '---'} °C</p>
      <h4>Pressure</h4>
      <p>{pressure ? pressure.toFixed(2) : '---'} hPa</p>

    </div>
  );
}

export default EnvironmentPanel;
