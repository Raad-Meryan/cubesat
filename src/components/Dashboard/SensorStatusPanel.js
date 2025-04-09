import React from 'react';
import './SensorStatusPanel.css';

const dummySensorData = {
  GPS: true,
  OBC: true,
  IMU: false,
  Magnetorquer: true,
  'Earth Sensor': true,
  'Main Camera': false
};

function SensorStatusPanel() {
  return (
    <div className="sensor-panel">
      <ul className="sensor-list">
        {Object.entries(dummySensorData).map(([sensor, isOn]) => (
          <li key={sensor}>
            <span className={`indicator ${isOn ? 'on' : 'off'}`}></span>
            {sensor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SensorStatusPanel;